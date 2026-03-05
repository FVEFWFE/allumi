import { Resend } from "resend"

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set")
    }
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export async function sendLicenseKeyEmail(email: string, key: string, tier: string, duration: string) {
  const resend = getResend()
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1)
  const durationLabel = duration === "1year" ? "1 Year" : "1 Month"
  const ggUrl = process.env.NEXT_PUBLIC_GG_URL || "https://getgooned.ai"

  await resend.emails.send({
    from: "GG Technologies <support@getgooned.ai>",
    to: email,
    subject: "Your License Key",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px 30px; border-radius: 12px;">
        <h1 style="font-size: 24px; margin: 0 0 8px;">Your License Key</h1>
        <p style="color: #999; margin: 0 0 30px;">Thank you for your purchase.</p>

        <div style="background: #141414; border: 1px solid #333; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="color: #999; font-size: 13px; margin: 0 0 8px;">LICENSE KEY</p>
          <p style="font-family: monospace; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 2px; color: #ec4899;">${key}</p>
        </div>

        <div style="background: #141414; border: 1px solid #333; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #999; padding: 4px 0;">Plan</td><td style="text-align: right; padding: 4px 0;">${tierLabel}</td></tr>
            <tr><td style="color: #999; padding: 4px 0;">Duration</td><td style="text-align: right; padding: 4px 0;">${durationLabel}</td></tr>
            <tr><td style="color: #999; padding: 4px 0;">Key expires</td><td style="text-align: right; padding: 4px 0;">30 days (activate before then)</td></tr>
          </table>
        </div>

        <a href="${ggUrl}/checkout?tab=card" style="display: block; background: #ec4899; color: #fff; text-align: center; padding: 14px; border-radius: 12px; text-decoration: none; font-weight: 600; margin-bottom: 16px;">Activate Key on GetGooned.ai</a>

        <p style="color: #666; font-size: 12px; text-align: center;">Copy the key above, visit the link, and paste it in the activation field.</p>
      </div>
    `,
  })
}
