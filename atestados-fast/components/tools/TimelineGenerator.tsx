"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Trash2, Clock, AlignLeft, Sparkles, SlidersHorizontal, ArrowDownToLine, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"

interface TimelineEvent {
    id: string;
    time: string;
    description: string;
}

type ExportFormat = 'acta' | 'diligencia' | 'minuta';

export function TimelineGenerator() {
    const [events, setEvents] = useState<TimelineEvent[]>([
        { id: "1", time: "10:15", description: "Recepción de la llamada en la Sala 092 alertando de la incidencia." }
    ]);
    const [quickInput, setQuickInput] = useState("");
    const [exportFormat, setExportFormat] = useState<ExportFormat>('minuta');

    // Smart parser
    const handleQuickAdd = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!quickInput.trim()) return;

        // Extract time using regex (e.g., 12:45, 12.45, 1245)
        let extractedTime = "";
        let remainingText = quickInput;

        const timeRegex = /\b([0-1]?[0-9]|2[0-3])[:.]?([0-5][0-9])\b/;
        const match = quickInput.match(timeRegex);

        if (match) {
            extractedTime = `${match[1].padStart(2, '0')}:${match[2]}`;
            // Remove the time from the description if it's explicitly there
            remainingText = quickInput.replace(match[0], '').trim();
            // Clean up possible leading words like "a las"
            remainingText = remainingText.replace(/^(a las|sobre las)\s+/i, '');
        }

        const newEvent = {
            id: Math.random().toString(36).substr(2, 9),
            time: extractedTime,
            description: remainingText.charAt(0).toUpperCase() + remainingText.slice(1)
        };

        setEvents(prev => {
            const newEvents = [...prev, newEvent];
            // Auto sort
            return newEvents.sort((a, b) => a.time.localeCompare(b.time));
        });
        setQuickInput("");
    };

    const removeEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
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
        const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

        if (exportFormat === 'acta') {
            return sorted.map((e) => `[${e.time || "HH:MM"}] - ${e.description}`).join("\n");
        }
        else if (exportFormat === 'diligencia') {
            return sorted.map((e) => `QUE siendo las ${e.time || "HH:MM"} horas, ${e.description.toLowerCase()}`).join(".\n") + ".";
        }
        else {
            // Minuta format (narrative flow)
            return sorted.map((e, index) => {
                let prefix = index === 0 ? "A las " : ", y sobre las ";
                return `${prefix}${e.time || "[HORA]"} horas, ${e.description.charAt(0).toLowerCase() + e.description.slice(1)}`;
            }).join(" ") + ".";
        }
    };

    const generatedText = generateOutput();

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-8 mb-16">
            {/* Header Tool */}
            <div className="bg-slate-900 border-b border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="text-left w-full">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        Motor de Cronología Inteligente
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                        Escribe &quot;A las 14:30 llegó el furgón&quot; y la IA extraerá la hora y lo ordenará automáticamente.
                    </p>
                </div>

                {/* Format Chips */}
                <div className="flex bg-slate-800 p-1 rounded-xl shrink-0 w-full md:w-auto overflow-x-auto">
                    {(['minuta', 'diligencia', 'acta'] as ExportFormat[]).map(fmt => (
                        <button
                            key={fmt}
                            onClick={() => setExportFormat(fmt)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${exportFormat === fmt
                                ? "bg-blue-600 text-white shadow"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                                }`}
                        >
                            {fmt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-10">
                {/* Left: Input & List */}
                <div className="space-y-6">
                    {/* Quick Smart Add */}
                    <form onSubmit={handleQuickAdd} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Plus className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={quickInput}
                            onChange={(e) => setQuickInput(e.target.value)}
                            className="block w-full pl-11 pr-24 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                            placeholder="Escribe un hecho indicando la hora (Ej: A las 12:45...)"
                        />
                        <button
                            type="submit"
                            disabled={!quickInput.trim()}
                            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 rounded-xl text-xs font-bold transition-colors"
                        >
                            Insertar
                        </button>
                    </form>

                    {/* Timeline Tracker */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 min-h-[300px] relative">
                        {events.length === 0 ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 opacity-60">
                                <Clock className="w-12 h-12 mb-3 stroke-1" />
                                <p className="text-sm">Cronología vacía</p>
                            </div>
                        ) : (
                            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-3.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                                {events.map((event, index) => (
                                    <div key={event.id} className="relative flex items-start gap-4 group">
                                        <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center mt-1 outline outline-4 outline-slate-50 shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        </div>

                                        <div className="flex-1 bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-3 shadow-sm transition-colors group-hover:shadow relative flex flex-col sm:flex-row gap-3">
                                            <div className="w-full sm:w-24 shrink-0">
                                                <input
                                                    type="time"
                                                    value={event.time}
                                                    onChange={(e) => updateEvent(event.id, "time", e.target.value)}
                                                    onBlur={handleSort} // Auto-sort on blur
                                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-mono text-blue-700 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                                                />
                                            </div>
                                            <div className="flex-1 pr-8">
                                                <textarea
                                                    value={event.description}
                                                    onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                                                    className="w-full bg-transparent border-0 p-0 text-sm text-slate-700 focus:ring-0 resize-none h-10 leading-snug"
                                                    placeholder="Descripción del hecho..."
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeEvent(event.id)}
                                                className="absolute right-2 top-3 text-slate-300 hover:text-red-500 transition-colors p-1 bg-white rounded-md"
                                                title="Eliminar evento"
                                            >
                                                <XIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Output */}
                <div className="h-full flex flex-col">
                    <div className="bg-slate-900 flex-1 rounded-2xl border border-slate-800 shadow-inner flex flex-col overflow-hidden relative group">
                        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${events.length > 0 ? "bg-emerald-500" : "bg-slate-600"} animate-pulse`}></span>
                                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Compilación Final</span>
                            </div>
                            {events.length > 0 && (
                                <CopyButton text={generatedText} variant="secondary" className="h-8 py-1 bg-slate-800 hover:bg-slate-700 text-xs border-slate-700 text-slate-300" />
                            )}
                        </div>
                        <div className="p-6 text-slate-300 font-mono text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto flex-1">
                            {events.length > 0 ? generatedText : (
                                <span className="text-slate-600 select-none">El texto final procesado aparecerá aquí...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
