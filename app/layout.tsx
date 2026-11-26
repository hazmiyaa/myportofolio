import type { Metadata } from "next"
import "@fontsource-variable/inter"
import "@fontsource-variable/instrument-sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Copy, LanguageProvider } from "@/components/language"
import { requestLanguage } from "@/lib/request-language"

export async function generateMetadata(): Promise<Metadata> {
  const english = await requestLanguage() === "en"
  return {
    title: { default: english ? "Dicky Hazmi Bahrain — Video Editing & Roblox" : "Dicky Hazmi Bahrain — Editing Video & Roblox", template: "%s | Dicky Hazmi Bahrain" },
    description: english ? "Short videos, client edits, and Roblox games by Dicky Hazmi Bahrain." : "Video pendek, hasil edit untuk klien, dan proyek game Roblox karya Dicky Hazmi Bahrain.",
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const language = await requestLanguage()
  return <html lang={language} suppressHydrationWarning><body><LanguageProvider initial={language}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <a href="#main" className="skip-link"><Copy id="Langsung ke konten" en="Skip to content"/></a>
      <Header/><div className="content-area">{children}<Footer/></div>
    </ThemeProvider></LanguageProvider>
  </body></html>
}
