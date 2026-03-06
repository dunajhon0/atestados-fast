"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
    title: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    value?: string;
    onToggle?: () => void;
    className?: string;
}

export function AccordionItem({ title, children, isOpen = false, onToggle, className = "" }: AccordionItemProps) {
    const [internalOpen, setInternalOpen] = React.useState(isOpen);

    const isControlled = onToggle !== undefined;
    const isItemOpen = isControlled ? isOpen : internalOpen;

    const handleToggle = () => {
        if (isControlled) {
            onToggle();
        } else {
            setInternalOpen(!internalOpen);
        }
    };

    return (
        <div className={`border-b border-slate-200 ${className}`}>
            <button
                type="button"
                className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:text-brand-primary [&[data-state=open]>svg]:rotate-180 w-full"
                onClick={handleToggle}
                data-state={isItemOpen ? "open" : "closed"}
                aria-expanded={isItemOpen}
            >
                {title}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-slate-500" />
            </button>

            <div
                data-state={isItemOpen ? "open" : "closed"}
                className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                style={{ height: isItemOpen ? 'auto' : 0, opacity: isItemOpen ? 1 : 0 }}
            >
                <div className="pb-4 pt-0 text-slate-600">
                    {children}
                </div>
            </div>
        </div>
    )
}

export function Accordion({ children, className = "", type = "single" }: { children: React.ReactNode, className?: string, type?: "single" | "multiple" }) {
    // If we needed controlled Accordion "single" we could build context here.
    // For simplicity, we wrap AccordionItem.
    return (
        <div className={`space-y-1 ${className}`}>
            {children}
        </div>
    )
}
