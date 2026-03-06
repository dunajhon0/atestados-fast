"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

const searchIndex = [
    { title: "Motor de Redacción", path: "/demo", type: "Herramienta", keywords: "simulador, redaccion, borrador" },
    { title: "Generador de Cronología", path: "/como-funciona", type: "Herramienta", keywords: "tiempo, horas, relato, historial" },
    { title: "Gestor de Turnos", path: "/herramientas", type: "Herramienta", keywords: "cuadrante, calendario, festivos" },
    { title: "Índice de Diligencias", path: "/herramientas", type: "Herramienta", keywords: "indice, caratula, diligencia" },
    { title: "Constructor de Plantillas", path: "/plantillas", type: "Herramienta", keywords: "plantilla, base, esqueleto" },
    { title: "Buenas Prácticas de Redacción", path: "/buenas-practicas", type: "Guía", keywords: "semaforo, rojo, hacer, no hacer" },
    { title: "Recursos Oficiales: BOE y AEPD", path: "/recursos-oficiales", type: "Recursos", keywords: "ley, codigo penal, privacidad, lecr" },
    { title: "¿Es legal usar ChatGPT para esto?", path: "/faq", type: "FAQ", keywords: "legalidad, chatgpt, ia, seguridad" },
    { title: "¿Se guardan mis datos?", path: "/faq", type: "FAQ", keywords: "privacidad, logs, robar" },
    { title: "Aviso Legal y Privacidad", path: "/legal", type: "Legal", keywords: "cookies, condiciones" },
]

export function InternalSearch() {
    const [query, setQuery] = useState("")

    const results = query.length > 1
        ? searchIndex.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase())
        )
        : []

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent shadow-sm text-lg transition-shadow"
                    placeholder="Busca herramientas, guías, preguntas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {query.length > 1 && (
                <div className="mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-h-80 overflow-y-auto">
                    {results.length > 0 ? (
                        <ul className="divide-y divide-slate-100">
                            {results.map((result, idx) => (
                                <li key={idx}>
                                    <Link href={result.path} className="block hover:bg-slate-50 p-4 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <p className="text-slate-900 font-medium">{result.title}</p>
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                                                {result.type}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            No se encontraron resultados para &quot;{query}&quot;
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
