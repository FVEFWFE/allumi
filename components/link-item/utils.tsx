"use client"

import { TwitterIcon, GithubIcon, LinkedinIcon, GlobeIcon, LinkIcon } from "@/components/icons"

// Function to determine the appropriate icon based on the URL
export const getLinkIcon = (url: string) => {
  const domain = url
    .toLowerCase()
    .replace(/https?:\/\//, "")
    .split("/")[0]

  if (domain.includes("twitter.com") || domain.includes("x.com")) {
    return <TwitterIcon size={18} />
  } else if (domain.includes("github.com")) {
    return <GithubIcon size={18} />
  } else if (domain.includes("linkedin.com")) {
    return <LinkedinIcon size={18} />
  } else if (domain.includes("haydenbleasel.com")) {
    return <GlobeIcon size={18} />
  } else {
    return <LinkIcon size={18} />
  }
}
