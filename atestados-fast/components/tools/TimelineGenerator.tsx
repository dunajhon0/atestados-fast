'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Clock, FileText, Download, Copy, Check, ListChecks } from 'lucide-react';

interface Event {
    id: string;
    time: string;
    description: string;
}

export function TimelineGenerator() {
    const [events, setEvents] = useState<Event[]>([
        { id: '1', time: '12:00', description: 'Llegada al lugar e identificación inicial.' },
        { id: '2', time: '12:15', description: 'Traslado del presunto autor a dependencias.' }
    ]);
    const [copied, setCopied] = useState(false);

    const addEvent = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setEvents([...events, { id: newId, time: '', description: '' }]);
    };

    const updateEvent = (id: string, field: keyof Event, value: string) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, [field]: value } : event
        ));
    };

    const removeEvent = (id: string) => {
        if (events.length > 1) {
            setEvents(events.filter(event => event.id !== id));
        }
    };

    const generateText = () => {
        return events
            .filter(e => e.time && e.description)
            .map(e => `[${e.time}] ${e.description}`)
            .join('\n');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-10">
            {/* Input Side */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" /> Registro de Hitos
                    </h3>
                    <button
                        onClick={addEvent}
                        className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {events.map((event, index) => (
                        <div key={event.id} className="flex gap-4 group animate-in slide-in-from-left-2 duration-300">
                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex-1 flex flex-col sm:flex-row gap-4 transition-all hover:bg-white/[0.05] hover:border-blue-500/20">
                                <input
                                    type="time"
                                    value={event.time}
                                    onChange={(e) => updateEvent(event.id, 'time', e.target.value)}
                                    className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-sm focus:border-blue-500 outline-none w-full sm:w-32"
                                />
                                <input
                                    type="text"
                                    placeholder="Descripción del hecho..."
                                    value={event.description}
                                    onChange={(e) => updateEvent(event.id, 'description', e.target.value)}
                                    className="bg-transparent border-none text-slate-300 text-sm focus:ring-0 outline-none flex-1 font-medium placeholder:text-slate-600"
                                />
                            </div>
                            <button
                                onClick={() => removeEvent(event.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-rose-500 transition-all self-center"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Output Side (Smart Preview) */}
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-emerald-500" /> Vista Previa Hilada
                    </h3>
                    <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copiado' : 'Copiar Hilado'}
                    </button>
                </div>

                <div className="flex-1 bg-black/60 rounded-[32px] border border-white/5 p-8 font-mono text-sm relative group overflow-hidden min-h-[300px]">
                    {/* Visual Timeline Line */}
                    <div className="absolute left-10 top-10 bottom-10 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"></div>

                    <div className="space-y-6 relative z-10">
                        {events.some(e => e.time || e.description) ? (
                            events.map((event, index) => (
                                event.time || event.description ? (
                                    <div key={event.id} className="flex gap-6 animate-in fade-in duration-500">
                                        <div className="w-12 text-right shrink-0">
                                            <span className="text-blue-500 font-black text-[12px]">{event.time || "--:--"}</span>
                                        </div>
                                        <div className="flex-1 text-slate-400 leading-relaxed font-medium">
                                            {event.description || "..."}
                                            {index < events.length - 1 && <div className="mt-2 text-[10px] text-slate-600 italic">Procediendo acto seguido a...</div>}
                                        </div>
                                    </div>
                                ) : null
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
                                <FileText className="w-12 h-12 mb-4 opacity-20" />
                                <p>El hilado aparecerá aquí automáticamente</p>
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-6 text-[11px] text-slate-500 leading-relaxed font-medium italic">
                    💡 <span className="text-blue-500/80">Tip Operativo:</span> Usa este texto como base para volcarlo en el simulador principal o directamente en tu minuta de patrulla.
                </p>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
