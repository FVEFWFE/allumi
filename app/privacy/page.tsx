import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 px-6 pt-24 pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">Last updated: March 2026</p>

          <div className="mt-12 space-y-8">
            <section>
              <h2 className="text-xl font-medium text-foreground">1. Information We Collect</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We collect information you provide directly, including your email address when you create an account or
                make a purchase. We also automatically collect certain information about your device and usage of our
                service, including IP address, browser type, and pages visited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">2. How We Use Your Information</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use your information to provide and improve our services, process transactions, send you updates and
                marketing communications (with your consent), respond to your inquiries, and detect and prevent fraud.
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">3. Data Storage and Security</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Your data is stored securely using industry-standard encryption and security practices. We retain your
                information for as long as your account is active or as needed to provide you services. You may request
                deletion of your account and associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">4. Cookies and Tracking</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to analyze trends, administer the website, and gather
                demographic information. You can control cookie preferences through your browser settings. Disabling
                cookies may affect your ability to use certain features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">5. Third-Party Services</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We may use third-party services for payment processing, analytics, and email delivery. These services
                have their own privacy policies and we encourage you to review them. We only share the minimum
                information necessary for these services to function.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">6. Your Rights</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may also opt out of
                marketing communications at any time. To exercise these rights, please contact us through our support
                page. We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">7. Children&apos;s Privacy</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children. If you believe we have collected information from a child, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">8. Contact</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <Link href="/support" className="text-primary hover:underline">
                  our support page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
