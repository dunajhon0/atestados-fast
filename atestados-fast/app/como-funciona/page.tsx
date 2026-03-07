import { Metadata } from 'next';
import { InteractiveSimulator } from '@/components/method/InteractiveSimulator';
import { SmartAuditor } from '@/components/method/SmartAuditor';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TimelineGenerator } from '@/components/tools/TimelineGenerator';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { CheckCircle2, AlertTriangle, ArrowDown } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Cómo Funciona el Motor | Atestados Fast',
    description: 'Proceso de 4 pasos para estructurar diligencias policiales y usar nuestro Generador de Cronología integrado.',
};

export default function ComoFuncionaPage() {
    return (
        <div className="pb-16">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Hero Transaccional */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24 mt-8">
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                            Estructura Impecable.<br />
                            <span className="text-blue-600">Seguridad Absoluta.</span><br />
                            Cero Fricción.
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed pr-4">
                            Introduce la intervención tal como la viviste. El Método Atestados Fast extrae, anonimiza y compila los hechos en una narrativa procesalmente perfecta, lista para la validación final y traslado policial.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href="#metodo"
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Probar Simulación
                            </a>
                            <a
                                href={process.env.NEXT_PUBLIC_GPT_URL || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold transition-all hover:border-slate-300"
                            >
                                Ir al Editor
                            </a>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-slate-50 py-2.5 px-4 rounded-lg inline-flex border border-slate-100 shadow-sm">
                            <span className="text-emerald-600 text-lg leading-none">🔒</span> Entorno Privado. 0% almacenamiento en servidor.
                        </div>
                    </div>

                    {/* Abstract Mockup Visual */}
                    <div className="relative lg:pl-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
                        <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                            {/* Window Header */}
                            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                </div>
                                <div className="mx-auto text-xs font-mono text-slate-400 flex items-center gap-1">
                                    procesamiento_ia.exe
                                </div>
                            </div>

                            {/* Window Body */}
                            <div className="p-6">
                                {/* Raw Input */}
                                <div className="mb-4">
                                    <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Input Crudo</div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-sm text-slate-500 leading-relaxed shadow-inner">
                                        ...llegamos al lugar a las 12 y vimos al sujeto de chaqueta azul gritando a la señora María, DNI 12345678A. Tratamos de calmar la situación pero...
                                    </div>
                                </div>

                                {/* AI Arrow Divider */}
                                <div className="flex justify-center -my-3 relative z-10 transition-transform duration-500 hover:scale-110 cursor-default">
                                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg border-4 border-white">
                                        <ArrowDown className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Processed Output */}
                                <div className="mt-4">
                                    <div className="text-[11px] font-bold text-blue-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Output Estructurado
                                    </div>
                                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-sm text-slate-700 space-y-3">
                                        <div className="flex gap-2">
                                            <span className="text-blue-700 font-bold shrink-0">[12:00]</span>
                                            <span>Llegada de la dotación al lugar.</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-blue-700 font-bold shrink-0">[HECHO]</span>
                                            <span className="leading-snug">Identificación de perjudicada (<span className="bg-slate-900 text-white px-1.5 py-0.5 rounded text-[10px] select-none tracking-widest cursor-help" title="Dato anonimizado">DNI/███</span>) y presunto autor.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workflow Interactivo */}
                <InteractiveSimulator />

                {/* Asistente Inteligente QA */}
                <SmartAuditor />
            </div>

            {/* Tool Layout Area */}
            <div id="herramienta">
                <ToolLayout
                    title="Generador Rápido de Cronología"
                    description="A veces el relato tiene saltos temporales. Usa esta pequeña utilidad local para organizar los eventos por hora antes de volcarlos en la demo principal. Generará un borrador hilado con conectores temporales."
                >
                    <TimelineGenerator />
                </ToolLayout>
            </div>

        </div>
    );
}
