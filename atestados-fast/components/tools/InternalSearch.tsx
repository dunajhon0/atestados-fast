"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Command, X, ArrowRight, Zap, Target, Book, Shield, FileText, Clock, ListChecks, Landmark, ClipboardList, BookOpen, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const allResources = [
    { title: "Plantillas de diligencias", description: "Borradores oficiales estructurados", path: "/demo", type: "Tool", icon: <FileText className="w-5 h-5" />, color: "blue" },
    { title: "Cronología de hechos", description: "Ordenador temporal algorítmico", path: "/como-funciona", type: "Tool", icon: <Clock className="w-5 h-5" />, color: "emerald" },
    { title: "Checklist de intervención", description: "Protocolos de actuación en calle", path: "/buenas-practicas", type: "Docs", icon: <ListChecks className="w-5 h-5" />, color: "amber" },
    { title: "Guía de redacción", description: "Manual de estilo y rigor jurídico", path: "/buenas-practicas", type: "Docs", icon: <BookOpen className="w-5 h-5" />, color: "indigo" },
    { title: "Normativa y leyes", description: "Consulta rápida de articulado", path: "/herramientas", type: "Legal", icon: <Landmark className="w-5 h-5" />, color: "rose" },
    { title: "Modelos de actas", description: "Estructuras para actas y minutas", path: "/herramientas", type: "Tool", icon: <ClipboardList className="w-5 h-5" />, color: "slate" },
    { title: "Ejemplos de atestados", description: "Librería de casos resueltos", path: "/herramientas", type: "Docs", icon: <Star className="w-5 h-5" />, color: "purple" },
    { title: "Buenas prácticas", description: "Protocolo de seguridad y ética", path: "/buenas-practicas", type: "Protocolo", icon: <Shield className="w-5 h-5" />, color: "cyan" },
];

const quickChips = [
    { label: "/Plantillas", path: "/demo" },
    { label: "/Cronología", path: "/como-funciona" },
    { label: "/Leyes", path: "/herramientas" },
    { label: "/Checklist", path: "/buenas-practicas" },
    { label: "/Modelos", path: "/herramientas" },
];

export function InternalSearch() {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredResources = query.length > 1
        ? allResources.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase())
        )
        : allResources;

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
        <div className="w-full flex flex-col gap-6">
            {/* 1. SEARCH CONSOLE REFINED */}
            <div className="relative group max-w-3xl mx-auto w-full">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[28px] blur-md transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`relative flex items-center bg-white/5 border border-white/10 rounded-[24px] p-1.5 transition-all duration-300 ${isFocused ? 'bg-white/10 border-blue-500/30' : ''}`}>
                    <div className={`pl-4 transition-colors ${isFocused ? 'text-blue-400' : 'text-slate-500'}`}>
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none focus:ring-0 text-lg placeholder-slate-500 font-medium"
                        placeholder="Busca plantillas, leyes, cronologías o herramientas..."
                        value={query}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 font-mono text-[10px] font-black mr-2 tracking-widest">
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </div>

                    {query.length > 0 && (
                        <button onClick={() => setQuery("")} className="p-2 text-slate-500 hover:text-white mr-2">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* 2. QUICK ACCESS CHIPS */}
            <div className="flex flex-wrap justify-center gap-2 px-4 animate-in fade-in duration-700">
                {quickChips.map((chip) => (
                    <Link key={chip.label} href={chip.path}>
                        <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-slate-500 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all uppercase tracking-widest">
                            {chip.label}
                        </button>
                    </Link>
                ))}
            </div>

            {/* 3. RESOURCE HUB GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
                {filteredResources.map((resource, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-[#0A0A0B]/60 backdrop-blur-xl border border-white/5 p-5 rounded-[24px] transition-all hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 flex flex-col h-full"
                    >
                        <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-all bg-${resource.color}-500/10 text-${resource.color}-500 border border-${resource.color}-500/20 group-hover:scale-110`}>
                            {resource.icon}
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1 tracking-tight">{resource.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">{resource.description}</p>

                        <Link href={resource.path} className="w-full">
                            <Button variant="ghost" size="sm" className="w-full justify-between group/btn bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl h-10 px-4">
                                <span className="text-[11px] font-black uppercase tracking-widest">Abrir</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* NO RESULTS STATE */}
            {query.length > 1 && filteredResources.length === 0 && (
                <div className="py-20 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-800">
                        <Search className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-bold mb-1">Sin coincidencias para &quot;{query}&quot;</p>
                    <p className="text-slate-600 text-sm">Prueba con términos genéricos como &quot;Redacción&quot; o &quot;Leyes&quot;</p>
                </div>
            )}

            <style jsx>{`
                .text-blue-500 { color: #3b82f6; }
                .bg-blue-500\/10 { background-color: rgba(59, 130, 246, 0.1); }
                .border-blue-500\/20 { border-color: rgba(59, 130, 246, 0.2); }

                .text-emerald-500 { color: #10b981; }
                .bg-emerald-500\/10 { background-color: rgba(16, 185, 129, 0.1); }
                .border-emerald-500\/20 { border-color: rgba(16, 185, 129, 0.2); }

                .text-amber-500 { color: #f59e0b; }
                .bg-amber-500\/10 { background-color: rgba(245, 158, 11, 0.1); }
                .border-amber-500\/20 { border-color: rgba(245, 158, 11, 0.2); }

                .text-indigo-500 { color: #6366f1; }
                .bg-indigo-500\/10 { background-color: rgba(99, 102, 241, 0.1); }
                .border-indigo-500\/20 { border-color: rgba(99, 102, 241, 0.2); }

                .text-rose-500 { color: #f43f5e; }
                .bg-rose-500\/10 { background-color: rgba(244, 63, 94, 0.1); }
                .border-rose-500\/20 { border-color: rgba(244, 63, 94, 0.2); }

                .text-slate-500 { color: #64748b; }
                .bg-slate-500\/10 { background-color: rgba(100, 116, 139, 0.1); }
                .border-slate-500\/20 { border-color: rgba(100, 116, 139, 0.2); }

                .text-purple-500 { color: #a855f7; }
                .bg-purple-500\/10 { background-color: rgba(168, 85, 247, 0.1); }
                .border-purple-500\/20 { border-color: rgba(168, 85, 247, 0.2); }

                .text-cyan-500 { color: #06b6d4; }
                .bg-cyan-500\/10 { background-color: rgba(6, 182, 212, 0.1); }
                .border-cyan-500\/20 { border-color: rgba(6, 182, 212, 0.2); }
            `}</style>
        </div>
    );
}
