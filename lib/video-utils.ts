import { clientProjects } from "./client-projects"

export interface PortfolioVideo {
  title: string
  platform: string
  url: string
  embedUrl: string
  thumbnail?: string
  handle?: string
  source?: string
  caption?: string
  portrait?: boolean
}

export const showreel: PortfolioVideo = {
  title: "Showreel Dicky Hazmi Bahrain",
  platform: "YouTube",
  url: "https://www.youtube.com/watch?v=YGi96lDiip4",
  embedUrl: "https://www.youtube-nocookie.com/embed/YGi96lDiip4",
}

type ClientProject = (typeof clientProjects)[number]["projects"][number]

export function clientVideo(project: ClientProject, client: string): PortfolioVideo {
  const url = new URL(project.videoUrl)
  const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v")
  const seconds = parseInt(url.searchParams.get("t") ?? "", 10)
  const source = project.description.match(/https?:\/\/[^\s]+/)?.[0]
  return {
    title: project.title, platform: "YouTube", url: project.videoUrl,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}${seconds ? "?start=" + seconds : ""}`,
    handle: client, source,
    caption: !source && project.description !== "Watch Here" ? project.description : undefined,
  }
}
