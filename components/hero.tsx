import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
      {/* Faint grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Your Second Brain
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Organize your mind. Master your life. 843 maxims and a complete productivity system to help you think clearer
          and do more.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="#pricing">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
