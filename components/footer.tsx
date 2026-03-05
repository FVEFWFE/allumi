import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">&copy; 2026 Allumi</p>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/support" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}
