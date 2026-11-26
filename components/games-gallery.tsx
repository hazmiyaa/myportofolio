"use client"

import { useLanguage } from "./language"

import { useState } from "react"
import { robloxGames } from "@/lib/roblox-games"
import { GameCard } from "./game-card"
import SearchField from "./search-field"

const filters = ["Semua game", "Sistem game", "Survival"] as const
type Filter = typeof filters[number]

export default function GamesGallery() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>("Semua game")
  const [query, setQuery] = useState("")
  const term = query.trim().toLocaleLowerCase("id")
  const games = robloxGames.filter(game =>
    (filter === "Semua game" || (filter === "Survival" ? game.survival : game.hazmiyaOnly)) &&
    game.title.toLocaleLowerCase("id").includes(term)
  )
  return <section id="koleksi" aria-labelledby="game-collection">
    <div className="library-section-heading"><h2 id="game-collection">{t("Daftar proyek", "Project list")}</h2><span className="result-count" aria-live="polite">{games.length} {t("game", games.length === 1 ? "game" : "games")}</span></div>
    <div className="gallery-tools"><div className="filter-tabs" aria-label={t("Filter game", "Filter games")}>{filters.map(label=><button key={label} aria-pressed={filter === label} onClick={()=>setFilter(label)}>{label === "Semua game" ? t(label, "All games") : label === "Sistem game" ? t(label, "Game systems") : label}</button>)}</div>
      <SearchField label={t("Cari nama game", "Search games")} value={query} onChange={setQuery}/>
    </div>
    {games.length ? <div className="media-grid">{games.map(game=><GameCard key={game.id} game={game}/>)}</div>
      : <div className="empty"><p>{t("Game yang kamu cari belum ketemu di koleksi ini.", "No games match your search.")}</p><button onClick={()=>{setQuery("");setFilter("Semua game")}}>{t("Tampilkan semua game", "Show all games")}</button></div>}
  </section>
}
