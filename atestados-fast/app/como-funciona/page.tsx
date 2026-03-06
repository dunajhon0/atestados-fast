import { Metadata } from 'next';
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
                <header className="mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                        El Método Atestados Fast
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Nuestro objetivo es enseñarte a estructurar un relato para que resulte claro, ordenado y procesalmente impecable. Sigue nuestra filosofía de 4 pasos fundamentales.
                    </p>
                </header>

                {/* Stepper Vertical */}
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent mb-20">

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-brand-primary text-white shadow-lg font-bold text-xl shrink-0 absolute left-1/2 -translate-x-1/2">
                            1
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 md:mr-auto p-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <span className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-xs mr-1">1</span>
                                    El Relato de Intervención
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Todo comienza con un borrador tuyo o las notas de tu libreta. Escribe lo que ocurrió sin preocuparte por la estructura policial perfecta. Solo céntrate en los hechos, lugares y horas.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-slate-200 text-slate-600 shadow font-bold text-xl shrink-0 absolute left-1/2 -translate-x-1/2">
                            2
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] mr-auto md:ml-auto md:mr-0 p-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <span className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-700 text-xs mr-1">2</span>
                                    Reconocimiento de Entidades
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    El sistema identifica automáticamente a los actores (Agente 1, Denunciante, Testigo, Investigado) y los elementos clave (indicios, armas, vehículos, ubicaciones exactas).
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-slate-200 text-slate-600 shadow font-bold text-xl shrink-0 absolute left-1/2 -translate-x-1/2">
                            3
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 md:mr-auto p-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <span className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-700 text-xs mr-1">3</span>
                                    Estructuración Procesal
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Se organiza el texto en párrafos cronológicos utilizando un lenguaje técnico, aséptico y policial, eliminando juicios de valor y afirmaciones ambiguas que dificultan la labor judicial.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-white bg-slate-200 text-slate-600 shadow font-bold text-xl shrink-0 absolute left-1/2 -translate-x-1/2">
                            4
                        </div>
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] mr-auto md:ml-auto md:mr-0 p-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <span className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-700 text-xs mr-1">4</span>
                                    Revisión Humana (Vital)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Tú eres la autoridad, no el software. Revisa el borrador generado, verifica que los hechos se ajustan a la realidad al 100% y dale tu validación oficial copiándolo a tu sistema.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Checklist */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-20 flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Checklist de Preparación</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm">Asegúrate de no incluir Datos Personales Identificables (DNI, matrículas, nombres reales completos). Usa seudónimos en su lugar.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm">Ten claro el orden cronológico de los eventos.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                <span className="text-slate-700 text-sm">Reúne todos los indicios, actas y efectos intervinientes antes de generar el documento final.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-red-50 p-6 rounded-xl border border-red-100">
                        <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" /> Errores Frecuentes
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-red-800">• Copiar y pegar volcados completos del DNI o base de datos en la herramienta.</li>
                            <li className="text-sm text-red-800">• Dar por bueno el texto de la IA sin leerlo. Recuerda tu responsabilidad procesal.</li>
                            <li className="text-sm text-red-800">• Añadir valoraciones subjetivas (ej: &quot;Estaba muy nervioso y parecía culpable&quot;).</li>
                        </ul>
                    </div>
                </div>
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
