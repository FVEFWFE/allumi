import { Brain, ListChecks, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "843 Maxims",
    description:
      "Curated wisdom across mindset, money, network, fitness, and travel. Your mental frameworks in one place.",
  },
  {
    icon: ListChecks,
    title: "Productivity System",
    description: "Today vs Someday todos. ADHD-friendly organization. Stay focused on what matters right now.",
  },
  {
    icon: Sparkles,
    title: "LLM Prompts & API Tools",
    description: "Pre-built prompts and API workflows to supercharge your productivity with AI.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card/50 p-8 transition-all hover:border-primary/30 hover:bg-card"
            >
              <feature.icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-medium text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
