"use client"

import { ReactNode, useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CardSliderProps {
  children: ReactNode[]
  className?: string
  cardClassName?: string
  showControls?: boolean
  gap?: "sm" | "md" | "lg"
}

export function CardSlider({
  children,
  className = "",
  cardClassName = "",
  showControls = true,
  gap = "md",
}: CardSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }

    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [children])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const gapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }[gap]

  return (
    <div className={cn("relative", className)}>
      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {children.map((child, index) => (
          <div key={index} className={cardClassName}>
            {child}
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal Slider */}
      <div className="md:hidden relative">
        {showControls && (
          <>
            {canScrollLeft && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full h-10 w-10"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {canScrollRight && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full h-10 w-10"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-4 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 w-[85vw] max-w-sm snap-start",
                cardClassName,
                gapClass
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

