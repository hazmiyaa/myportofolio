type VideoPlatform = "YouTube" | "TikTok"

interface CreatorVideo {
  id: string
  title: string
  platform: VideoPlatform
  url: string
  embedUrl: string
  thumbnail: string
  handle: string
}

export interface CreatorProfile {
  platform: VideoPlatform | "Facebook"
  name: string
  handle: string
  url: string
  galleryUrl?: string
  thumbnail: string
  featuredTitle: string
}

export const creatorProfiles: CreatorProfile[] = [
  {
    platform: "YouTube",
    name: "Bayangkan Jika terjadi",
    handle: "@bayangkansajadulu",
    url: "https://www.youtube.com/@bayangkansajadulu",
    thumbnail: "/media/lhqyoTxGng4.webp",
    featuredTitle: "Indonesia Split Open! Jurassic Monsters Invade!",
  },
  {
    platform: "TikTok",
    name: "kabarkabar",
    handle: "@berkabary",
    url: "https://www.tiktok.com/@berkabary",
    thumbnail: "/media/7707475042677951751.webp",
    featuredTitle: "Rantai ini dicetak dalam keadaan sudah saling terkait",
  },
  {
    platform: "TikTok",
    name: "hazmiya",
    handle: "@bloxgrowblox",
    url: "https://www.tiktok.com/@bloxgrowblox",
    thumbnail: "/media/7573621975512370450.webp",
    featuredTitle: "Animasi hook jump di Roblox",
  },
  {
    platform: "Facebook",
    name: "Aku Raka",
    handle: "Aku Raka",
    url: "https://www.facebook.com/profile.php?id=61596075733313",
    galleryUrl: "https://www.facebook.com/profile.php?id=61596075733313&sk=reels_tab",
    thumbnail: "/media/aku-raka-krakatau.webp",
    featuredTitle: "Letusan Krakatau 1883",
  },
]

// IDs and covers come from the channel's Shorts tab and the two public TikTok creator embeds.
function youtube(id: string, title: string): CreatorVideo {
  return {
    id, title, platform: "YouTube", handle: "@bayangkansajadulu",
    url: `https://www.youtube.com/shorts/${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    thumbnail: `/media/${id}.webp`,
  }
}

function tiktok(handle: string, id: string, title: string): CreatorVideo {
  return {
    id, title, platform: "TikTok", handle,
    url: `https://www.tiktok.com/${handle}/video/${id}`,
    embedUrl: `https://www.tiktok.com/player/v1/${id}`,
    thumbnail: `/media/${id}.webp`,
  }
}

export const creatorVideos: CreatorVideo[] = [
  youtube("lhqyoTxGng4", "Indonesia Split Open! Jurassic Monsters Invade!"),
  tiktok("@berkabary", "7707475042677951751", "Rantai ini dicetak dalam keadaan sudah saling terkait"),
  tiktok("@bloxgrowblox", "7573621975512370450", "Animasi hook jump di Roblox"),
  youtube("qxpMLi9_wqo", "Pacu Jalur Festival Interrupted by Giant Kraken!"),
  tiktok("@berkabary", "7706873947026902280", "Balok beton ini dicetak pakai kain yang dijahit"),
  tiktok("@bloxgrowblox", "7696473276935146760", "Kontrol mobile untuk 7Days: Forest Survival"),
  youtube("xB2W3LIxYRU", "The Day Dragons Destroyed Indonesia"),
  tiktok("@berkabary", "7705987426283474194", "Nabrak, melentur… lalu lanjut terbang"),
  tiktok("@bloxgrowblox", "7691972263163251986", "Cutscene sebelum permainan dimulai"),
]
