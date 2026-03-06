import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"

    const variants = {
        default: "border-transparent bg-brand-primary text-white hover:bg-brand-primary/80",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "text-slate-950",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        success: "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-600",
        warning: "border-transparent bg-amber-500 text-white shadow hover:bg-amber-600",
    }

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
    )
}

export { Badge }
