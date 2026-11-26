import type { Metadata } from "next"
import "@fontsource-variable/inter"
import "@fontsource-variable/instrument-sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: { default: "Dicky Hazmi Bahrain — Video & Game", template: "%s | Dicky Hazmi Bahrain" },
  description: "Portofolio video editing, konten kreator, dan game Roblox karya Dicky Hazmi Bahrain.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id" suppressHydrationWarning><body>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <a href="#main" className="skip-link">Langsung ke konten</a>
      <Header/><div className="content-area">{children}<Footer/></div>
    </ThemeProvider>
  </body></html>
}
