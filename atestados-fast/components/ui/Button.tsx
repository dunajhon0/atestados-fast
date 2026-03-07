import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-bold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95 gap-2"

        const variants = {
            primary: "bg-brand-primary text-white shadow-xl shadow-brand-primary/40 hover:bg-brand-primary/90 hover:shadow-2xl hover:shadow-brand-primary/50 hover:-translate-y-1",
            secondary: "bg-brand-secondary text-white shadow-xl shadow-brand-secondary/40 hover:bg-brand-secondary/90 hover:shadow-2xl hover:shadow-brand-secondary/50 hover:-translate-y-1",
            outline: "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5",
            ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600 hover:-translate-y-0.5 transition-transform",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/40 hover:-translate-y-1",
        }

        const sizes = {
            sm: "h-10 px-4 text-sm",
            md: "h-12 px-6 py-2 text-base",
            lg: "h-14 px-8 text-lg",
            icon: "h-12 w-12",
        }

        return (
            <button
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
