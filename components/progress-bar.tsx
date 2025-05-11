"use client"

import { useEffect, useState } from "react"

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

      if (scrollHeight) {
        setScrollProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    // Initial calculation
    updateScrollProgress()

    // Add event listener
    window.addEventListener("scroll", updateScrollProgress)

    return () => {
      window.removeEventListener("scroll", updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-[100]">
      <div className="h-full bg-primary transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
    </div>
  )
}
