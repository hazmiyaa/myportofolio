"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  infinite?: boolean
  className?: string
}

export default function Typewriter({ text, delay = 100, infinite = false, className = "" }: TypewriterProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
      }, 1500) // Pause at the end for 1.5 seconds
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex - 1))
        setCurrentIndex((prevIndex) => prevIndex - 1)

        if (currentIndex <= 1) {
          setIsDeleting(false)
        }
      }, delay / 2)
    } else {
      timeout = setTimeout(() => {
        setCurrentText(text.substring(0, currentIndex + 1))
        setCurrentIndex((prevIndex) => prevIndex + 1)

        if (currentIndex >= text.length) {
          if (infinite) {
            setIsPaused(true)
            setTimeout(() => {
              setIsDeleting(true)
            }, 1500) // Wait before starting to delete
          }
        }
      }, delay)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, infinite, isDeleting, isPaused, text])

  return <span className={className}>{currentText}</span>
}
