"use client"

import { Clock, ShieldCheck, Mail } from "lucide-react"

const LOGS = [
    { version: "v2.0.0", date: "Próximamente", changes: ["Migración a estructura Multi-página.", "Integración de herramientas locales: Gestor Turnos y Anonimizador.", "Nueva sección de buenas prácticas ampliada."] },
    { version: "v1.2.0", date: "Abril 2024", changes: ["Mejora en el prompt público del GPT.", "Añadida política estricta de cookies."] },
    { version: "v1.0.0", date: "Febrero 2024", changes: ["Lanzamiento inicial del motor de estructuración.", "Despliegue de la versión Single Page Application (SPA)."] },
]

export function ChangelogTool() {
    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {LOGS.map((log, i) => (
                <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Clock className="w-4 h-4" />
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-brand-primary">{log.version}</span>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">{log.date}</span>
                        </div>
                        <ul className="space-y-1">
                            {log.changes.map((c, j) => (
                                <li key={j} className="text-sm text-slate-600 flex items-start">
                                    <span className="text-brand-primary mr-2">•</span> {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}
