import { cn } from "@/lib/utils"

interface LabelPillProps {
    children: React.ReactNode
    dotColor?: "emerald" | "sky" | "orange" | "none"
    className?: string
}

export function LabelPill({ children, dotColor = "emerald", className }: LabelPillProps) {
    const dotColors = {
        emerald: "bg-emerald-500",
        sky: "bg-sky-500",
        orange: "bg-orange-500",
        none: "",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2",
                "border border-slate-200 bg-slate-100 px-3 py-1 rounded-full",
                "text-[11px] uppercase tracking-[0.2em] text-slate-600 font-medium",
                className
            )}
        >
            {dotColor !== "none" && (
                <div className={cn("w-1.5 h-1.5 rounded-full", dotColors[dotColor])} />
            )}
            {children}
        </div>
    )
}

interface ChipProps {
    children: React.ReactNode
    variant?: "daas" | "connect" | "tech" | "default"
    className?: string
}

export function Chip({ children, variant = "default", className }: ChipProps) {
    const variants = {
        daas: "bg-[#E0F2FE] text-[#0369A1]",
        connect: "bg-[#ECFDF3] text-[#15803D]",
        tech: "bg-[#FFF7ED] text-[#C2410C]",
        default: "bg-slate-100 text-slate-500",
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1",
                "text-[11px] font-medium",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
