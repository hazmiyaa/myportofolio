import type { Metadata } from "next"
import { Box, Gamepad2 } from "lucide-react"
import { robloxGames, robloxProfileUrl } from "@/lib/roblox-games"
import { creatorProfiles, creatorVideos } from "@/lib/creator-videos"
import { VideoCard } from "@/components/video-preview"
import GamesGallery from "@/components/games-gallery"
import { CoverDeck } from "@/components/cover-deck"

export const metadata: Metadata = { title: "Game Roblox" }

export default function GamesPage() {
  const covers = [robloxGames[0],robloxGames[1],robloxGames[2],robloxGames[14],robloxGames[15]]
  const developer = creatorProfiles.find(profile=>profile.handle==="@bloxgrowblox")!
  return <main id="main" className="page-shell library-page game-library">
    <header className="library-heading"><h1>Portofolio game Roblox</h1><p>Ini {robloxGames.length} proyek Roblox yang pernah saya kerjakan, termasuk game untuk klien.</p></header>
    <section className="spotlight"><CoverDeck mode="game" items={covers}/><div className="spotlight-copy">
      <Gamepad2 className="feature-icon" size={24}/><h2>Peran saya di tiap proyek</h2>
      <p>Saya mengerjakan game seperti Alchemist Forest dan Altura Catena. Di tujuh proyek lainnya, termasuk Mount Ilamona dan Hanta Wood, kontribusi saya khusus pada Sistem Hazmiya.</p>
      <a href={robloxProfileUrl} className="secondary-action" target="_blank" rel="noreferrer"><Box size={16}/>Profil Roblox saya</a>
    </div></section>
    <GamesGallery/>
    <section className="shelf devlog-section"><header className="shelf-heading"><div><h2>Proses pengembangan game</h2><p>Cuplikan animasi, kontrol mobile, dan cutscene yang saya bagikan selama pengembangan.</p></div><a className="browse-link" href={developer.url} target="_blank" rel="noreferrer">{developer.handle}</a></header>
      <div className="media-grid">{creatorVideos.filter(v=>v.handle===developer.handle).map(video=><VideoCard key={video.id} video={{...video,portrait:true}}/>)}</div>
    </section>
  </main>
}
