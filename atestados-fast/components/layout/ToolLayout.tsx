import React from "react"

export function ToolLayout({
    title,
    description,
    children
}: {
    title: string,
    description: string,
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto px-4 py-8 mb-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -translate-y-16 translate-x-16" />
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 relative z-10">{title}</h1>
                    <p className="text-slate-600 relative z-10">{description}</p>
                </header>

                {/* Warning banner about local execution / no personal data */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-amber-800 font-medium">Recordatorio de Seguridad</p>
                            <p className="text-xs text-amber-700 mt-1">
                                La herramienta se ejecuta localmente en tu navegador. Usa siempre datos ficticios y evita incluir información personal identificable (PII).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actual Tool logic / component */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
