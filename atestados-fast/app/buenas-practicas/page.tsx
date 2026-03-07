import { Metadata } from 'next';
import BestPractices from '@/components/BestPractices';
import { TrafficLightGuide } from '@/components/tools/TrafficLightGuide';
import { TerminalSquare, ShieldCheck, Cpu } from 'lucide-react';
// Note: ToolLayout is no longer needed since we are integrating the components raw for maximum layout control

export const metadata: Metadata = {
    title: 'Buenas Prácticas | Atestados Fast',
    description: 'Guía de revisión humana y semáforo del instructor: coherencia, derechos de los detenidos y custodia judicial.',
};

export default function BuenasPracticasPage() {
    return (
        <div className="min-h-screen bg-[#09090B] relative overflow-hidden flex flex-col items-center selection:bg-blue-500/30 selection:text-blue-200">
            {/* Background Architecture */}
            <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
                {/* Tactical Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_20%,transparent_100%)]"></div>
                {/* Ambient Radial Lights */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow"></div>
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-24 relative z-10">

                {/* Hero Section */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                        <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">Centro de Mando Protocolar</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-6 drop-shadow-sm">
                        Excelencia Operativa.<br className="hidden md:block" /> Cero Margen de Error.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Valida automáticamente la integridad procesal de tu atestado. Desciende a la arena y asegura el caso de <span className="text-white">Agente a Instructor</span> en 4 barreras de seguridad críticas.
                    </p>

                    {/* Primary CTA Action */}
                    <a
                        href="#semaforo-engine"
                        className="mt-10 group relative inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        <Cpu className="w-5 h-5" />
                        Iniciar Protocolo de Revisión
                    </a>
                </div>

                {/* Engine Separator */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-24 opacity-50"></div>

                {/* Interactive Tool 1: Traffic Light Engine */}
                <div id="semaforo-engine" className="scroll-mt-32">
                    <div className="mb-10 lg:mb-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <TerminalSquare className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Semáforo del Instructor</h2>
                        </div>
                        <p className="text-slate-400 max-w-3xl leading-relaxed">
                            Terminal comparativo vivo. Evalúa de un vistazo si el tono de la redacción protege la cadena de custodia probatoria o genera un riesgo judicial innecesario.
                        </p>
                    </div>

                    <div className="relative">
                        {/* the glow behind the component */}
                        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] -z-10 rounded-[3rem]"></div>
                        <TrafficLightGuide />
                    </div>
                </div>

                {/* Section Separator */}
                <div className="w-full flex justify-center my-32">
                    <div className="h-24 w-px bg-gradient-to-b from-slate-800 to-transparent"></div>
                </div>

                {/* Interactive Tool 2: The Logic Engine Checklist */}
                <div className="pb-10">
                    <div className="mb-10 lg:mb-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <ShieldCheck className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Control de Seguridad Final</h2>
                        </div>
                        <p className="text-slate-400 max-w-3xl leading-relaxed">
                            No exportes hasta haber superado las 4 reglas inmutables. Pulsa sobre cada bloque para confirmar la pureza procesal del borrador generado.
                        </p>
                    </div>

                    <BestPractices />
                </div>

            </div>
        </div>
    );
}
