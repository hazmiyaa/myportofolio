import Link from "next/link"
import { Copy } from "@/components/language"
import { Mail, MapPin } from "lucide-react"
import { aiTools, BrandImage } from "@/components/brand-image"
import Hero from "@/components/hero"
import Contact from "@/components/contact"
import ProfilePortrait from "@/components/profile-portrait"
import { VideoCard } from "@/components/video-preview"
import { GameCard } from "@/components/game-card"
import { creatorVideos } from "@/lib/creator-videos"
import { robloxGames } from "@/lib/roblox-games"
import { showreel } from "@/lib/video-utils"

const featuredVideos = [
  { ...showreel, thumbnail: "/media/showreel.webp", handle: "Showreel" },
  { ...creatorVideos[0], portrait: true },
  { ...creatorVideos[1], portrait: true },
]
const featuredGames = [robloxGames[0], robloxGames[14], robloxGames[4]]

export default function Home() {
  return <main id="main" className="page-shell home-page">
    <Hero/>
    <section className="shelf" id="portfolio" aria-labelledby="home-video-title">
      <header className="shelf-heading"><div><h2 id="home-video-title"><Copy id="Video pilihan saya" en="Selected videos"/></h2><p><Copy id="Showreel saya dan dua video pendek yang saya buat untuk YouTube dan TikTok." en="My editing reel and two shorts I made for YouTube and TikTok."/></p></div>
        <Link href="/videos" className="browse-link"><Copy id="Semua video" en="All videos"/></Link>
      </header>
      <div className="media-grid">{featuredVideos.map(video=><VideoCard video={video} key={video.url}/>)}</div>
    </section>
    <section className="shelf game-shelf" aria-labelledby="home-game-title">
      <header className="shelf-heading"><div><h2 id="home-game-title"><Copy id="Game Roblox yang saya kerjakan" en="My Roblox projects"/></h2><p><Copy id="Alchemist Forest, 7Days Forest Survival, dan Mount Ilamona adalah beberapa proyek Roblox yang saya kerjakan." en="Alchemist Forest, 7Days Forest Survival, and Mount Ilamona are a few of the Roblox projects I’ve worked on."/></p></div>
        <Link href="/games" className="browse-link"><Copy id="Semua game" en="All games"/></Link>
      </header>
      <div className="game-picks">{featuredGames.map(game=><GameCard key={game.id} game={game}/>)}</div>
    </section>
    <section id="about" className="about-layout">
      <ProfilePortrait/>
      <div className="about-copy"><p className="location"><MapPin size={15}/><Copy id="Pamulang, Tangerang Selatan" en="Pamulang, South Tangerang"/></p>
        <h2><Copy id="Tentang saya" en="About me"/></h2>
        <p><Copy id="Saya Dicky, lulusan Ilmu Komunikasi peminatan Periklanan dari Universitas Muhammadiyah Jakarta. Sudah lebih dari lima tahun saya mengedit video untuk klien dan media sosial." en="I’m Dicky. I studied advertising at Universitas Muhammadiyah Jakarta and have spent over five years editing videos for clients and social media."/></p>
        <p><Copy id="Saya juga bikin game untuk klien di Roblox Studio. Di beberapa proyek, saya khusus mengerjakan sistem gamenya. Saya bagikan prosesnya di" en="I also build client games in Roblox Studio. On some projects, my role is to build the game systems. I share clips of that work on"/>{" "}<a href="https://www.tiktok.com/@bloxgrowblox" target="_blank" rel="noreferrer" className="brand-link"><BrandImage name="TikTok" size={16}/>@bloxgrowblox</a>.</p>
        <dl className="skill-list" id="skills"><div><dt>Video</dt><dd><Copy id="Editing video, motion graphics, videografi" en="Video editing, motion graphics, videography"/></dd></div><div><dt>Game</dt><dd><Copy id="Roblox Studio, pengembangan sistem game" en="Roblox Studio, game systems development"/></dd></div><div><dt><Copy id="Perangkat AI" en="AI tools"/></dt><dd><ul className="ai-tools">{aiTools.map(name => <li key={name}><BrandImage name={name} size={26}/>{name}</li>)}</ul></dd></div></dl>
      </div>
    </section>
    <section id="contact" className="contact-grid">
      <div><h2><Copy id="Kerja sama" en="Let’s work together"/></h2><p className="contact-intro"><Copy id="Punya ide video atau proyek Roblox? Ceritakan ke saya." en="Got a video idea or a Roblox project in mind? I’d love to hear about it."/></p>
        <a className="mail-line" href="mailto:bahriandicky@gmail.com"><Mail size={17}/>bahriandicky@gmail.com</a>
        <div className="contact-social"><a href="https://www.linkedin.com/in/hazmiya/"><BrandImage name="LinkedIn"/>LinkedIn</a><a href="https://www.instagram.com/dikikul/"><BrandImage name="Instagram"/>Instagram</a><a href="tel:+6289635913489"><Copy id="Telepon" en="Call me"/></a></div>
      </div><Contact/>
    </section>
  </main>
}
