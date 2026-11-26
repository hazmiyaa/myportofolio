import Link from "next/link"
import { Gamepad2, Play } from "lucide-react"
import { VideoPreview } from "./video-preview"
import { StudioMotion } from "./studio-motion"
import { showreel } from "@/lib/video-utils"

export default function Hero() {
  return <section className="hero-panel" id="hero" aria-labelledby="hero-title">
    <img src="/studio-play.webp" className="hero-art" alt="" width={1800} height={700} fetchPriority="high"/>
    <div className="hero-shade" aria-hidden="true"/><StudioMotion/>
    <div className="hero-copy">
      <p className="signature"><img src="/portrait.webp" alt="" width={32} height={32}/>Halo, saya Dicky Hazmi Bahrain.</p>
      <h1 id="hero-title">Saya bikin video<br/>dan <em>game Roblox.</em></h1>
      <p className="hero-summary">Selain edit video, saya juga developer Roblox pemula. Sejauh ini saya sudah bikin banyak game untuk klien.</p>
      <div className="hero-actions" id="showreels">
        <VideoPreview video={showreel} className="primary-action"><Play size={15} fill="currentColor"/>Putar showreel</VideoPreview>
        <Link href="/games" className="secondary-action"><Gamepad2 size={17}/>Lihat proyek Roblox</Link>
      </div>
    </div>
  </section>
}
