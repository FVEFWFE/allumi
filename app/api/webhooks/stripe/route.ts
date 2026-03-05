import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      const email = session.customer_email || session.customer_details?.email
      const plan = session.metadata?.plan

      // TODO: Notify GetGooned backend to activate subscription/credits
      // await fetch("https://getgooned.ai/api/allumi-webhook", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GG_WEBHOOK_SECRET}` },
      //   body: JSON.stringify({ email, plan, sessionId: session.id, mode: session.mode }),
      // })

      console.log(`Payment completed: ${email} - ${plan} (${session.mode})`)
      break
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object
      console.log(`Subscription cancelled: ${subscription.id}`)
      // TODO: Notify GetGooned to deactivate subscription
      break
    }
  }

  return NextResponse.json({ received: true })
}
