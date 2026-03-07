import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "ultra-contrast" | "neon-blue";
    size?: "sm" | "md" | "lg" | "xl" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-[14px] font-bold ring-offset-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] gap-2 select-none"

        const variants = {
            primary: "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 hover:bg-brand-primary/90 hover:shadow-2xl hover:shadow-brand-primary/40 hover:-translate-y-1",
            secondary: "bg-brand-secondary text-white shadow-xl shadow-brand-secondary/20 hover:bg-brand-secondary/90 hover:shadow-2xl hover:shadow-brand-secondary/40 hover:-translate-y-1",
            ultra_contrast: "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 text-black font-black uppercase tracking-wider",
            neon_blue: "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1",
            outline: "border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white hover:border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5",
            ghost: "hover:bg-white/5 hover:text-white text-slate-400 hover:-translate-y-0.5 transition-all",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 hover:-translate-y-1",
        }

        const sizes = {
            sm: "h-10 px-4 text-sm",
            md: "h-12 px-6 py-2 text-base",
            lg: "h-14 px-10 py-4 text-lg rounded-2xl",
            xl: "h-16 px-12 py-5 text-xl rounded-[20px]",
            icon: "h-12 w-12",
        }

        // Map kebab-case variant names to camelCase keys for the variants object if needed
        const variantKey = variant.replace(/-/g, '_') as keyof typeof variants;

        return (
            <button
                className={`${baseStyles} ${variants[variantKey]} ${sizes[size]} ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
