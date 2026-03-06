"use client"

import { useState } from "react"
import { Search, ExternalLink, BookOpen, Scale, FileText } from "lucide-react"

const RESOURCES = [
    {
        id: "r1",
        title: "Ley de Enjuiciamiento Criminal (LECr)",
        category: "legislacion",
        icon: <Scale className="w-5 h-5 text-indigo-500" />,
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-1882-6036",
        desc: "Norma principal que regula el proceso penal en España. Fundamental para la correcta confección de atestados."
    },
    {
        id: "r2",
        title: "Código Penal (LO 10/1995)",
        category: "legislacion",
        icon: <BookOpen className="w-5 h-5 text-red-500" />,
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444",
        desc: "Tipificación de los delitos y sus penas. Útil para calificar provisionalmente los hechos."
    },
    {
        id: "r3",
        title: "Agencia Española de Protección de Datos (AEPD)",
        category: "privacidad",
        icon: <FileText className="w-5 h-5 text-emerald-500" />,
        url: "https://www.aepd.es/",
        desc: "Guías sectoriales sobre protección de datos aplicables a las Fuerzas y Cuerpos de Seguridad."
    },
    {
        id: "r4",
        title: "LO 4/2015 de Protección de la Seguridad Ciudadana",
        category: "legislacion",
        icon: <Scale className="w-5 h-5 text-indigo-500" />,
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442",
        desc: "Marco normativo principal para las intervenciones administrativas."
    }
];

export function ResourcesFilter() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = RESOURCES.filter(r => {
        const matchQuery = r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase());
        const matchCat = activeCategory === "all" || r.category === activeCategory;
        return matchQuery && matchCat;
    });

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título o palabra clave (ej. Código Penal)..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none shadow-sm"
                    />
                </div>
                <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none shadow-sm"
                >
                    <option value="all">Todas las categorías</option>
                    <option value="legislacion">Legislación</option>
                    <option value="privacidad">Privacidad y Datos</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {filtered.length > 0 ? (
                    filtered.map(r => (
                        <a
                            key={r.id} href={r.url} target="_blank" rel="noopener noreferrer"
                            className="block group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-brand-primary/10 transition-colors">
                                    {r.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors flex items-center mb-2">
                                        {r.title}
                                        <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-12 text-slate-500">
                        No se encontraron recursos que coincidan con los filtros.
                    </div>
                )}
            </div>
        </div>
    )
}
