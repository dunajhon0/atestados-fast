'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldAlert, ListOrdered, CheckSquare, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight, X, Terminal, Cpu } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Fase de Ingesta",
        subtitle: "Relato de Calle",
        description: "El sistema procesa lenguaje natural no estructurado. Sin fricción ni formatos rígidos.",
        icon: FileText,
        logs: ["Iniciando motor de lenguaje...", "Esperando input del agente...", "Buffer local activo."]
    },
    {
        id: 2,
        title: "Fase de Purga",
        subtitle: "Sanitización PII",
        description: "Detección activa y enmascarado de Datos de Carácter Personal (DNI, Nombres, Ubicaciones).",
        icon: ShieldAlert,
        logs: ["Escaneando entidades sensibles...", "Detectado DNI: [HIDDEN]", "Aplicando anonimización local."]
    },
    {
        id: 3,
        title: "Fase de Compilación",
        subtitle: "Lógica Procesal",
        description: "Reordenación cronológica y jerárquica de los hechos bajo estándares policiales.",
        icon: ListOrdered,
        logs: ["Relacionando hitos temporales...", "Estructurando narrativa por puntos...", "Generando borrador_v1.md"]
    },
    {
        id: 4,
        title: "Fase de Validación",
        subtitle: "Control Humano",
        description: "El instructor supervisa la coherencia y valida el texto para su traslado oficial.",
        icon: CheckSquare,
        logs: ["Borrador verificado.", "Integridad procesal: 100%", "Listo para exportación segura."]
    }
];

