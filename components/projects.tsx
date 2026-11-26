"use client"

import { useState } from "react"
import { ExternalLink, Plus } from "lucide-react"
import { creatorProfiles, creatorVideos } from "@/lib/creator-videos"
import { clientProjects } from "@/lib/client-projects"
import { clientVideo, type PortfolioVideo } from "@/lib/video-utils"
import { VideoCard } from "./video-preview"
import SearchField from "./search-field"

const creators = creatorProfiles.filter(profile => profile.handle !== "@bloxgrowblox")
const clips = creatorVideos.filter(video => video.handle !== "@bloxgrowblox").map(video => ({ ...video, portrait: true }))
const facebook = creators.find(profile => profile.platform === "Facebook")!
const clients = clientProjects.flatMap(client => client.projects.map(project => ({
  group: client.id, video: clientVideo(project, client.label),
})))

export default function Projects() {
  const [collection, setCollection] = useState<"Kanal saya" | "Karya klien">("Kanal saya")
  const [filter,setFilter] = useState("all")
  const [limit,setLimit] = useState(9)
  const [query,setQuery] = useState("")
  const term = query.trim().toLocaleLowerCase("id")
  const creatorView = collection === "Kanal saya"
  const options = creatorView ? creators.map(p=>[p.handle,p.handle]) : clientProjects.map(c=>[c.id,c.label])
  const items: PortfolioVideo[] = creatorView ? clips.filter(c=>filter==="all" || c.handle===filter)
    : clients.filter(c=>filter==="all" || c.group===filter).map(c=>c.video)
  const visible = items.filter(v=>[v.title,v.handle,v.platform,v.caption].join(" ").toLocaleLowerCase("id").includes(term))
  const includeFacebook = creatorView && (filter === "all" || filter === facebook.handle) &&
    [facebook.featuredTitle,facebook.handle,facebook.platform].join(" ").toLocaleLowerCase("id").includes(term)
  const total = visible.length + Number(includeFacebook)
  function reset() { setQuery(""); setFilter("all"); setLimit(9) }

  return <section id="koleksi" aria-labelledby="videos-heading">
    <div className="library-section-heading"><h2 id="videos-heading">Koleksi video saya</h2><span className="result-count" aria-live="polite">{total} karya</span></div>
    <div className="gallery-tools"><div className="filter-tabs" aria-label="Koleksi video">
      {(["Kanal saya","Karya klien"] as const).map(tab=><button key={tab} aria-pressed={tab===collection} onClick={()=>{setCollection(tab);reset()}}>{tab}</button>)}
    </div>
    <div className="video-filters"><select aria-label={creatorView ? "Pilih kanal" : "Pilih klien"} value={filter} onChange={e=>{setFilter(e.target.value);setLimit(9)}}>
      <option value="all">Semua {creatorView ? "kanal" : "klien"}</option>
      {options.map(([value,name])=><option key={value} value={value}>{name}</option>)}
    </select><SearchField value={query} label={creatorView ? "Cari video atau kanal" : "Cari judul atau klien"} onChange={value=>{setQuery(value);setLimit(9)}}/></div></div>
    {total === 0 && <div className="empty"><p>Belum ada video yang cocok dengan pencarian ini.</p><button onClick={reset}>Hapus filter</button></div>}
    <div className="media-grid">
      {includeFacebook && <a className="media-card" href={facebook.galleryUrl ?? facebook.url} target="_blank" rel="noreferrer">
        <span className="card-image"><img src={facebook.thumbnail} alt="" width={640} height={360} loading="lazy"/><span className="card-play"><ExternalLink size={16}/></span></span>
        <small>{facebook.handle} · Galeri Facebook Reels</small><strong>{facebook.featuredTitle}</strong>
      </a>}
      {visible.slice(0,limit).map((video,i)=><VideoCard key={video.url + i} video={video}/>)}
    </div>
    {visible.length > limit && <button className="more-button" onClick={()=>setLimit(n=>n+9)}><Plus size={16}/>Tampilkan lebih banyak ({visible.length-limit})</button>}
    {creatorView && <div className="channel-directory">{creators.map(p=><a key={p.url} href={p.url} target="_blank" rel="noreferrer"><span>{p.platform}</span>{p.handle}<ExternalLink size={13}/></a>)}</div>}
  </section>
}
