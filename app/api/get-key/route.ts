import { NextRequest, NextResponse } from "next/server"
import { getKeyBySessionId } from "@/lib/license-keys"

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
  }

  const data = await getKeyBySessionId(sessionId)

  if (!data) {
    return NextResponse.json({ pending: true }, { status: 202 })
  }

  const ggUrl = process.env.NEXT_PUBLIC_GG_URL || "https://getgooned.ai"

  return NextResponse.json({
    key: data.key,
    tier: data.tier,
    duration: data.duration,
    expiresAt: data.expires_at,
    activationUrl: `${ggUrl}/checkout?tab=card`,
  })
}
