"use client"

import { useState } from "react"
import { ShieldAlert, ShieldCheck, TerminalSquare, AlertTriangle, ChevronRight, Check } from "lucide-react"

type Phase = "red" | "yellow" | "green";

const rules = [
    {
        id: 1,
        title: "Evitar Valoraciones Subjetivas",
        desc: "¿El borrador incluye juicios de valor del agente?",
        bad: "Se le notaba muy nervioso y parecía que mentía ocultando algo raro.",
        good: "El individuo presentaba sudoración excesiva, temblor en las manos y evasivas a las preguntas formuladas.",
        phase: "red"
    },
    {
        id: 2,
        title: "Cadena de Custodia",
        desc: "¿Se ha garantizado la cadena de custodia referenciada en el acta?",
        bad: "Se le quitó la navaja y se guardó en el maletero del Zeta.",
        good: "Se procedió a la intervención de una navaja marca X, siendo introducida en el sobre precintado con resguardo nº YYYY.",
        phase: "green"
    },
    {
        id: 3,
        title: "Relato Cronológico",
        desc: "¿El relato incluye saltos inexplicables de tiempo?",
        bad: "Llegamos a las 10:00. A las 12:00 lo detuvimos. No quiso declarar.",
        good: "10:00 h: se llega al lugar. 10:00 a 11:45 h: se busca el vehículo. 12:00 h: detención...",
        phase: "yellow"
    },
    {
        id: 4,
        title: "Términos Jurídicos",
        desc: "¿Se usurpan términos que corresponden a la Magistratura?",
        bad: "Se le lee los derechos al asesino / agresor / culpable.",
        good: "Se informa a la persona de los derechos que le asisten como Detenido / Investigado por...",
        phase: "red"
    }
];

export function TrafficLightGuide() {
    const [activeId, setActiveId] = useState(1);
    const activeRule = rules.find(r => r.id === activeId)!;

    // Thematic color generator based on the active phase
    const getThemeConfig = (phase: Phase) => {
        switch (phase) {
            case "red": return {
                bg: "bg-rose-500",
                lightGlow: "bg-rose-500/20",
                border: "border-rose-500/50",
                text: "text-rose-400",
                shadow: "shadow-[0_0_30px_rgba(244,63,94,0.3)]"
            };
            case "yellow": return {
                bg: "bg-amber-400",
                lightGlow: "bg-amber-400/20",
                border: "border-amber-400/50",
                text: "text-amber-400",
                shadow: "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
            };
            case "green": return {
                bg: "bg-emerald-500",
                lightGlow: "bg-emerald-500/20",
                border: "border-emerald-500/50",
                text: "text-emerald-400",
                shadow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            };
        }
    };

    const theme = getThemeConfig(activeRule.phase as Phase);

    return (
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-stretch w-full">

            {/* Left Sidebar: Navigation Tabs */}
            <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-3">
                {rules.map((rule, idx) => {
                    const isActive = activeId === rule.id;
                    const ruleTheme = getThemeConfig(rule.phase as Phase);

                    return (
                        <button
                            key={rule.id}
                            onClick={() => setActiveId(rule.id)}
                            className={`group relative flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 border
                                ${isActive
                                    ? `bg-[#18181B] ${ruleTheme.border} ${ruleTheme.shadow}`
                                    : "bg-[#09090B] border-slate-800 hover:border-slate-700 hover:bg-[#18181B]"
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Vertical Status Light */}
                                <div className={`w-1.5 h-10 rounded-full transition-colors duration-500 ${isActive ? ruleTheme.bg : 'bg-slate-800 group-hover:bg-slate-700'}`}></div>

                                <div>
                                    <div className="text-xs font-mono text-slate-500 mb-1 tracking-wider uppercase">0{idx + 1}{" // "}{rule.phase}</div>
                                    <div className={`font-bold text-sm tracking-wide transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                                        {rule.title}
                                    </div>
                                </div>
                            </div>

                            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? `text-white translate-x-1` : "text-slate-700"}`} />
                        </button>
                    );
                })}
            </div>

            {/* Right Main Panel: The "Terminal" */}
            <div className={`flex-1 relative bg-[#0c0c0e] rounded-3xl border transition-colors duration-700 overflow-hidden ${theme.border}`}>

                {/* Subtle illuminated background grid for the active panel */}
                <div className={`absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-50`}></div>

                {/* Header of the terminal */}
                <div className="relative border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <TerminalSquare className={`w-5 h-5 ${theme.text}`} />
                        <span className="font-mono text-xs text-slate-400 bg-black/40 px-2 py-1 rounded border border-white/10 uppercase tracking-widest">
                            Sys.Rule.0{activeId}
                        </span>
                    </div>
                    {/* Traffic Light Dots */}
                    <div className="flex gap-2">
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeRule.phase === 'red' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-slate-800'}`}></div>
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeRule.phase === 'yellow' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-slate-800'}`}></div>
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeRule.phase === 'green' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-800'}`}></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative p-6 lg:p-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 tracking-tight max-w-2xl leading-snug">
                        {activeRule.desc}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

                        {/* BAD Code Block */}
                        <div className="group relative bg-[#18181B] rounded-2xl border border-rose-500/20 overflow-hidden hover:border-rose-500/40 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500/50"></div>
                            <div className="px-5 py-3 border-b border-rose-500/10 flex justify-between items-center bg-rose-500/5">
                                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                                    <ShieldAlert className="w-4 h-4" />
                                    <span>Riesgo Procesal</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500">diff -bad</span>
                            </div>
                            <div className="p-5 lg:p-6 font-mono text-sm leading-relaxed text-slate-300">
                                <span className="text-rose-500/50 mr-3 select-none">-</span>
                                <span>{activeRule.bad}</span>
                            </div>
                        </div>

                        {/* GOOD Code Block */}
                        <div className="group relative bg-[#18181B] rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
                            <div className="px-5 py-3 border-b border-emerald-500/10 flex justify-between items-center bg-emerald-500/5">
                                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Práctica Correcta</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500">diff +good</span>
                            </div>
                            <div className="p-5 lg:p-6 font-mono text-sm leading-relaxed text-white">
                                <span className="text-emerald-500/80 mr-3 select-none">+</span>
                                <span>{activeRule.good}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
