"use client"

import type { ReactNode } from "react"
import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { PortfolioVideo } from "@/lib/video-utils"

export function VideoPreview({ video, className, children }: {
  video: PortfolioVideo
  className: string
  children: ReactNode
}) {
  return <Dialog>
    <DialogTrigger asChild><button type="button" className={className}>{children}</button></DialogTrigger>
    <DialogContent className={video.portrait ? "video-modal max-w-md" : "video-modal max-w-4xl"}>
      <DialogHeader>
        <DialogTitle>{video.title}</DialogTitle>
        <DialogDescription>{video.handle ?? video.platform}{video.caption && " · " + video.caption}</DialogDescription>
      </DialogHeader>
      <iframe src={video.embedUrl} title={video.title} className={video.portrait ? "portrait-player" : "wide-player"} allowFullScreen allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
      <div className="player-links"><a href={video.url} target="_blank" rel="noreferrer">Tonton di {video.platform}</a>{video.source && <a href={video.source} target="_blank" rel="noreferrer">Unggahan asli</a>}</div>
    </DialogContent>
  </Dialog>
}

export function VideoCard({ video }: { video: PortfolioVideo }) {
  return <VideoPreview video={video} className="media-card">
    <span className="card-image">
      <img src={video.thumbnail} width="640" height="360" loading="lazy" alt=""/>
      <span className="card-play"><Play size={17} fill="currentColor"/></span>
    </span>
    <small>{video.handle ?? video.platform}</small><strong>{video.title}</strong>
  </VideoPreview>
}
