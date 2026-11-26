"use client"

import { useEffect, useRef } from "react"

export function StudioMotion() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const target = canvas.current!
    const preference = matchMedia("(prefers-reduced-motion: reduce)")
    let version = 0
    let stop: (()=>void) | undefined
    function sync() {
      const ticket = ++version
      stop?.()
      stop = undefined
      if (!preference.matches) import("@/lib/studio-renderer").then(({startStudio})=>{
        if (ticket === version) stop = startStudio(target)
      }).catch(()=>{})
    }
    sync()
    preference.addEventListener("change",sync)
    return ()=>{ version++; stop?.(); preference.removeEventListener("change",sync) }
  },[])
  return <canvas className="atmosphere" ref={canvas} aria-hidden="true"/>
}
