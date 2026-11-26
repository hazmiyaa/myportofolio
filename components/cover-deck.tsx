"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Gamepad2, Play } from "lucide-react"
import { VideoPreview } from "./video-preview"
import type { PortfolioVideo } from "@/lib/video-utils"
import type { startDeck } from "@/lib/studio-renderer"

export type DeckItem = { title: string; image: string; url: string; video?: PortfolioVideo }

export function CoverDeck({ items, mode }: { items: DeckItem[]; mode: "video" | "game" }) {
  const [index,setIndex] = useState(0)
  const [ready,setReady] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const api = useRef<ReturnType<typeof startDeck> | undefined>(undefined)
  const selected = useRef(0)
  const touch = useRef<number | null>(null)
  const action = useRef<HTMLDivElement>(null)
  const item = items[index]
  function step(amount: number) { setIndex(current => (current + amount + items.length) % items.length) }
  useEffect(()=>{
    let active = true
    const target = canvas.current!
    import("@/lib/studio-renderer").then(({startDeck})=>{
      if (!active) return
      api.current = startDeck(target, items.map(item=>item.image), mode, ()=>{ if(active) setReady(true) })
      api.current.select(selected.current)
    }).catch(()=>{ if(active) setReady(false) })
    return ()=>{active=false; api.current?.dispose(); api.current=undefined}
  },[items,mode])
  useEffect(()=>{ selected.current=index; api.current?.select(index) },[index])

  return <div className={`deck deck-${mode}`} role="region" aria-label={mode==="game" ? "Pilihan game 3D" : "Filmstrip video 3D"}
    onKeyDown={e=>{ if(e.key==="ArrowLeft" || e.key==="ArrowRight") { e.preventDefault(); step(e.key==="ArrowLeft" ? -1 : 1) } }}>
    <div className="deck-viewport" onPointerDown={e=>{touch.current=e.clientX; e.currentTarget.setPointerCapture(e.pointerId)}}
      onPointerCancel={()=>{touch.current=null}}
      onPointerUp={e=>{
        if(touch.current===null) return
        const distance = e.clientX-touch.current
        touch.current=null
        if (Math.abs(distance)>24) { step(distance<0 ? 1 : -1); return }
        const hit = ready ? api.current?.pick(e.clientX,e.clientY) : index
        if(hit===index) action.current?.querySelector<HTMLElement>("button, a")?.click()
        else if(hit!==undefined && hit>=0) setIndex(hit)
      }}>
      {!ready && <img className="deck-fallback" alt="" src={item.image}/>}
      <canvas ref={canvas} aria-hidden="true" style={{opacity:ready ? 1 : 0}}/>
    </div>
    <div className="deck-toolbar"><div ref={action} aria-live="polite" className="deck-selected">
      {item.video ? <VideoPreview video={item.video} className="deck-open"><Play size={16} fill="currentColor"/>{item.title}</VideoPreview>
        : <a className="deck-open" href={item.url} target="_blank" rel="noreferrer"><Gamepad2 size={18}/>{item.title}</a>}
    </div><div className="deck-controls"><button onClick={()=>step(-1)} aria-label="Karya sebelumnya"><ChevronLeft size={18}/></button>
      <span>{index+1} / {items.length}</span><button onClick={()=>step(1)} aria-label="Karya berikutnya"><ChevronRight size={18}/></button></div>
    </div>
  </div>
}