export function InteractiveSimulator() {
    const [activeStep, setActiveStep] = useState(1);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

    useEffect(() => {
        if (activeStep) {
            setDisplayedLogs([]);
            let currentLogs = steps[activeStep - 1].logs;
            let i = 0;
            const logInterval = setInterval(() => {
                if (i < currentLogs.length) {
                    setDisplayedLogs(prev => [...prev, currentLogs[i]]);
                    i++;
                } else {
                    clearInterval(logInterval);
                }
            }, 600);
            return () => clearInterval(logInterval);
        }
    }, [activeStep]);

    useEffect(() => {
        if (activeStep === 1) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [activeStep]);

    const activeStepData = steps[activeStep - 1];

    return (
        <div className="bg-[#0c0c0e] rounded-[40px] border border-white/5 shadow-3xl overflow-hidden flex flex-col lg:flex-row mb-20 relative">
            {/* Ambient inner glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            {/* Sidebar Stepper */}
            <div className="w-full lg:w-1/3 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/5 p-6 lg:p-10 shrink-0">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">The Engine</h3>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocolo de Procesamiento</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = activeStep === step.id;
                        const isPast = activeStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${isActive
                                    ? "bg-blue-500/5 border-blue-500/20 ring-1 ring-blue-500/10"
                                    : "border-transparent hover:bg-white/5"
                                    }`}
                            >
                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-transform duration-500 ${isActive ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110" :
                                    isPast ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-white/5 text-slate-600 border border-white/5"
                                    }`}>
                                    {isPast && !isActive ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-[10px] font-mono text-slate-500 mb-0.5 uppercase tracking-tighter">Fase 0{step.id}</div>
                                    <div className={`font-black text-lg leading-none ${isActive ? "text-white" : "text-slate-500"}`}>
                                        {step.title}
                                    </div>
                                    {isActive && (
                                        <div className="text-sm text-slate-400 mt-2 leading-snug animate-in fade-in slide-in-from-top-1 duration-500">
                                            {step.description}
                                        </div>
                                    )}
                                </div>
                                {isActive && <ChevronRight className="w-5 h-5 text-blue-500 self-center shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Simular Viewport Main Area */}
            <div className="w-full lg:w-2/3 p-6 lg:p-12 relative min-h-[500px] flex flex-col bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent)]">

                {/* AI Console Logs (The new Narrative Depth) */}
                <div className="mb-8 flex flex-col gap-2">
                    {displayedLogs.map((log, index) => (
                        <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                            <span className="text-[10px] font-mono text-slate-600">[{new Date().toLocaleTimeString('en-GB')}]</span>
                            <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20 uppercase tracking-widest leading-none">Status</span>
                            <span className="text-xs font-mono text-slate-500 italic">{log}</span>
                        </div>
                    ))}
                </div>

                {/* Step Content Renders */}
                <div className="flex-1 relative">
                    {/* STEP 1: INGESTA */}
                    {activeStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                            <div className="bg-white/[0.02] rounded-[32px] border border-white/5 p-8 flex-1 relative overflow-hidden group shadow-inner">
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">Modo: Libre Escala</span>
                                </div>
                                <div className="text-slate-400 font-mono text-base md:text-lg leading-relaxed mt-6 relative max-w-2xl">
                                    <span className={isTyping ? "animate-pulse" : ""}>
                                        A las 12 de la noche recibimos aviso emisora. nos personamos en c/ mayor 5, un individuo de camiseta roja agredía a la viandante maría garcía, DNI 12345678A. Usamos contención mínima proporcional...
                                    </span>
                                    {isTyping && <span className="inline-block w-3 h-5 bg-blue-500 ml-1 animate-ping"></span>}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <p className="text-xs text-slate-500 max-w-xs leading-relaxed italic">
                                    Introduce el relato tal como ocurrió. El sistema omitirá faltas de ortografía o sintaxis iniciales.
                                </p>
                                <button onClick={() => setActiveStep(2)} className="flex items-center gap-3 bg-white text-black hover:bg-slate-200 px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-white/5 active:scale-95">
                                    Iniciar Purga de Datos <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: PURGA */}
                    {activeStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                            <div className="bg-white/[0.02] rounded-[32px] border border-white/5 p-8 flex-1 shadow-inner relative overflow-hidden">
                                <div className="mb-6 flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] bg-amber-500/5 inline-flex px-4 py-2 rounded-full border border-amber-500/10">
                                    <AlertTriangle className="w-4 h-4" /> Scanner PII Activo: 3/3 Entidades Enmascaradas
                                </div>
                                <p className="text-slate-300 font-mono text-base md:text-lg leading-relaxed mt-2 max-w-2xl">
                                    A las 12 de la noche recibimos aviso emisora. nos personamos en <span className="bg-white/10 text-white/40 px-2 py-0.5 rounded border border-white/10 select-none group relative cursor-help">c/ mayor 5<span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-slate-200 text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none">[UBICACION] oculto localmente</span></span>, un individuo de camiseta roja agredía a la viandante <span className="bg-white/10 text-white/40 px-2 py-0.5 rounded border border-white/10 select-none group relative cursor-help">maría garcía<span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-slate-200 text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none">[IDENTIDAD] pseudo-anonimizado</span></span>, DNI <span className="bg-white/10 text-white/40 px-2 py-0.5 rounded border border-white/10 select-none group relative cursor-help">12345678A<span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-slate-200 text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none">[DNI] Enmascarado para IA</span></span>. Usamos contención mínima proporcional...
                                </p>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={() => setActiveStep(3)} className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                    Generar Compilación <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: COMPILACION */}
                    {activeStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                            <div className="bg-white/[0.02] rounded-[32px] border border-white/5 p-8 flex-1 overflow-y-auto space-y-4 shadow-inner">
                                <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4 flex items-center gap-2">
                                    <Cpu className="w-4 h-4" /> Narrativa Procesal Generada
                                </div>

                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl animate-in slide-in-from-left-4 fade-in duration-500">
                                    <div className="flex gap-4">
                                        <span className="text-blue-500 font-mono font-black shrink-0 mt-0.5 mt-1">[00:00]</span>
                                        <div className="text-slate-300 text-base leading-relaxed">
                                            Recepción del aviso a través de emisora informando de un posible altercado en vía pública (C/ [UBICACION 1]).
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl animate-in slide-in-from-left-4 fade-in duration-500 delay-150">
                                    <div className="flex gap-4">
                                        <span className="text-blue-500 font-mono font-black shrink-0 mt-1">[HECHO]</span>
                                        <div className="text-slate-300 text-base leading-relaxed">
                                            Personados en el lugar, los agentes de la fuerza actuante observan a un varón (descripción: camiseta roja) en actitud agresiva hacia una viandante identified como [IDENTIDAD 1].
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={() => setActiveStep(4)} className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                    Someter a Validación <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: VALIDACION */}
                    {activeStep === 4 && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col items-center justify-center text-center">
                            <div className="relative mb-10">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
                                <div className="relative w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center ring-8 ring-black/50">
                                    <CheckSquare className="w-12 h-12 text-emerald-400" />
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-white mb-3">Protocolo Verificado</h4>
                            <p className="text-slate-400 text-base max-w-sm mb-10 leading-relaxed font-medium">
                                El proceso de compilación ha finalizado con una pureza procesal predictiva del 100%. Revisa y exporta.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all border border-white/10 backdrop-blur-md">
                                    Ajustar Manualmente
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-2xl shadow-emerald-600/20 flex items-center gap-2">
                                    Exportar a Portapapeles
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
