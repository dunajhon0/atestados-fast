'use client';

import { InteractiveSimulator } from '@/components/method/InteractiveSimulator';
import { SmartAuditor } from '@/components/method/SmartAuditor';
import { TimelineGenerator } from '@/components/tools/TimelineGenerator';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { CheckCircle2, ArrowRight, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

export default function ComoFuncionaPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 selection:bg-blue-500/30 selection:text-blue-200">
            {/* Ambient Background Strategy (Night Ops) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] opacity-20"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section: The Split-Terminal View */}
                <section className="pt-24 pb-20 lg:pt-36 lg:pb-32 container mx-auto px-4 md:px-6">
                    <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">

                        {/* Hero Text Content */}
                        <div className="lg:col-span-5 text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">Nueva Versión 2.5 // Motor IA Policial</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[0.95] md:leading-[0.95]">
                                Tu intervención, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">estructurada en segundos.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
                                Convierte notas crudas de calle en narrativa procesalmente perfecta.
                                <span className="text-slate-200"> Anonimización automática, estructura lógica</span> y control total para el instructor.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a
                                    href="#metodo"
                                    className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-white/10"
                                >
                                    Hacer Atestado Ahora
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="/legal"
                                    className="px-8 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                                >
                                    Protocolo de Seguridad
                                </a>
                            </div>

                            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-fit">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span>🔒 Encriptación local: tus datos nunca tocan nuestra base de datos.</span>
                            </div>
                        </div>

                        {/* Interactive Demo: The Split-Terminal Scanline */}
                        <div className="lg:col-span-7 relative group">
                            <div className="absolute -inset-4 bg-blue-500/10 rounded-[40px] blur-3xl group-hover:bg-blue-500/15 transition-all duration-700"></div>

                            <div className="relative grid md:grid-cols-2 gap-4 lg:gap-6">
                                {/* Left Terminal: Input */}
                                <div className="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-700">
                                    <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center gap-1.5 leading-none">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                                        <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Raw.Log_Intervención</span>
                                    </div>
                                    <div className="p-6 font-mono text-xs md:text-sm text-slate-500 space-y-4 leading-[1.6]">
                                        <p>&quot;Sobre las 22:30, la dotación es requerida en bar proximo. alli vemos a sujeto de camiseta azul gritando a señora Maria Perez (DNI 12345678A), se pone agresivo y tratamos de reducirlo usando la fuerza minima, se resiste mucho...&quot;</p>
                                    </div>
                                </div>

                                {/* Right Terminal: Output with Scanline Effect */}
                                <div className="bg-[#0c0c0e] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl -rotate-1 group-hover:rotate-0 transition-transform duration-700 relative">
                                    {/* Scanline Animation Overlay */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20 animate-scanline"></div>

                                    <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between leading-none">
                                        <div className="flex items-center gap-2">
                                            <Cpu className="w-3.5 h-3.5 text-blue-400" />
                                            <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-tight">Structured.Output_Procesal</span>
                                        </div>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    </div>
                                    <div className="p-6 font-mono text-xs md:text-sm text-slate-200 space-y-4 h-full bg-gradient-to-b from-blue-500/5 to-transparent">
                                        <div className="flex gap-3">
                                            <span className="text-blue-500 font-bold">[22:30]</span>
                                            <span>Llegada al lugar del incidente.</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="text-blue-500 font-bold shrink-0">[HECHO]</span>
                                            <span className="leading-snug">Identificación de parte perjudicada (█████████) y presunto autor (C. Roja).</span>
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <span className="text-blue-500 font-bold shrink-0">[FZA]</span>
                                            <span className="text-slate-400 italic">Uso de contención mínima proporcional ante resistencia activa.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Narrative Transition Divider */}
                <div className="w-full flex flex-col items-center">
                    <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
                    <div className="py-20 text-center">
                        <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-blue-500/80 mb-4 italic">The Intelligence Engine</h2>
                        <div className="w-px h-20 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Phase Area: Re-Narrated Workflow */}
                    <div id="metodo" className="scroll-mt-32">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">El Método en 4 Fases</h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                                Un protocolo de ingeniería narrativa que garantiza el rigor judicial mientras protege la privacidad operativa del agente.
                            </p>
                        </div>
                        <InteractiveSimulator />
                    </div>

                    {/* Section Spacer */}
                    <div className="h-40"></div>

                    {/* Expert Validator Area */}
                    <SmartAuditor />
                </div>

                {/* Auxiliary Utilities Area */}
                <div id="herramienta" className="bg-[#08080a] border-y border-white/5 py-32 mt-20 relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-20"></div>

                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Motor de Hilado Cronológico</h2>
                            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
                                Para intervenciones de larga duración con múltiples hitos temporales. Elige el modo (Minuta, Diligencia o Acta) para exportar con el tono procesal adecuado.
                            </p>
                        </div>

                        <div className="bg-[#0c0c0e] border border-white/5 rounded-[40px] p-2 md:p-6 shadow-2xl">
                            <TimelineGenerator />
                        </div>
                    </div>
                </div>
            </div>

            {/* Injected Animations */}
            <style jsx global>{`
                @keyframes scanline {
                    0% { top: 0%; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scanline {
                    animation: scanline 4s linear infinite;
                }
            `}</style>
        </div>
    );
}
