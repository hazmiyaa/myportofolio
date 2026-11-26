"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clapperboard, Download, Gamepad2, House, Mail, Menu, UserRound, X } from "lucide-react"
import { LanguageSwitch, useLanguage } from "./language"
import { BrandImage } from "./brand-image"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  { href: "/", text: "Beranda", english: "Home", icon: House },
  { href: "/videos", text: "Karya video", english: "Video work", icon: Clapperboard },
  { href: "/games", text: "Game Roblox", english: "Roblox games", icon: Gamepad2 },
  { href: "/#about", text: "Tentang saya", english: "About me", icon: UserRound },
  { href: "/#contact", text: "Kontak", english: "Contact", icon: Mail },
]


export default function Header() {
  const { t, language } = useLanguage()
  const cv = `/cv/Dicky-Hazmi-Bahrain-CV-${language.toUpperCase()}.pdf`
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState("")
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (pathname !== "/") return
    function updateSection() {
      const line = Math.min(window.innerHeight * .45, 320)
      const sectionId = ["contact", "about"].find(id => {
        const bounds = document.getElementById(id)?.getBoundingClientRect()
        return bounds && bounds.top <= line && bounds.bottom > line
      })
      setSection(sectionId ? "#" + sectionId : "")
    }
    updateSection()
    window.addEventListener("scroll", updateSection, { passive: true })
    return () => window.removeEventListener("scroll", updateSection)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); toggle.current?.focus() }
    }
    window.addEventListener("keydown",escape)
    return () => window.removeEventListener("keydown",escape)
  }, [open])

  const active = pathname === "/" ? "/" + section : pathname
  return <header className="sidebar">
    <div className="brand-row">
      <Link href="/" className="brand" onClick={()=>setOpen(false)} aria-label={t("Hazmiya, beranda", "Hazmiya, home")}>
        <span className="brand-sign" aria-hidden="true"><i/><i/><i/></span>Hazmiya<span className="brand-period">.</span>
      </Link>
      <div className="mobile-actions"><LanguageSwitch/><ThemeToggle/><button type="button" className="menu-toggle" ref={toggle} onClick={()=>setOpen(!open)} aria-label={open ? t("Tutup menu", "Close menu") : t("Buka menu", "Open menu")} aria-controls="side-content" aria-expanded={open}>{open ? <X/> : <Menu/>}</button></div>
    </div>
    <div id="side-content" className={open ? "side-content open" : "side-content"}>
      <nav aria-label={t("Navigasi utama", "Main navigation")} className="side-nav">{navigation.map(({href, text, english, icon: Icon}) => (
        <Link key={href} href={href} aria-current={href===active ? (href.includes("#") ? "location" : "page") : undefined} onClick={()=>setOpen(false)}><Icon size={18}/>{t(text, english)}</Link>
      ))}</nav>
      <div className="side-bottom">
        <a className="download-link" href={cv} download><Download size={16}/>{t("Unduh CV", "Download CV")}</a>
        <div className="side-tools"><LanguageSwitch/><a href="https://www.instagram.com/dikikul/" aria-label="Instagram Dicky"><BrandImage name="Instagram"/></a><a href="https://www.linkedin.com/in/hazmiya/" aria-label="LinkedIn Dicky"><BrandImage name="LinkedIn"/></a><ThemeToggle/></div>
        <Link className="mini-profile" href="/#about" onClick={()=>setOpen(false)}><img src="/portrait.webp" alt="" width={38} height={38}/><span><strong>Dicky Hazmi</strong><small>Pamulang, Indonesia</small></span></Link>
      </div>
    </div>
  </header>
}
