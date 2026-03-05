import { Suspense } from "react"
import { SuccessContent } from "@/components/success-content"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
