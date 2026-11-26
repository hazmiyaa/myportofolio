import { cookies } from "next/headers"
import { languageCookie, type Language } from "./language"

export async function requestLanguage(): Promise<Language> {
  return (await cookies()).get(languageCookie)?.value === "en" ? "en" : "id"
}
