import Link from "next/link"
import { Copy } from "@/components/language"

export default function Footer() {
  return <footer className="site-footer"><div className="wrap footer-inner">
    <span>© {new Date().getFullYear()} Dicky Hazmi Bahrain</span>
    <div><Link href="/videos"><Copy id="Video" en="Videos"/></Link><Link href="/games"><Copy id="Game Roblox" en="Roblox games"/></Link><a href="https://www.linkedin.com/in/hazmiya/">LinkedIn</a><a href="https://www.instagram.com/dikikul/">Instagram</a></div>
  </div></footer>
}
