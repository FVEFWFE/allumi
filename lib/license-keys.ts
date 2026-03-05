import { randomBytes } from "crypto"
import { getSupabase } from "@/lib/supabase"

export function generateLicenseKey(): string {
  const bytes = randomBytes(6)
  const hex = bytes.toString("hex").toUpperCase()
  return `GG-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`
}

// Map allumi plan slugs to GG tier names
const PLAN_TO_TIER: Record<string, string> = {
  standard: "pro",
  "standard-yearly": "pro",
  premium: "premium",
  "premium-yearly": "premium",
  ultimate: "ultra",
  "ultimate-yearly": "ultra",
}

// Map allumi plan slugs to duration
const PLAN_TO_DURATION: Record<string, string> = {
  standard: "1month",
  "standard-yearly": "1year",
  premium: "1month",
  "premium-yearly": "1year",
  ultimate: "1month",
  "ultimate-yearly": "1year",
}

// Price amounts in cents for validation
const PRICE_AMOUNTS: Record<string, number> = {
  standard: 2900,
  "standard-yearly": 14900,
  premium: 4900,
  "premium-yearly": 24900,
  ultimate: 9900,
  "ultimate-yearly": 49900,
}

export async function createLicenseKey(
  email: string,
  plan: string,
  stripeSessionId: string,
  stripePaymentIntentId?: string,
  referralCode?: string,
) {
  const supabase = getSupabase()

  const tier = PLAN_TO_TIER[plan]
  const duration = PLAN_TO_DURATION[plan]
  if (!tier || !duration) {
    throw new Error(`Unknown plan: ${plan}`)
  }

  // Idempotency: check if key already exists for this session
  const { data: existing } = await (supabase as any)
    .from("license_keys")
    .select("key, tier, duration")
    .eq("stripe_session_id", stripeSessionId)
    .single()

  if (existing) {
    return existing
  }

  // Generate unique key with collision retry
  let key = generateLicenseKey()
  let attempts = 0
  while (attempts < 5) {
    const { data: collision } = await (supabase as any)
      .from("license_keys")
      .select("id")
      .eq("key", key)
      .single()
    if (!collision) break
    key = generateLicenseKey()
    attempts++
  }

  // Resolve affiliate
  let affiliateUserId: string | null = null
  if (referralCode) {
    const { data: affiliate } = await supabase
      .from("users_extended")
      .select("id")
      .eq("referral_code", referralCode)
      .single()
    if (affiliate) {
      affiliateUserId = affiliate.id
    }
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const { error } = await (supabase as any).from("license_keys").insert({
    key,
    tier,
    duration,
    status: "unused",
    stripe_session_id: stripeSessionId,
    stripe_payment_intent_id: stripePaymentIntentId || null,
    price_amount_cents: PRICE_AMOUNTS[plan] || 0,
    buyer_email: email,
    referral_code: referralCode || null,
    affiliate_user_id: affiliateUserId,
    expires_at: expiresAt.toISOString(),
  })

  if (error) {
    throw new Error(`Failed to insert license key: ${error.message}`)
  }

  return { key, tier, duration }
}

export async function getKeyBySessionId(sessionId: string) {
  const supabase = getSupabase()

  const { data, error } = await (supabase as any)
    .from("license_keys")
    .select("key, tier, duration, expires_at")
    .eq("stripe_session_id", sessionId)
    .single()

  if (error || !data) {
    return null
  }

  return data
}
