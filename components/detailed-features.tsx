import { Check } from "lucide-react"
import Image from "next/image"

const detailedFeatures = [
  {
    title: "Maxims Library",
    description: "843 carefully curated maxims organized into 5 pillars:",
    items: [
      "Mindset - Mental models and thinking frameworks",
      "Money - Financial wisdom and wealth principles",
      "Network - Relationship building and social intelligence",
      "Fitness - Health, energy, and physical optimization",
      "Travel - Adventure, experience, and lifestyle design",
    ],
    image: "/images/c159162b1b4eff6f4aa2ee699933de75fcbd6969.jpeg",
  },
  {
    title: "Built for Focus",
    description: "A productivity system designed for how your brain actually works.",
    items: [
      "Today vs Someday - Know exactly what needs attention now",
      "ADHD-friendly design - Reduce overwhelm, increase clarity",
      "Zero friction capture - Get thoughts out of your head instantly",
    ],
    image: "/images/e902d788-38c5-4c88-8856-a40220163ec2.png",
  },
  {
    title: "AI-Powered Workflows",
    description: "Stop starting from scratch. Use battle-tested prompts and API integrations.",
    items: [
      "LLM prompt library for common tasks",
      "API productivity system templates",
      "Automation workflows that actually work",
    ],
    image: "/images/ai-workflows.jpg",
  },
]

export function DetailedFeatures() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-24">
        {detailedFeatures.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className={index % 2 === 1 ? "md:order-2" : ""}>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">{feature.title}</h2>
              <p className="mt-4 text-muted-foreground">{feature.description}</p>
              <ul className="mt-6 space-y-3">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`relative aspect-video overflow-hidden rounded-xl border border-border/50 ${index % 2 === 1 ? "md:order-1" : ""}`}
            >
              <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
