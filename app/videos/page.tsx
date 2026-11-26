import type { Metadata } from "next"
import { Clapperboard, Play } from "lucide-react"
import Projects from "@/components/projects"
import { VideoPreview } from "@/components/video-preview"
import { showreel } from "@/lib/video-utils"
import { creatorVideos } from "@/lib/creator-videos"
import { CoverDeck } from "@/components/cover-deck"

export const metadata: Metadata = { title: "Karya video" }

export default function VideosPage() {
  const features = [showreel,...creatorVideos.filter(video=>video.handle!=="@bloxgrowblox").slice(0,4).map(video=>({...video,portrait:true}))]
  const covers = features.map(video=>({title:video.title,image:video.thumbnail ?? "/media/showreel.webp", url:video.url, video}))
  return <main id="main" className="page-shell library-page video-library">
    <header className="library-heading"><h1>Portofolio video</h1><p>Saya mengedit video untuk klien dan membuat konten untuk kanal saya di YouTube, TikTok, dan Facebook.</p></header>
    <section className="spotlight"><CoverDeck mode="video" items={covers}/><div className="spotlight-copy">
      <Clapperboard className="feature-icon" size={24}/><h2>Showreel saya</h2>
      <p>Saya rangkum cuplikan dari beberapa proyek dalam satu video supaya kamu bisa lihat gaya editing saya.</p>
      <VideoPreview video={showreel} className="primary-action"><Play size={15} fill="currentColor"/>Putar showreel</VideoPreview>
    </div></section>
    <Projects/>
  </main>
}
