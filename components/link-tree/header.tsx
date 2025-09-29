"use client"

interface HeaderProps {
  isEditMode: boolean
  onToggleEditMode: () => void
}

export function Header({ isEditMode, onToggleEditMode }: HeaderProps) {
  return (
    <div className="flex justify-center items-center mb-3 pt-2">
      <h1 className="text-sm font-medium text-muted-foreground">v0.me</h1>
    </div>
  )
}
