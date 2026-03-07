'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, CircleDashed, ChevronRight, Check, Activity, Search } from 'lucide-react';

export function SmartAuditor() {
    const [checkedItems, setCheckedItems] = useState<number[]>([1]);

    const toggleCheck = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter(item => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const checklist = [
        { id: 1, text: "Integridad Cronológica: Hechos ordenados sin saltos ambiguos." },
        { id: 2, text: "Objetividad Pura: He eliminado valoraciones subjetivas o adjetivos innecesarios." },
        { id: 3, text: "Aislamiento PII: He verificado que ningún dato sensible real sea procesado." }
    ];

    const score = Math.round((checkedItems.length / checklist.length) * 100);

    let scoreColor = "text-amber-500";
    let scoreBg = "bg-amber-500/10";
    let scoreBorder = "border-amber-500/20";
    let scoreGlow = "shadow-[0_0_20px_rgba(245,158,11,0.2)]";

    if (score === 100) {
        scoreColor = "text-emerald-500";
        scoreBg = "bg-emerald-500/10";
        scoreBorder = "border-emerald-500/20";
        scoreGlow = "shadow-[0_0_30px_rgba(16,185,129,0.3)]";
    } else if (score < 50) {
        scoreColor = "text-rose-500";
        scoreBg = "bg-rose-500/10";
        scoreBorder = "border-rose-500/20";
        scoreGlow = "shadow-[0_0_20px_rgba(244,63,94,0.2)]";
    }

    return (
        <div className="bg-[#0c0c0e] rounded-[40px] border border-white/5 shadow-2xl mb-20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none"></div>

            <div className="bg-white/[0.02] border-b border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Search className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight italic">Expert Validator</h2>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        El filtro de integridad previo al procesado. Garantiza que la información cumple con los estándares de rigor judicial y seguridad operativa.
                    </p>
                </div>

                {/* Score Gauge: The Scanner Forense */}
                <div className={`flex items-center gap-6 p-6 rounded-3xl border transition-all duration-700 bg-black/40 backdrop-blur-md ${scoreBorder} ${scoreGlow}`}>
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-white/5"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className={`${scoreColor} transition-all duration-1000 ease-out`}
                                strokeDasharray={`${score}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className={`absolute text-xl font-black font-mono tracking-tighter ${scoreColor}`}>{score}%</div>
                    </div>
                    <div>
                        <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Status de Integridad</div>
                        <div className={`text-sm font-black uppercase ${scoreColor}`}>
                            {score === 100 ? "Validación Superada" : score < 50 ? "Alerta de Rigor" : "Procesamiento Parcial"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
                {/* Interactive Checklist */}
                <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        <Activity className="w-4 h-4 text-blue-500" /> Protocolo de Verificación
                    </h3>
                    <div className="space-y-4">
                        {checklist.map((item) => {
                            const isChecked = checkedItems.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleCheck(item.id)}
                                    className={`w-full text-left flex items-start gap-4 p-5 rounded-[24px] border transition-all duration-300 ${isChecked
                                        ? "bg-emerald-500/5 border-emerald-500/20"
                                        : "bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-500 ${isChecked ? "bg-emerald-500 text-black scale-110 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-white/5 border border-white/10 text-transparent"
                                        }`}>
                                        <Check className="w-4 h-4 font-bold" />
                                    </div>
                                    <span className={`text-sm md:text-base leading-relaxed transition-all ${isChecked ? "text-slate-500 line-through opacity-50" : "text-slate-300 font-bold"
                                        }`}>
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Smart Alerts */}
                <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                        <ShieldAlert className="w-4 h-4 text-amber-500" /> Alertas Predictivas
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[32px] flex gap-5 group/alert">
                            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover/alert:scale-110 transition-transform">
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-amber-200 mb-1 uppercase tracking-tighter">Filiaciones Masivas</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Evita volcar bases de datos íntegras. El sistema detecta patrones de PII, pero la responsabilidad de la purga inicial es del instructor.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[32px] flex gap-5 group/alert">
                            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover/alert:scale-110 transition-transform">
                                <Activity className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-blue-200 mb-1 uppercase tracking-tighter">Certificación de Hechos</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    La IA no certifica la veracidad. Su labor es puramente estructural y narrativa. Lee, ajusta y valida.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
