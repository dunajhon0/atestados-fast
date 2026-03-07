'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldAlert, ListOrdered, CheckSquare, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight, X } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Relato de Intervención",
        description: "Vacía los datos iniciales. Sin preocuparte del formato.",
        icon: FileText
    },
    {
        id: 2,
        title: "Reconocimiento y Anonimización",
        description: "Aislamiento inmediato de KPIs personales.",
        icon: ShieldAlert
    },
    {
        id: 3,
        title: "Estructuración Procesal",
        description: "Tabulación algorítmica lógica y cronológica.",
        icon: ListOrdered
    },
    {
        id: 4,
        title: "Revisión Oficial",
        description: "Tu criterio final da validez jurídica.",
        icon: CheckSquare
    }
];

export function InteractiveSimulator() {
    const [activeStep, setActiveStep] = useState(1);
    const [isTyping, setIsTyping] = useState(false);

    // Auto-advance simulation demo for step 1
    useEffect(() => {
        if (activeStep === 1) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [activeStep]);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row mb-20">
            {/* Sidebar Stepper */}
            <div className="w-full lg:w-1/3 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-6 lg:p-8 shrink-0">
                <h3 className="text-xl font-bold text-slate-900 mb-8">El Método en 4 Fases</h3>

                <div className="space-y-3">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = activeStep === step.id;
                        const isPast = activeStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${isActive
                                        ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100"
                                        : "border-transparent hover:bg-slate-100"
                                    }`}
                            >
                                <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" :
                                        isPast ? "bg-slate-200 text-slate-700" : "bg-slate-200 text-slate-400"
                                    }`}>
                                    {isPast && !isActive ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-bold ${isActive ? "text-blue-900" : "text-slate-700"}`}>
                                        {step.title}
                                    </div>
                                    {isActive && (
                                        <div className="text-sm text-slate-500 mt-1.5 leading-snug animate-in fade-in slide-in-from-top-1">
                                            {step.description}
                                        </div>
                                    )}
                                </div>
                                {isActive && <ChevronRight className="w-5 h-5 text-blue-400 self-center shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Simular Viewport Main Area */}
            <div className="w-full lg:w-2/3 bg-slate-900 p-6 lg:p-10 relative min-h-[500px] flex flex-col">
                {/* Header Mockup */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                            <ShieldAlert className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-slate-200 font-medium text-sm">Simulación Segura</div>
                            <div className="text-slate-500 text-xs">Atestados_Fast_Engine_v2.0</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700 hover:bg-slate-700 transition-colors">
                            Reiniciar
                        </button>
                    </div>
                </div>

                {/* Step Content Renders */}
                <div className="flex-1 relative">
                    {/* STEP 1 */}
                    {activeStep === 1 && (
                        <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex-1 relative overflow-hidden group">
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Autoguardado On</span>
                                </div>
                                <p className="text-slate-400 font-mono text-sm leading-relaxed mt-4 relative">
                                    <span className={isTyping ? "animate-pulse" : ""}>
                                        A las 12 de la noche recibimos aviso emisora. nos personamos en c/ mayor 5, un individuo de camiseta roja agredía a la viandante maría garcía, DNI 12345678A. Usamos contención mínima proporcional...
                                    </span>
                                    {isTyping && <span className="inline-block w-2.5 h-4 bg-blue-500 ml-1 animate-ping"></span>}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => setActiveStep(2)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-blue-500/20">
                                    Procesar Texto Libre <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {activeStep === 2 && (
                        <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex-1">
                                <div className="mb-4 flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 inline-flex px-3 py-1.5 rounded-full border border-amber-400/20">
                                    <AlertTriangle className="w-3.5 h-3.5" /> Aislamiento de Entidades Activo
                                </div>
                                <p className="text-slate-300 font-mono text-sm leading-relaxed mt-2">
                                    A las 12 de la noche recibimos aviso emisora. nos personamos en <span className="bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 select-none group relative cursor-help">c/ mayor 5<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">[UBICACION] oculto por defecto</span></span>, un individuo de camiseta roja agredía a la viandante <span className="bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 select-none group relative cursor-help">maría garcía<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">[IDENTIDAD] pseudo-anonimizado</span></span>, DNI <span className="bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 select-none group relative cursor-help">12345678A<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">[DNI] Enmascarado para IA</span></span>. Usamos contención mínima proporcional...
                                </p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => setActiveStep(3)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-blue-500/20">
                                    Estructurar Datos <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {activeStep === 3 && (
                        <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
                            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex-1 overflow-y-auto space-y-3">
                                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Narrativa Procesal Generada</div>

                                <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-lg animate-in slide-in-from-left-4 fade-in duration-500">
                                    <div className="flex gap-3">
                                        <span className="text-blue-400 font-mono font-bold shrink-0 mt-0.5">[00:00]</span>
                                        <div className="text-slate-300 text-sm leading-relaxed">
                                            Recepción del aviso a través de emisora informando de un posible altercado en vía pública (C/ [UBICACION 1]).
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-lg animate-in slide-in-from-left-4 fade-in duration-500 delay-150">
                                    <div className="flex gap-3">
                                        <span className="text-blue-400 font-mono font-bold shrink-0 mt-0.5">[HECHO]</span>
                                        <div className="text-slate-300 text-sm leading-relaxed">
                                            Personados en el lugar, los agentes de la fuerza actuante observan a un varón (descripción: camiseta roja) en actitud agresiva hacia una viandante (identificada como la parte perjudicada).
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={() => setActiveStep(4)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-lg shadow-blue-500/20">
                                    Proceder a Revisión <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {activeStep === 4 && (
                        <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-slate-800">
                                <CheckSquare className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Borrador Listo para Validar</h4>
                            <p className="text-slate-400 text-sm max-w-sm mb-8">
                                La IA te asiste, pero tú dictas la intervención. Revisa minuciosamente los hechos y trasládalos a la aplicación oficial de atestados cuando estés 100% conforme.
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors border border-slate-700">
                                    Editar Borrador
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-600/20">
                                    Copiar al Portapapeles
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
