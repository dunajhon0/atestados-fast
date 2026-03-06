import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className = "", children, ...props }: CardProps) {
    return (
        <div
            className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`p-6 pb-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardTitle({ className = "", children, ...props }: CardProps) {
    return (
        <h3 className={`text-xl font-bold text-slate-900 ${className}`} {...props}>
            {children}
        </h3>
    )
}

export function CardContent({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function CardFooter({ className = "", children, ...props }: CardProps) {
    return (
        <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>
            {children}
        </div>
    )
}
