import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95"

        const variants = {
            primary: "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/40 hover:-translate-y-0.5",
            secondary: "bg-brand-secondary text-white shadow-lg shadow-brand-secondary/30 hover:bg-brand-secondary/90 hover:shadow-xl hover:shadow-brand-secondary/40 hover:-translate-y-0.5",
            outline: "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 hover:border-slate-300",
            ghost: "hover:bg-slate-100/80 hover:text-slate-900 text-slate-600",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        }

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-11 px-8 text-base",
            icon: "h-10 w-10",
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
