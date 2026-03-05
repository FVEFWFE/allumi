import { NextRequest, NextResponse } from "next/server"
import { stripe, PRICE_MAP } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { plan, email } = await request.json()

    const priceConfig = PRICE_MAP[plan]
    if (!priceConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const origin = request.headers.get("origin") || "https://www.allumi.to"

    const session = await stripe.checkout.sessions.create({
      mode: priceConfig.mode,
      line_items: [{ price: priceConfig.priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/${plan}`,
      metadata: { plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
