"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

type Phase = "red" | "yellow" | "green";

const rules = [
    {
        id: 1,
        title: "¿El borrador incluye valoraciones subjetivas del agente?",
        bad: "Se le notaba muy nervioso y parecía que mentía ocultando algo raro.",
        good: "El individuo presentaba sudoración excesiva, temblor en las manos y evasivas a las preguntas formuladas.",
        phase: "red"
    },
    {
        id: 2,
        title: "¿Se ha garantizado la cadena de custodia referenciada en el acta?",
        bad: "Se le quitó la navaja y se guardó en el maletero del Zeta.",
        good: "Se procedió a la intervención de una navaja marca X de 8cm, siendo introducida en el sobre precintado con número YYYY.",
        phase: "green"
    },
    {
        id: 3,
        title: "¿El relato cronológico incluye saltos inexplicables?",
        bad: "Llegamos a las 10:00. A las 12:00 lo detuvimos. No quiso declarar.",
        good: "Siendo las 10:00 horas se llega al lugar. De 10:00 a 11:45 se busca el vehículo sustraído. A las 12:00 se procedió a la detención...",
        phase: "yellow"
    },
    {
        id: 4,
        title: "¿Se usan términos jurídicos que corresponden al Juez (Culpable/Asesino)?",
        bad: "Se le lee los derechos al asesino / agresor / culpable por robar.",
        good: "Se informa a la persona de los derechos que le asisten como Detenido / Investigado por la presunta comisión de un delito de...",
        phase: "red"
    }
];

export function TrafficLightGuide() {
    const [activeRule, setActiveRule] = useState(rules[0]);

    const getPhaseStyles = (phase: Phase) => {
        switch (phase) {
            case "red": return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
            case "yellow": return "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]";
            case "green": return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Traffic Light UI */}
            <div className="bg-slate-900 rounded-2xl p-6 w-full lg:w-32 flex flex-col items-center gap-4 border-4 border-slate-800 shadow-xl flex-shrink-0">
                <div className="w-4 flex flex-col items-center space-y-4">
                    {["red", "yellow", "green"].map((c) => (
                        <div
                            key={c}
                            className={`w-12 h-12 rounded-full border-2 border-black/20 transition-all duration-500 ${activeRule.phase === c
                                ? getPhaseStyles(c as Phase)
                                : "bg-slate-800 opacity-20"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Rules selector and display */}
            <div className="flex-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                    {rules.map((r, i) => (
                        <button
                            key={r.id}
                            onClick={() => setActiveRule(r)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${activeRule.id === r.id
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            Regla {i + 1}
                        </button>
                    ))}
                </div>

                <div className="bg-white border text-center md:text-left border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Info className="w-6 h-6 text-brand-primary" />
                        {activeRule.title}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 p-4 border border-red-100 rounded-lg">
                            <div className="flex items-center text-red-800 font-bold mb-2">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Así NO:
                            </div>
                            <p className="text-sm text-red-700 italic">&quot;{activeRule.bad}&quot;</p>
                        </div>
                        <div className="bg-emerald-50 p-4 border border-emerald-100 rounded-lg">
                            <div className="flex items-center text-emerald-800 font-bold mb-2">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Así SÍ:
                            </div>
                            <p className="text-sm text-emerald-700 font-medium">&quot;{activeRule.good}&quot;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
