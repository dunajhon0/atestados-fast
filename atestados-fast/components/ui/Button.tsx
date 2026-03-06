import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            primary: "bg-brand-primary text-white hover:bg-brand-secondary shadow-sm",
            secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
            outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
            ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
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
