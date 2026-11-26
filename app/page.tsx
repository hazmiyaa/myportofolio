import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
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
      <header className="shelf-heading"><div><h2 id="home-video-title">Video yang saya edit</h2><p>Showreel saya dan dua video pendek yang saya buat untuk YouTube dan TikTok.</p></div>
        <Link href="/videos" className="browse-link">Semua video</Link>
      </header>
      <div className="media-grid">{featuredVideos.map(video=><VideoCard video={video} key={video.url}/>)}</div>
    </section>
    <section className="shelf game-shelf" aria-labelledby="home-game-title">
      <header className="shelf-heading"><div><h2 id="home-game-title">Game Roblox yang saya kerjakan</h2><p>Saya mengembangkan game untuk klien. Di Mount Ilamona, saya khusus mengerjakan Sistem Hazmiya.</p></div>
        <Link href="/games" className="browse-link">Semua game</Link>
      </header>
      <div className="game-picks">{featuredGames.map(game=><GameCard key={game.id} game={game}/>)}</div>
    </section>
    <section id="about" className="about-layout">
      <ProfilePortrait/>
      <div className="about-copy"><p className="location"><MapPin size={15}/>Pamulang, Tangerang Selatan</p>
        <h2>Tentang saya</h2>
        <p>Saya Dicky, lulusan Ilmu Komunikasi peminatan Periklanan dari Universitas Muhammadiyah Jakarta. Sudah lebih dari lima tahun saya mengedit video untuk klien dan media sosial.</p>
        <p>Saya belajar Roblox Studio sambil mengerjakan game untuk klien. Di beberapa proyek, bagian saya khusus Sistem Hazmiya. Cuplikan prosesnya saya bagikan di <a href="https://www.tiktok.com/@bloxgrowblox" target="_blank" rel="noreferrer">@bloxgrowblox</a>.</p>
        <dl className="skill-list" id="skills"><div><dt>Video</dt><dd>Editing, motion graphics, videografi</dd></div><div><dt>Game</dt><dd>Roblox Studio, Sistem Hazmiya</dd></div><div><dt>Perangkat AI</dt><dd>Antigravity, Claude Code, Codex, ChatGPT</dd></div></dl>
      </div>
    </section>
    <section id="contact" className="contact-grid">
      <div><h2>Kerja sama</h2><p className="contact-intro">Hubungi saya kalau kamu butuh editor video atau developer Roblox untuk proyekmu.</p>
        <a className="mail-line" href="mailto:bahriandicky@gmail.com"><Mail size={17}/>bahriandicky@gmail.com</a>
        <div className="contact-social"><a href="https://www.linkedin.com/in/hazmiya/">LinkedIn</a><a href="https://www.instagram.com/dikikul/">Instagram</a><a href="tel:+6289635913489">Telepon</a></div>
      </div><Contact/>
    </section>
  </main>
}
