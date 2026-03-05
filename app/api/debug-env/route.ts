import { NextResponse } from "next/server"

// Force fresh Vercel build - env var debug v2
export async function GET() {
  return NextResponse.json({
    has_supabase_url: !!process.env.SUPABASE_URL,
    has_supabase_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    has_resend: !!process.env.RESEND_API_KEY,
    has_stripe: !!process.env.STRIPE_SECRET_KEY,
    has_gg_url: !!process.env.NEXT_PUBLIC_GG_URL,
    supabase_url_prefix: process.env.SUPABASE_URL?.substring(0, 20) || "NOT SET",
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
    all_env_keys: Object.keys(process.env).filter(k =>
      k.startsWith("SUPABASE") || k.startsWith("RESEND") || k.startsWith("STRIPE") || k.startsWith("NEXT_PUBLIC_GG") || k.startsWith("VERCEL")
    ),
  })
}
