export const robloxProfileUrl = "https://www.roblox.com/users/8520359052/profile"

export interface RobloxGame {
  id: string
  title: string
  url: string
  image: string
  hazmiyaOnly: boolean
  survival: boolean
}

interface GameEntry {
  id: string
  title: string
  slug: string
  hazmiyaOnly?: boolean
  survival?: boolean
}

const entries: GameEntry[] = [
  { id: "99325217903112", title: "Alchemist Forest", slug: "Alchemist-Forest" },
  { id: "116886262594974", title: "Altura Catena", slug: "ALTURA-CATENA" },
  { id: "119345673043942", title: "Equilibrium Reborn", slug: "EQUILIBRIUM-REBORN" },
  { id: "84282802240291", title: "Nirvana Edge", slug: "Nirvana-Edge" },
  { id: "112883039186334", title: "Mount Ilamona", slug: "MOUNT-ILAMONA", hazmiyaOnly: true },
  { id: "124317129157824", title: "Mount Langs", slug: "Mount-Langs", hazmiyaOnly: true },
  { id: "127870100648495", title: "Hanta Wood", slug: "Hanta-Wood", hazmiyaOnly: true },
  { id: "138635506565835", title: "Mount Noxy", slug: "Mount-Noxy" },
  { id: "108440412101917", title: "Mount Mystic", slug: "MOUNT-MYSTIC", hazmiyaOnly: true },
  { id: "104249986266384", title: "Mount Mysluna", slug: "MOUNT-MYSLUNA", hazmiyaOnly: true },
  { id: "131834546642167", title: "Haltia Gate", slug: "Haltia-Gate", hazmiyaOnly: true },
  { id: "138285486751762", title: "Fomalhaut Hurdle", slug: "Fomalhaut-Hurdle", hazmiyaOnly: true },
  { id: "121045026941887", title: "Kota Kita", slug: "KOTA-KITA" },
  { id: "121863246680184", title: "Dead City", slug: "DEAD-CITY" },
  { id: "82607503893711", title: "7Days Forest Survival", slug: "7Days-Forest-Survival", survival: true },
  { id: "117966557382968", title: "Mutate It", slug: "Mutate-It", survival: true },
]

export const robloxGames: RobloxGame[] = entries.map(({ id, title, slug, hazmiyaOnly, survival }) => ({
  id,
  title,
  url: `https://www.roblox.com/games/${id}/${slug}`,
  image: `/games/${id}.webp`,
  hazmiyaOnly: hazmiyaOnly ?? false,
  survival: survival ?? false,
}))
