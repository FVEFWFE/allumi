import Link from "next/link"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-medium tracking-tight text-foreground">
          allumi
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
