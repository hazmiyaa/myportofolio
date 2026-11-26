"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return <button type="button" className="theme-control" aria-label="Ganti tema terang atau gelap" onClick={()=>setTheme(resolvedTheme==="dark" ? "light" : "dark")}>
    <Sun className="sun" size={17}/><Moon className="moon" size={17}/>
  </button>
}
