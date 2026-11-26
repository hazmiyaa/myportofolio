import { Gamepad2 } from "lucide-react"
import type { RobloxGame } from "@/lib/roblox-games"

export function GameCard({ game }: { game: RobloxGame }) {
  const credit = game.hazmiyaOnly ? "Kontribusi khusus Sistem Hazmiya" : game.survival ? "Game survival" : "Roblox"
  return <a className="media-card game-item" href={game.url} target="_blank" rel="noreferrer">
    <span className="card-image"><img src={game.image} alt="" width={768} height={432} loading="lazy"/><span className="card-play"><Gamepad2 size={18}/></span></span>
    <small>{credit}</small><strong>{game.title}</strong>
  </a>
}
