'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, CircleDashed, ChevronRight, Check } from 'lucide-react';

export function SmartAuditor() {
    const [checkedItems, setCheckedItems] = useState<number[]>([1]); // Start with one checked for demo purposes

    const toggleCheck = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter(item => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const checklist = [
        { id: 1, text: "Tengo claro el orden cronológico de los eventos." },
        { id: 2, text: "He reunido todos los indicios, actas y efectos intervinientes." },
        { id: 3, text: "He evitado incluir valoraciones subjetivas (ej: 'estaba muy nervioso')." }
    ];

    const score = Math.round((checkedItems.length / checklist.length) * 100);

    // Determine color based on score
    let scoreColor = "text-amber-500";
    let scoreBg = "bg-amber-500";
    if (score === 100) {
        scoreColor = "text-emerald-500";
        scoreBg = "bg-emerald-500";
    } else if (score < 50) {
        scoreColor = "text-red-500";
        scoreBg = "bg-red-500";
    }

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mb-20 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Auditor Pre-Redacción</h2>
                    <p className="text-slate-600">Comprueba la calidad de tu información antes de enviarla a procesar.</p>
                </div>

                {/* Score Gauge */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100"
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
                                strokeWidth="3"
                            />
                        </svg>
                        <div className={`absolute text-lg font-bold ${scoreColor}`}>{score}%</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-700">Nivel de Calidad</div>
                        <div className="text-xs text-slate-500">
                            {score === 100 ? "¡Listo para procesar!" : "Requiere más atención"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Interactive Checklist */}
                <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Checks Recomendados
                    </h3>
                    <div className="space-y-3">
                        {checklist.map((item) => {
                            const isChecked = checkedItems.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleCheck(item.id)}
                                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all ${isChecked
                                            ? "bg-slate-50 border-emerald-200 hover:bg-slate-100"
                                            : "bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow"
                                        }`}
                                >
                                    <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 transition-colors ${isChecked ? "bg-emerald-500 text-white" : "border-2 border-slate-300 text-transparent"
                                        }`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className={`text-sm leading-relaxed transition-colors ${isChecked ? "text-slate-500 line-through decoration-slate-300" : "text-slate-700 font-medium"
                                        }`}>
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Smart Alerts (formerly Errores Frecuentes) */}
                <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-500" /> Alertas del Sistema
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 mb-1">Cuidado con las Identidades</h4>
                                <p className="text-xs text-amber-800/80 leading-relaxed">
                                    No copies y pegues volcados completos de bases de datos o filiaciones SIP enteras directamente en el prompt. Utiliza alias o iniciales.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 border border-blue-200/60 p-4 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-900 mb-1">Responsabilidad Procesal</h4>
                                <p className="text-xs text-blue-800/80 leading-relaxed">
                                    El motor estructura por ti, pero no certifica los hechos. Dar por bueno el texto de la IA sin leerlo es el error número uno. Revisa siempre.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
