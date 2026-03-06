"use client"

import { useState } from "react"
import { ListChecks } from "lucide-react"
import { CopyButton } from "@/components/ui/CopyButton"

const OPTIONS = [
    { id: "expo", label: "Diligencia de Exposición de los Hechos" },
    { id: "derechos", label: "Diligencia de Lectura de Derechos" },
    { id: "lesiones", label: "Diligencia de Traslado a Centro Médico" },
    { id: "intervencion", label: "Diligencia de Intervención de Efectos" },
    { id: "fotografica", label: "Inspección Ocular / Diligencia Fotográfica" },
    { id: "declaracionP", label: "Acta de Declaración del Perjudicado" },
    { id: "declaracionT", label: "Acta de Declaración de Testigo" },
    { id: "entrega", label: "Diligencia de Entrega de Detenido" },
];

export function IndexGenerator() {
    const [selected, setSelected] = useState<string[]>(["expo"]);

    const toggleOption = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    const generatedList = selected
        .map(id => OPTIONS.find(o => o.id === id)?.label)
        .filter(Boolean)
        .map((label, i) => `${i + 1}. ${label}`)
        .join("\n");

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Selecciona las Diligencias</h3>
                <div className="space-y-2">
                    {OPTIONS.map(opt => (
                        <label key={opt.id} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                            <input
                                type="checkbox"
                                checked={selected.includes(opt.id)}
                                onChange={() => toggleOption(opt.id)}
                                className="w-5 h-5 rounded text-brand-primary border-slate-300 focus:ring-brand-primary"
                            />
                            <span className="ml-3 text-sm text-slate-700 font-medium">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Índice Generado</h3>
                    <CopyButton text={generatedList} variant="outline" />
                </div>
                <div className="w-full h-full min-h-[300px] p-6 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm leading-8 text-slate-800 whitespace-pre-wrap shadow-inner">
                    {generatedList || <span className="text-slate-400 italic">Selecciona diligencias para generar el índice...</span>}
                </div>
            </div>
        </div>
    )
}
