"use client";

import { useState } from 'react';
import {
    FileWarning,
    Check,
    ShieldCheck,
    ShieldAlert,
    ClipboardCheck,
    Lock,
    Zap
} from 'lucide-react';

const checklistItems = [
    "¿He eliminado nombres, matrículas y filiaciones reales del prompt?",
    "¿He verificado que la IA no ha inventado actos procesales no realizados?",
    "¿Menciona resistencia explícita coincidente con el parte de lesiones?",
    "¿Está especificado con detalle el momento de lectura de derechos?"
];

export default function BestPractices() {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(checklistItems.length).fill(false));

    const toggleItem = (index: number) => {
        const newChecked = [...checkedItems];
        newChecked[index] = !newChecked[index];
        setCheckedItems(newChecked);
    };

    const progress = Math.round((checkedItems.filter(Boolean).length / checklistItems.length) * 100);
    const isComplete = progress === 100;

    return (
        <section id="practicas" className="w-full">
            <div className="grid lg:grid-cols-5 gap-8 items-start">

                {/* Left: Comparison Terminal */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-[#18181B] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest italic">Protocolo de Anonimización</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 relative">
                            {/* Vertical Divider for desktop */}
                            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                            {/* Correct Practice */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span>Así SÍ (Aceptable)</span>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-emerald-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="relative bg-[#09090B] p-5 rounded-xl border border-emerald-500/20 text-sm font-mono text-emerald-100/80 leading-relaxed italic shadow-inner">
                                        &quot;Sobre las 22:30, nos entrevistamos con [TESTIGO 1], empleada del local, quien expone nerviosa que un individuo ha forcejeado...&quot;
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 leading-tight">Uso de placeholders genéricos y enfoque aséptico en los hechos.</p>
                            </div>

                            {/* Wrong Practice */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                    <ShieldAlert className="w-5 h-5" />
                                    <span>Así NO (Riesgo)</span>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-rose-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="relative bg-[#09090B] p-5 rounded-xl border border-rose-500/20 text-sm font-mono text-rose-100/80 leading-relaxed italic shadow-inner">
                                        &quot;Hemos detenido a Juan Romero Pérez con DNI XXXXXXX-Y en el coche 2222-BBB, su cuñado gritaba...&quot;
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 leading-tight">Fuga de datos personales y sensibles a motores externos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Lock className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-xs md:text-sm text-blue-200/70 leading-relaxed italic">
                            Recordatorio táctico: La eficiencia de la IA nunca debe comprometer la cadena de custodia de la información sensible. <span className="text-blue-400 font-bold">Anonimiza siempre antes de procesar.</span>
                        </p>
                    </div>
                </div>

                {/* Right: Verification Checkbox Console */}
                <div className="lg:col-span-2">
                    <div className={`relative bg-[#18181B] rounded-3xl border transition-all duration-700 overflow-hidden ${isComplete ? 'border-emerald-500/40 shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)]' : 'border-white/5'}`}>
                        <div className="px-6 py-5 border-b border-white/5 bg-white/2 flex items-center justify-between">
                            <h3 className="font-bold text-white tracking-tight flex items-center gap-2">
                                <ClipboardCheck className="w-5 h-5 text-blue-400" />
                                Lista de Verificación
                            </h3>
                            <div className={`text-xs font-mono font-bold px-2 py-1 rounded transition-colors ${isComplete ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                {progress}%
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            {checklistItems.map((text, i) => (
                                <button
                                    key={i}
                                    onClick={() => toggleItem(i)}
                                    className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 text-left border group
                                        ${checkedItems[i]
                                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-100/90'
                                            : 'bg-[#0c0c0e] border-white/5 text-slate-400 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shrink-0
                                        ${checkedItems[i]
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-slate-800'
                                        }`}
                                    >
                                        {checkedItems[i] && <Check className="w-4 h-4" strokeWidth={3} />}
                                    </div>
                                    <span className="text-sm font-medium leading-tight select-none">
                                        {text}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer Progress Area */}
                        <div className="p-6 bg-white/2 border-t border-white/5">
                            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden mb-4">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-emerald-500' : 'bg-blue-600'}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div className="text-center">
                                {isComplete ? (
                                    <div className="flex flex-col items-center animate-in zoom-in duration-500">
                                        <div className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-1">Estatus: Preparado</div>
                                        <p className="text-[11px] text-slate-500">Atestado listo para exportación segura.</p>
                                    </div>
                                ) : (
                                    <p className="text-[11px] text-slate-500 italic">Completa todos los puntos para validar el protocolo.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
