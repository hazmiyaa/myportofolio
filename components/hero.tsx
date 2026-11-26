import Link from "next/link"
import { Copy } from "@/components/language"
import { Gamepad2, Play } from "lucide-react"
import { VideoPreview } from "./video-preview"
import { StudioMotion } from "./studio-motion"
import { showreel } from "@/lib/video-utils"

export default function Hero() {
  return <section className="hero-panel" id="hero" aria-labelledby="hero-title">
    <img src="/studio-play.webp" className="hero-art" alt="" width={1800} height={700} fetchPriority="high"/>
    <div className="hero-shade" aria-hidden="true"/><StudioMotion/>
    <div className="hero-copy">
      <p className="signature"><img src="/portrait.webp" alt="" width={32} height={32}/><Copy id="Halo, saya Dicky Hazmi Bahrain." en="Hey, I’m Dicky Hazmi Bahrain."/></p>
      <h1 id="hero-title"><Copy id="Video editor" en="Video editor"/><br/><em><Copy id="&amp; kreator konten." en="&amp; content creator."/></em></h1>
      <p className="hero-summary"><Copy id="Saya ngedit iklan dan bikin video pendek untuk YouTube dan TikTok. Saya juga bikin game untuk klien sebagai junior Roblox developer." en="I edit ads and make short videos for YouTube and TikTok. I also build games for clients as a junior Roblox developer."/></p>
      <div className="hero-actions" id="showreels">
        <VideoPreview video={showreel} className="primary-action"><Play size={15} fill="currentColor"/><Copy id="Putar showreel" en="Play my reel"/></VideoPreview>
        <Link href="/games" className="secondary-action"><Gamepad2 size={17}/><Copy id="Lihat proyek Roblox" en="See my Roblox work"/></Link>
      </div>
    </div>
  </section>
}
