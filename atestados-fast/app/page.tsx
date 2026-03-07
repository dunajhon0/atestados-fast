import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, ShieldCheck, Layers, Info, Wrench, BookOpen, Rocket, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { InternalSearch } from '@/components/tools/InternalSearch';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
    title: 'Atestados Fast | Hub Central de Redacción Policial',
    description: 'Herramientas interactivas y guías prácticas para la redacción de atestados policiales. Segura, rápida y optimizada para uso responsable.',
};

export default function Home() {
    const gptUrl = process.env.NEXT_PUBLIC_GPT_URL || "#";

    return (
        <>
            {/* Hero Section V3 */}
            <section className="relative pt-12 pb-8 md:pt-20 md:pb-12 overflow-hidden bg-[linear-gradient(180deg,_#EEF2FF_0%,_#F8FAFC_40%,_#FFFFFF_100%)]">
                <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark tracking-tight mb-6">
                            Agiliza la redacción y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">enfócate en la calle</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                            El sistema organizativo para confeccionar atestados y diligencias. Rápido, no oficial y 100% privado en tu navegador.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mb-10 w-full px-2 sm:px-0 max-w-2xl mx-auto">
                            <Link href="/demo" className="flex-1">
                                <Button size="lg" className="w-full h-14 sm:h-[64px] text-lg rounded-[16px] group relative overflow-hidden transition-all bg-slate-900 border border-slate-700 text-white shadow-2xl shadow-slate-900/30 hover:bg-slate-800 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <div className="flex items-center justify-center gap-3 relative z-10 px-2 lg:px-4">
                                        <div className="bg-white/10 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                                            <Rocket className="h-5 w-5" />
                                        </div>
                                        <span className="font-bold tracking-wide">Redactar Ahora</span>
                                        <ArrowRight className="h-5 w-5 opacity-70 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </Button>
                            </Link>

                            <a href={gptUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" size="lg" className="w-full h-14 sm:h-[64px] text-lg rounded-[16px] group border-slate-200 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md hover:border-slate-300 transition-all hover:-translate-y-1">
                                    <div className="flex items-center justify-center gap-3 px-2 lg:px-4">
                                        <div className="bg-slate-100 p-2 rounded-xl text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900 transition-colors">
                                            <MessageSquareText className="h-5 w-5" />
                                        </div>
                                        <span className="font-bold text-slate-700 tracking-wide group-hover:text-slate-900 transition-colors">Abrir GPT Público</span>
                                        <ArrowRight className="h-5 w-5 text-slate-400 opacity-80 group-hover:translate-x-1.5 group-hover:text-slate-900 transition-all" />
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Internal Search Tool (Integrated closely to Hero) */}
                    <div className="max-w-2xl w-full shadow-2xl shadow-brand-primary/5 rounded-[18px] border border-slate-200/60 bg-white/95 backdrop-blur-md animate-in zoom-in-95 duration-700 delay-100 fill-mode-both">
                        <InternalSearch />
                    </div>
                </div>
            </section>

            {/* AdSense In-Article Top */}
            <section className="container mx-auto px-4 my-4 md:my-8 opacity-90 transition-opacity hover:opacity-100">
                <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ""} format="auto" />
            </section>

            {/* Cards Section (Redesigned completely) */}
            <section className="pb-12 pt-2 md:pt-6 md:pb-16 bg-white relative z-10 w-full">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">

                        {/* Card 1 */}
                        <div className="group bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px]">
                            {/* Icon Container */}
                            <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-100 transition-colors">
                                <Zap className="h-6 w-6 text-blue-500" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Empieza en 60s</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                Introduce los datos básicos de tu intervención y obtén una estructura jerárquica clara al instante.
                            </p>

                            {/* Button */}
                            <Link href="/como-funciona" className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-blue-50 text-blue-700 font-semibold rounded-[12px] transition-all hover:bg-blue-600 hover:text-white hover:shadow-md">
                                <Info className="h-5 w-5" />
                                Ver cómo funciona
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px]">
                            {/* Icon Container */}
                            <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-100 transition-colors">
                                <Layers className="h-6 w-6 text-slate-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Qué Obtienes</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                Un esqueleto base para tus diligencias y herramientas accesorias útiles para todo el ciclo de trabajo.
                            </p>

                            {/* Button */}
                            <Link href="/herramientas" className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-slate-50 text-slate-700 font-semibold rounded-[12px] transition-all hover:bg-slate-800 hover:text-white hover:shadow-md">
                                <Wrench className="h-5 w-5" />
                                Explorar herramientas
                            </Link>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px]">
                            {/* Icon Container */}
                            <div className="h-14 w-14 rounded-full bg-purple-50 flex items-center justify-center mb-8 shadow-sm group-hover:bg-purple-100 transition-colors">
                                <ShieldCheck className="h-6 w-6 text-purple-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Límites Rojos</h3>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                Atestados Fast es orientativo. NUNCA introduzcas datos personales (PII) reales en las herramientas.
                            </p>

                            {/* Button */}
                            <Link href="/buenas-practicas" className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-purple-50 text-purple-700 font-semibold rounded-[12px] transition-all hover:bg-purple-600 hover:text-white hover:shadow-md">
                                <BookOpen className="h-5 w-5" />
                                Leer buenas prácticas
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* AdSense Footer */}
            <section className="container mx-auto px-4 my-8 pb-12">
                <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE || ""} format="fluid" layoutKey="-gw-1+2a-9x+5c" />
            </section>

        </>
    );
}
