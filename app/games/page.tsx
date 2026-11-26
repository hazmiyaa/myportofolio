import type { Metadata } from "next"
import { Copy } from "@/components/language"
import { requestLanguage } from "@/lib/request-language"
import { Box, Gamepad2 } from "lucide-react"
import { robloxGames, robloxProfileUrl } from "@/lib/roblox-games"
import { creatorProfiles, creatorVideos } from "@/lib/creator-videos"
import { VideoCard } from "@/components/video-preview"
import { BrandImage } from "@/components/brand-image"
import GamesGallery from "@/components/games-gallery"
import { CoverDeck } from "@/components/cover-deck"

export async function generateMetadata(): Promise<Metadata> {
  return { title: await requestLanguage() === "en" ? "Roblox games" : "Game Roblox" }
}

export default function GamesPage() {
  const covers = [robloxGames[0],robloxGames[1],robloxGames[2],robloxGames[14],robloxGames[15]]
  const developer = creatorProfiles.find(profile=>profile.handle==="@bloxgrowblox")!
  return <main id="main" className="page-shell library-page game-library">
    <header className="library-heading"><h1><Copy id="Portofolio game Roblox" en="My Roblox games"/></h1><p><Copy id={`Ini ${robloxGames.length} proyek Roblox yang pernah saya kerjakan, termasuk game untuk klien.`} en={`Here are ${robloxGames.length} Roblox projects I’ve worked on, including games for clients.`}/></p></header>
    <section className="spotlight"><CoverDeck mode="game" items={covers}/><div className="spotlight-copy">
      <Gamepad2 className="feature-icon" size={24}/><h2><Copy id="Peran saya di tiap proyek" en="What I worked on"/></h2>
      <p><Copy id="Saya mengerjakan game seperti Alchemist Forest dan Altura Catena. Di tujuh proyek lainnya, termasuk Mount Ilamona dan Hanta Wood, saya khusus mengembangkan sistem gamenya." en="I worked on games like Alchemist Forest and Altura Catena. On seven other projects, including Mount Ilamona and Hanta Wood, I worked specifically on the game systems."/></p>
      <a href={robloxProfileUrl} className="secondary-action" target="_blank" rel="noreferrer"><Box size={16}/><Copy id="Profil Roblox saya" en="My Roblox profile"/></a>
    </div></section>
    <GamesGallery/>
    <section className="shelf devlog-section"><header className="shelf-heading"><div><h2><Copy id="Proses pengembangan game" en="Roblox devlogs"/></h2><p><Copy id="Cuplikan animasi, kontrol mobile, dan cutscene yang saya bagikan selama pengembangan." en="A few clips of animations, touch controls, and cutscenes from my projects."/></p></div><a className="browse-link brand-link" href={developer.url} target="_blank" rel="noreferrer"><BrandImage name="TikTok" size={18}/>{developer.handle}</a></header>
      <div className="media-grid">{creatorVideos.filter(v=>v.handle===developer.handle).map(video=><VideoCard key={video.id} video={{...video,portrait:true}}/>)}</div>
    </section>
  </main>
}
