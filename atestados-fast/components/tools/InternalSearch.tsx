"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Command, X, ArrowRight, Zap, Target, Book, Shield } from "lucide-react";
import Link from "next/link";

const searchIndex = [
    { title: "Motor de Redacción", path: "/demo", type: "Terminal", keywords: "simulador, redaccion, borrador, ia", icon: <Zap className="w-4 h-4" /> },
    { title: "Generador de Cronología", path: "/como-funciona", type: "Tool", keywords: "tiempo, horas, relato, historial", icon: <ArrowRight className="w-4 h-4" /> },
    { title: "Gestor de Turnos", path: "/herramientas", type: "Tool", keywords: "cuadrante, calendario, festivos", icon: <Target className="w-4 h-4" /> },
    { title: "Índice de Diligencias", path: "/herramientas", type: "Docs", keywords: "indice, caratula, diligencia", icon: <Book className="w-4 h-4" /> },
    { title: "Buenas Prácticas", path: "/buenas-practicas", type: "Protocolo", keywords: "semaforo, rojo, hacer, no hacer, guia", icon: <Shield className="w-4 h-4" /> },
    { title: "Aviso Legal y Privacidad", path: "/legal", type: "Legal", keywords: "cookies, condiciones, seguridad", icon: <Shield className="w-4 h-4" /> },
];

export function InternalSearch() {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const results = query.length > 1
        ? searchIndex.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.keywords.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="w-full relative">
            {/* Command Input Area */}
            <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
                <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors ${isFocused ? 'text-blue-500' : 'text-slate-500'}`}>
                    <Search className={`h-5 w-5 ${isFocused ? 'animate-pulse' : ''}`} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className={`block w-full pl-14 pr-24 py-5 bg-black/40 border-none text-white placeholder-slate-600 focus:outline-none focus:ring-0 text-xl font-medium rounded-[28px] transition-all
                        ${isFocused ? 'placeholder-transparent' : 'placeholder-slate-600'}`}
                    placeholder="¿Qué herramienta necesitas ahora?"
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Keyboard Shortcut Hint */}
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 font-mono text-[10px] font-black tracking-widest">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </div>
                </div>

                {query.length > 0 && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute inset-y-0 right-20 pr-4 flex items-center text-slate-600 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Neon Focus Ring */}
            <div className={`absolute inset-0 -z-10 bg-blue-600/20 blur-2xl rounded-[32px] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Result Panel */}
            {query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-[#0A0A0B]/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-3xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3">
                        {results.length > 0 ? (
                            <div className="space-y-1">
                                {results.map((result, idx) => (
                                    <Link
                                        key={idx}
                                        href={result.path}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-all">
                                                {result.icon}
                                            </div>
                                            <div>
                                                <p className="text-slate-200 font-bold tracking-tight text-sm">{result.title}</p>
                                                <p className="text-slate-500 text-xs mt-0.5 font-medium">{result.keywords.split(',').slice(0, 2).join(' · ')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 px-2 py-1 bg-white/5 rounded-lg group-hover:bg-blue-600/10 group-hover:text-blue-400 transition-all">
                                                {result.type}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <Search className="w-12 h-12 text-slate-800 mx-auto mb-4 stroke-1" />
                                <p className="text-slate-500 font-medium">No se han encontrado registros para <span className="text-white italic">&quot;{query}&quot;</span></p>
                                <p className="text-slate-600 text-xs mt-2">Prueba con términos como &quot;Redacción&quot; o &quot;Cronología&quot;</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
