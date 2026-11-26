"use client"

import { useLanguage } from "./language"

import { useState } from "react"

const portraits = ["/portrait.webp","/about-2.webp","/about-1.webp"]
export default function ProfilePortrait() {
  const { t } = useLanguage()
  const [selected,setSelected] = useState(0)
  return <figure className="id-photo">
    <img src={portraits[selected]} alt="Dicky Hazmi Bahrain" width={600} height={600} loading="lazy"/>
    <div className="portrait-select" aria-label={t("Pilihan potret", "Portraits")}>{portraits.map((image,index)=><button key={image} type="button" aria-label={`${t("Tampilkan potret", "Show portrait")} ${index+1}`} aria-pressed={index===selected} onClick={()=>setSelected(index)}><i/></button>)}</div>
  </figure>
}
