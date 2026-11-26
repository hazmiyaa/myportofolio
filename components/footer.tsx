import Link from "next/link"

export default function Footer() {
  return <footer className="site-footer"><div className="wrap footer-inner">
    <span>© {new Date().getFullYear()} Dicky Hazmi Bahrain</span>
    <div><Link href="/videos">Video</Link><Link href="/games">Game Roblox</Link><a href="https://www.linkedin.com/in/hazmiya/">LinkedIn</a><a href="https://www.instagram.com/dikikul/">Instagram</a></div>
  </div></footer>
}
