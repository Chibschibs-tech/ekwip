import { cn } from "@/lib/utils"

interface LightCardProps {
    children: React.ReactNode
    className?: string
}

export function LightCard({ children, className }: LightCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
                "hover:shadow-md transition-shadow duration-200",
                className
            )}
        >
            {children}
        </div>
    )
}

interface MiniStatProps {
    label: string
    value: string | number
    badge?: string
    className?: string
}

export function MiniStat({ label, value, badge, className }: MiniStatProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5",
                className
            )}
        >
            <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">{value}</div>
            {badge && (
                <div className="text-[10px] text-slate-600 mt-1">{badge}</div>
            )}
        </div>
    )
}

interface MiniStatDarkProps {
    label: string
    value: string | number
    badge?: string
    badgeColor?: "sky" | "emerald" | "tech"
    className?: string
}

export function MiniStatDark({ label, value, badge, badgeColor = "sky", className }: MiniStatDarkProps) {
    const badgeColors = {
        sky: "bg-sky-500/25 text-sky-200",
        emerald: "bg-emerald-500/25 text-emerald-200",
        tech: "bg-orange-500/40 text-orange-200",
    }

    return (
        <div
            className={cn(
                "rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5",
                className
            )}
        >
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</div>
            <div className="text-sm font-semibold text-slate-50 mt-1">{value}</div>
            {badge && (
                <div className={cn("inline-block text-[10px] mt-2 px-2 py-0.5 rounded", badgeColors[badgeColor])}>
                    {badge}
                </div>
            )}
        </div>
    )
}
