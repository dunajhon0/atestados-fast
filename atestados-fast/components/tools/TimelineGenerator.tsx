"use client"

import { useState } from "react"
import { Plus, Trash2, Clock, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"

interface TimelineEvent {
    id: string;
    time: string;
    description: string;
}

export function TimelineGenerator() {
    const [events, setEvents] = useState<TimelineEvent[]>([
        { id: "1", time: "10:15", description: "Recepción de la llamada en la Sala 092 alertando de la incidencia." },
        { id: "2", time: "10:20", description: "Llegada al lugar de los hechos y primera valoración visual." }
    ]);

    const addEvent = () => {
        setEvents([...events, { id: Math.random().toString(36).substr(2, 9), time: "", description: "" }]);
    };

    const removeEvent = (id: string) => {
        if (events.length > 1) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const updateEvent = (id: string, field: keyof TimelineEvent, value: string) => {
        setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const handleSort = () => {
        const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));
        setEvents(sorted);
    };

    const generateOutput = () => {
        if (events.length === 0) return "";

        // Auto-sort before generate to ensure logical flow
        const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

        return sorted.map((e, index) => {
            let prefix = index === 0 ? "En primer lugar, " : index === sorted.length - 1 ? "Finalmente, " : "Posteriormente, ";
            if (index > 0 && index < sorted.length - 1 && index % 2 !== 0) {
                prefix = "A continuación, ";
            }
            return `${prefix}siendo las ${e.time || "[HORA]"} horas, ${e.description || "[DESCRIPCIÓN DE LA ACCIÓN]"}`;
        }).join(" ");
    };

    const generatedText = generateOutput();

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={event.id} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm mt-1">
                            {index + 1}
                        </div>

                        <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Hora (HH:MM)</label>
                                <div className="relative">
                                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="time"
                                        value={event.time}
                                        onChange={(e) => updateEvent(event.id, "time", e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Hecho / Descripción</label>
                                <div className="relative">
                                    <AlignLeft className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                    <textarea
                                        value={event.description}
                                        onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                                        placeholder="Ej: Se entrevista a los testigos en el lugar..."
                                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none h-16"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => removeEvent(event.id)}
                            disabled={events.length <= 1}
                            className="text-slate-400 hover:text-red-500 transition-colors p-2 disabled:opacity-30 disabled:hover:text-slate-400"
                            title="Eliminar evento"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={addEvent}>
                    <Plus className="w-4 h-4 mr-2" /> Añadir Evento
                </Button>
                <Button variant="outline" onClick={handleSort}>
                    Ordenar por Hora
                </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Resultado Generado</h3>
                    <CopyButton text={generatedText} variant="primary" />
                </div>
                <div className="bg-slate-900 text-slate-50 p-6 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {generatedText || "El resultado aparecerá aquí una vez que añadas eventos..."}
                </div>
            </div>
        </div>
    )
}
