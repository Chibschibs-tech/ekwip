import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface PrimaryCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const PrimaryCTA = forwardRef<HTMLButtonElement, PrimaryCTAProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "h-11 px-6 rounded-full",
                    "bg-gradient-to-r from-ekwip-primaryDeep via-ekwip-primary to-sky-500",
                    "text-xs font-semibold text-white",
                    "shadow-ekwip-cta",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98]",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

PrimaryCTA.displayName = "PrimaryCTA"

interface SecondaryCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const SecondaryCTA = forwardRef<HTMLButtonElement, SecondaryCTAProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "h-11 px-5 rounded-full",
                    "border border-slate-300 bg-white",
                    "text-xs font-semibold text-slate-800",
                    "hover:border-ekwip-primary hover:text-ekwip-primary",
                    "active:scale-[0.98]",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

SecondaryCTA.displayName = "SecondaryCTA"
