"use client"

import * as React from "react"

interface TabsProps {
    defaultValue: string;
    className?: string;
    children: React.ReactNode;
}

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, className = "", children }: TabsProps) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, onValueChange: setValue }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    )
}

export function TabsList({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 ${className}`}>
            {children}
        </div>
    )
}

export function TabsTrigger({ value, className = "", children }: { value: string; className?: string; children: React.ReactNode }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isSelected = context.value === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => context.onValueChange(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isSelected ? "bg-white text-slate-950 shadow-sm" : "hover:text-slate-900"
                } ${className}`}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, id, className = "", children }: { value: string; id?: string; className?: string; children: React.ReactNode }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.value !== value) return null;

    return (
        <div
            role="tabpanel"
            id={id}
            className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${className}`}
        >
            {children}
        </div>
    )
}
