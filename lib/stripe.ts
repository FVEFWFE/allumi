import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export const PRICE_MAP: Record<string, { priceId: string; mode: "subscription" | "payment" }> = {
  // Standard
  standard: { priceId: "price_1T7Y2SRpVZT6ATRpSaovoDF4", mode: "subscription" },
  "standard-yearly": { priceId: "price_1T7Y2TRpVZT6ATRpAe6BxLZg", mode: "subscription" },
  // Premium
  premium: { priceId: "price_1T7Y2URpVZT6ATRpr1NWbd36", mode: "subscription" },
  "premium-yearly": { priceId: "price_1T7Y2VRpVZT6ATRpU4l0jHft", mode: "subscription" },
  // Ultimate
  ultimate: { priceId: "price_1T7Y2VRpVZT6ATRpLQcrdKKK", mode: "subscription" },
  "ultimate-yearly": { priceId: "price_1T7Y2WRpVZT6ATRpDmTE7jh9", mode: "subscription" },
  // Credit packs
  "credits-5": { priceId: "price_1T7Y2XRpVZT6ATRpjzPMMT0q", mode: "payment" },
  "credits-10": { priceId: "price_1T7Y2YRpVZT6ATRpBHxsqWrq", mode: "payment" },
  "credits-20": { priceId: "price_1T7Y2YRpVZT6ATRpMla7uS6M", mode: "payment" },
  "credits-50": { priceId: "price_1T7Y2ZRpVZT6ATRpKNKM7YAq", mode: "payment" },
  "credits-100": { priceId: "price_1T7Y2aRpVZT6ATRpHq6XRYuO", mode: "payment" },
}
