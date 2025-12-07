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
      <div className="md:hidden relative -mx-4 px-4">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 w-[calc(90vw-2rem)] max-w-[320px] snap-start mr-4 last:mr-0",
                cardClassName
              )}
            >
              {child}
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        {showControls && children.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {children.map((_, index) => {
              const isActive = Math.round((scrollContainerRef.current?.scrollLeft || 0) / (scrollContainerRef.current?.clientWidth || 1)) === index
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const cardWidth = scrollContainerRef.current.clientWidth * 0.9
                      scrollContainerRef.current.scrollTo({
                        left: cardWidth * index,
                        behavior: "smooth",
                      })
                    }
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    isActive ? "w-6 bg-ekwip-primary" : "w-1.5 bg-slate-300"
                  )}
                  aria-label={`Go to card ${index + 1}`}
                />
              )
            })}
          </div>
        )}
        
        {/* Subtle Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}

