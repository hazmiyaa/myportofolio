"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { languageCookie, type Language } from "@/lib/language"

const LanguageContext = createContext({
  language: "id" as Language,
  choose: (_language: Language) => {},
})

export function LanguageProvider({ initial, children }: { initial: Language; children: ReactNode }) {
  const [language, setLanguage] = useState(initial)
  const router = useRouter()
  function choose(next: Language) {
    if (next === language) return
    document.cookie = `${languageCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
    document.documentElement.lang = next
    setLanguage(next)
    router.refresh()
  }
  return <LanguageContext.Provider value={{ language, choose }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return { ...context, t: (id: string, en: string) => context.language === "en" ? en : id }
}

export function Copy({ id, en }: { id: string; en: string }) {
  return useLanguage().t(id, en)
}

export function LanguageSwitch() {
  const { language, choose, t } = useLanguage()
  return <div className="language-switch" role="group" aria-label={t("Bahasa", "Language")}>
    <button type="button" lang="id" aria-label="Bahasa Indonesia" aria-pressed={language === "id"} onClick={() => choose("id")}>ID</button>
    <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => choose("en")}>EN</button>
  </div>
}
