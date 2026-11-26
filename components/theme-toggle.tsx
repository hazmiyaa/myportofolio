"use client"

import { useLanguage } from "./language"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { t } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  return <button type="button" className="theme-control" aria-label={t("Ganti tema terang atau gelap", "Switch light or dark theme")} onClick={()=>setTheme(resolvedTheme==="dark" ? "light" : "dark")}>
    <Sun className="sun" size={17}/><Moon className="moon" size={17}/>
  </button>
}
