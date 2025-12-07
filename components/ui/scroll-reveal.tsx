"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

interface ScrollRevealProps {
    children: React.ReactNode
    width?: "fit-content" | "100%"
    delay?: number
    className?: string
}

export const ScrollReveal = ({ children, width = "100%", delay = 0, className = "" }: ScrollRevealProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView, mainControls])

    // If className contains flex or h-full, override width to allow flex behavior
    const hasFlexClasses = className.includes("flex") || className.includes("h-full")
    const finalWidth = hasFlexClasses ? undefined : width

    return (
        <div ref={ref} style={{ position: "relative", width: finalWidth, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
                className={hasFlexClasses ? "h-full w-full flex" : ""}
            >
                {children}
            </motion.div>
        </div>
    )
}
