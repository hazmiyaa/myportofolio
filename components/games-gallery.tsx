"use client"

import { useState } from "react"
import { robloxGames } from "@/lib/roblox-games"
import { GameCard } from "./game-card"
import SearchField from "./search-field"

const filters = ["Semua game", "Sistem Hazmiya", "Survival"] as const
type Filter = typeof filters[number]

export default function GamesGallery() {
  const [filter, setFilter] = useState<Filter>("Semua game")
  const [query, setQuery] = useState("")
  const term = query.trim().toLocaleLowerCase("id")
  const games = robloxGames.filter(game =>
    (filter === "Semua game" || (filter === "Survival" ? game.survival : game.hazmiyaOnly)) &&
    game.title.toLocaleLowerCase("id").includes(term)
  )
  return <section id="koleksi" aria-labelledby="game-collection">
    <div className="library-section-heading"><h2 id="game-collection">Daftar proyek</h2><span className="result-count" aria-live="polite">{games.length} game</span></div>
    <div className="gallery-tools"><div className="filter-tabs" aria-label="Filter game">{filters.map(label=><button key={label} aria-pressed={filter === label} onClick={()=>setFilter(label)}>{label}</button>)}</div>
      <SearchField label="Cari nama game" value={query} onChange={setQuery}/>
    </div>
    {games.length ? <div className="media-grid">{games.map(game=><GameCard key={game.id} game={game}/>)}</div>
      : <div className="empty"><p>Game yang kamu cari belum ketemu di koleksi ini.</p><button onClick={()=>{setQuery("");setFilter("Semua game")}}>Tampilkan semua game</button></div>}
  </section>
}
