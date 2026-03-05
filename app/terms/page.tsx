import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 px-6 pt-24 pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">Last updated: March 2026</p>

          <div className="mt-12 space-y-8">
            <section>
              <h2 className="text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                By accessing or using Allumi, you agree to be bound by these Terms of Service. If you do not agree to
                these terms, please do not use our service. These terms apply to all visitors, users, and others who
                access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">2. Description of Service</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Allumi provides a digital productivity system including 843 curated maxims, organizational tools, and
                knowledge management features. The service is provided &ldquo;as is&rdquo; and we reserve the right to
                modify, suspend, or discontinue any aspect of the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">3. User Accounts</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account. You agree to notify us immediately of any unauthorized use of
                your account. We are not liable for any loss or damage arising from your failure to protect your account
                information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">4. License and Usage</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Upon purchase, you are granted a non-exclusive, non-transferable license to use Allumi for personal or
                business purposes according to your subscription tier. You may not redistribute, resell, or share your
                license key with others. Team licenses permit usage only by the specified number of team members.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">5. Payment and Refunds</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                All purchases are final. We offer a 14-day money-back guarantee if you are not satisfied with the
                service. Refund requests must be submitted through our support channel within 14 days of purchase. Team
                plan refunds are prorated based on unused time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">6. Intellectual Property</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                All content, features, and functionality of Allumi are owned by Allumi and are protected by
                international copyright, trademark, and other intellectual property laws. You may not copy, modify,
                distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">7. Limitation of Liability</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Allumi shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use or inability to use the service. Our total liability shall not exceed
                the amount paid by you for the service in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground">8. Contact</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                If you have questions about these Terms of Service, please contact us at{" "}
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
