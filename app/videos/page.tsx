import type { Metadata } from "next"
import { Copy } from "@/components/language"
import { requestLanguage } from "@/lib/request-language"
import { Clapperboard, Play } from "lucide-react"
import Projects from "@/components/projects"
import { VideoPreview } from "@/components/video-preview"
import { showreel } from "@/lib/video-utils"
import { creatorVideos } from "@/lib/creator-videos"
import { CoverDeck } from "@/components/cover-deck"

export async function generateMetadata(): Promise<Metadata> {
  return { title: await requestLanguage() === "en" ? "Video work" : "Karya video" }
}

export default function VideosPage() {
  const features = [showreel,...creatorVideos.filter(video=>video.handle!=="@bloxgrowblox").slice(0,4).map(video=>({...video,portrait:true}))]
  const covers = features.map(video=>({title:video.title,image:video.thumbnail ?? "/media/showreel.webp", url:video.url, video}))
  return <main id="main" className="page-shell library-page video-library">
    <header className="library-heading"><h1><Copy id="Portofolio video" en="My video work"/></h1><p><Copy id="Di sini saya kumpulkan video untuk klien dan konten kanal saya di YouTube, TikTok, dan Facebook. Sekarang saya banyak bereksperimen dengan visual AI." en="This is a mix of client edits and videos from my YouTube, TikTok, and Facebook channels. Lately I’ve been experimenting with AI visuals."/></p></header>
    <section className="spotlight"><CoverDeck mode="video" items={covers}/><div className="spotlight-copy">
      <Clapperboard className="feature-icon" size={24}/><h2><Copy id="Showreel saya" en="My editing reel"/></h2>
      <p><Copy id="Saya rangkum cuplikan dari beberapa proyek dalam satu video supaya kamu bisa lihat gaya editing saya." en="I cut together a few favorite moments from past projects to give you a feel for my editing style."/></p>
      <VideoPreview video={showreel} className="primary-action"><Play size={15} fill="currentColor"/><Copy id="Putar showreel" en="Play my reel"/></VideoPreview>
    </div></section>
    <Projects/>
  </main>
}
