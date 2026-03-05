import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturesGrid } from "@/components/features-grid"
import { DetailedFeatures } from "@/components/detailed-features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturesGrid />
      <DetailedFeatures />
      <Pricing />
      <Footer />
    </main>
  )
}
