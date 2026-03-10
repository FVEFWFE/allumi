// Allumi payment bridge webhook
import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createLicenseKey } from "@/lib/license-keys"
import { sendLicenseKeyEmail } from "@/lib/resend"
import { getSupabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 })
  }

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any
      const email = session.customer_email || session.customer_details?.email || ""
      const plan = session.metadata?.plan
      const referralCode = session.metadata?.referralCode || undefined

      if (!plan) {
        console.error("[Allumi Webhook] No plan in metadata:", session.metadata)
        break
      }

      // Credit packs don't get license keys — they'll use a direct credit-add flow later
      if (plan.startsWith("credits-")) {
        console.log(`[Allumi Webhook] Credit pack purchase: ${plan}, email=${email}, session=${session.id}`)
        break
      }

      try {
        const result = await createLicenseKey(
          email,
          plan,
          session.id,
          session.payment_intent,
          referralCode,
        )

        console.log(`[Allumi Webhook] Key generated: ${result.key}, tier=${result.tier}, email=${email}`)

        if (email) {
          try {
            await sendLicenseKeyEmail(email, result.key, result.tier, result.duration)
            console.log(`[Allumi Webhook] Email sent to ${email}`)
          } catch (emailErr) {
            console.error("[Allumi Webhook] Email send error:", emailErr)
          }
        }
      } catch (keyErr) {
        console.error("[Allumi Webhook] Key generation error:", keyErr)
        return NextResponse.json({ error: "Key generation failed" }, { status: 500 })
      }

      break
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object
      console.log(`[Allumi Webhook] Subscription cancelled: ${(subscription as any).id}`)
      break
    }
    case "charge.refunded": {
      const charge = event.data.object as any
      const paymentIntentId = charge.payment_intent
      if (!paymentIntentId) {
        console.log("[Allumi Webhook] charge.refunded without payment_intent, skipping")
        break
      }

      const supabase = getSupabase()

      // Find license key by payment intent
      const { data: licenseKey } = await (supabase as any)
        .from("license_keys")
        .select("id, status, activated_by")
        .eq("stripe_payment_intent_id", paymentIntentId)
        .single()

      if (!licenseKey) {
        console.log(`[Allumi Webhook] No license key for payment_intent ${paymentIntentId}`)
        break
      }

      if (licenseKey.status === "revoked") {
        console.log(`[Allumi Webhook] License key ${licenseKey.id} already revoked`)
        break
      }

      // Revoke the license key
      await (supabase as any)
        .from("license_keys")
        .update({ status: "revoked" })
        .eq("id", licenseKey.id)

      console.log(`[Allumi Webhook] Revoked license key ${licenseKey.id} (charge ${charge.id})`)

      // Downgrade user if they activated this key
      if (licenseKey.activated_by) {
        const { data: userProfile } = await supabase
          .from("users_extended")
          .select("id, subscription_source")
          .eq("id", licenseKey.activated_by)
          .single()

        if (userProfile && userProfile.subscription_source === "allumi") {
          await supabase
            .from("users_extended")
            .update({
              tier: "free",
              tier_expires_at: null,
              subscription_source: null,
            })
            .eq("id", licenseKey.activated_by)

          console.log(`[Allumi Webhook] Downgraded user ${licenseKey.activated_by} to free (refund)`)
        }
      }

      break
    }
  }

  return NextResponse.json({ received: true })
}
