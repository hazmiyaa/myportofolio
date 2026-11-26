export const aiTools = ["Antigravity", "Claude Code", "Codex", "ChatGPT"] as const

type Brand = typeof aiTools[number] | "YouTube" | "Facebook" | "TikTok" | "Instagram" | "LinkedIn"

export function BrandImage({ name, size = 20 }: { name: Brand; size?: number }) {
  const filename = name.toLowerCase().replace(" ", "-")
  return <img className="brand-image" src={`/brands/${filename}.png`} width={size} height={size} alt="" />
}
