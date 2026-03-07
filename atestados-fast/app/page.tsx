import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, ShieldCheck, Layers, Info, Wrench, BookOpen, Wand2, Cpu } from 'lucide-react';
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
                                <Button size="lg" className="w-full h-14 sm:h-[64px] text-lg rounded-full group relative overflow-hidden transition-all bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <div className="flex items-center justify-center gap-2.5 relative z-10 px-2 lg:px-4">
                                        <Wand2 className="h-5 w-5 text-blue-100 group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="font-semibold tracking-wide">Probar motor de redacción</span>
                                        <ArrowRight className="h-5 w-5 opacity-80 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </Button>
                            </Link>

                            <a href={gptUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" size="lg" className="w-full h-14 sm:h-[64px] text-lg rounded-full group border-slate-200 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md hover:border-slate-300 transition-all hover:-translate-y-1">
                                    <div className="flex items-center justify-center gap-2.5 px-2 lg:px-4">
                                        <Cpu className="h-5 w-5 text-slate-500 group-hover:text-indigo-500 transition-colors duration-300" />
                                        <span className="font-semibold text-slate-700 tracking-wide group-hover:text-slate-900 transition-colors">Abrir GPT Público</span>
                                        <ArrowRight className="h-5 w-5 text-slate-400 opacity-80 group-hover:translate-x-1.5 group-hover:text-slate-600 transition-all" />
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

            {/* Cards Section V3 */}
            <section className="py-8 md:py-12 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">

                        {/* Card 1 */}
                        <Card className="group bg-white border border-slate-200 hover:border-brand-primary/40 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px] relative overflow-hidden">
                            <div className="h-16 w-16 rounded-full bg-blue-50/80 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm transition-transform duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                                <Zap className="h-8 w-8 text-brand-primary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-2xl font-bold tracking-tight">Empieza en 60s</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Introduce los datos básicos de tu intervención y obtén una estructura jerárquica clara al instante.
                            </p>
                            <Button asChild variant="outline" size="md" className="w-full rounded-[12px] group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors">
                                <Link href="/como-funciona">
                                    <Info className="h-4 w-4" />
                                    Ver cómo funciona
                                </Link>
                            </Button>
                        </Card>

                        {/* Card 2 */}
                        <Card className="group bg-white border border-slate-200 hover:border-brand-secondary/40 hover:shadow-2xl hover:shadow-brand-secondary/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px] relative overflow-hidden shadow-sm">
                            <div className="h-16 w-16 rounded-full bg-purple-50/80 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm transition-transform duration-300 group-hover:bg-purple-100 group-hover:scale-110">
                                <Layers className="h-8 w-8 text-brand-secondary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-2xl font-bold tracking-tight">Qué Obtienes</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Un esqueleto base para tus diligencias y herramientas accesorias útiles para todo el ciclo de trabajo.
                            </p>
                            <Button asChild variant="outline" size="md" className="w-full rounded-[12px] group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-colors">
                                <Link href="/herramientas">
                                    <Wrench className="h-4 w-4" />
                                    Explorar herramientas
                                </Link>
                            </Button>
                        </Card>

                        {/* Card 3 */}
                        <Card className="group bg-white border border-slate-200 hover:border-red-300 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-[18px] relative overflow-hidden">
                            <div className="h-16 w-16 rounded-full bg-red-50/80 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm transition-transform duration-300 group-hover:bg-red-100 group-hover:scale-110">
                                <ShieldCheck className="h-8 w-8 text-red-500" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-2xl font-bold tracking-tight">Límites Rojos</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Atestados Fast es orientativo. NUNCA introduzcas datos personales (PII) reales en las herramientas.
                            </p>
                            <Button asChild variant="outline" size="md" className="w-full rounded-[12px] hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors">
                                <Link href="/buenas-practicas">
                                    <BookOpen className="h-4 w-4" />
                                    Leer buenas prácticas
                                </Link>
                            </Button>
                        </Card>

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
