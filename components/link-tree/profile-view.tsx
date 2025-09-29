"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { VerifiedBadge } from "@/components/verified-badge"
import { LinkItem } from "@/components/link-item"
import VideoPreviewGrid from "@/components/video-preview-grid"
import { useThemeSettings } from "@/hooks/use-theme-settings"
import { cn } from "@/lib/utils"
import type { Profile } from "@/hooks/use-profile"
import type { LinkItemProps } from "@/hooks/use-links"

interface ProfileViewProps {
  profile: Profile
  links: LinkItemProps[]
}

export function ProfileView({ profile, links }: ProfileViewProps) {
  const { themeSettings } = useThemeSettings()

  return (
    <Card
      className={cn(
        "shadow-lg border-0 sm:border-2 rounded-none sm:rounded-lg",
        "sm:" + themeSettings.borderRadius,
        themeSettings.effects.shadow ? "sm:shadow-2xl" : "shadow-none",
        themeSettings.effects.glassmorphism && "glassmorphism",
      )}
      style={{ 
        opacity: themeSettings.effects.cardOpacity,
        backgroundColor: '#18181b',
        borderColor: '#3f3f46',
        color: '#ffffff',
        boxShadow: themeSettings.effects.shadow ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : 'none'
      }}
    >
      <CardContent className="p-4 sm:p-7" style={{ backgroundColor: 'transparent' }}>
        <div className={cn("flex flex-col items-center mb-5 sm:mb-6", themeSettings.font)}>
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 mb-4 sm:mb-5">
            <AvatarImage src={profile.avatarUrl || "/dex.png"} alt={profile.name} />
            <AvatarFallback className="text-2xl sm:text-3xl">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center px-4">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-lg sm:text-xl font-semibold">{profile.name}</h2>
              {profile.verified && <VerifiedBadge />}
            </div>
            <p className="text-muted-foreground mt-2.5 text-sm sm:text-base leading-relaxed max-w-[575px]">{profile.bio}</p>
          </div>
        </div>

        <div className="w-full space-y-2.5 sm:space-y-3.5">
          {links.length === 0 ? (
            <p className="text-center text-muted-foreground text-base">
              No links added yet. Click the edit button to add links.
            </p>
          ) : (
            links.map((link) => (
              <div key={link.id}>
                <LinkItem {...link} isEditMode={false} />
                {/* Show video preview grid for the Recent Videos link */}
                {link.title.includes("Recent Videos") && (
                  <VideoPreviewGrid />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
