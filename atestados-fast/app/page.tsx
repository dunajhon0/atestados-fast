import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Target, Shield, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
            {/* Hero Section */}
            <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden bg-brand-light">
                <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-brand-dark tracking-tight mb-6">
                            Agiliza la redacción y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">enfócate en la calle</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Sistema organizativo formativo y herramientas para orientarte en la confección de atestados y diligencias. No oficial, rápido y 100% privado en tu navegador.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-2 sm:px-0">
                            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                                <Link href="/demo">
                                    <Zap className="mr-2 h-5 w-5" />
                                    Probar Motor de Redacción
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                                <a href={gptUrl} target="_blank" rel="noopener noreferrer">
                                    Abrir GPT Público
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* Internal Search Tool */}
                        <div className="max-w-2xl mx-auto w-full shadow-2xl shadow-slate-200/50 rounded-2xl border border-slate-100 bg-white">
                            <InternalSearch />
                        </div>
                    </div>
                </div>
            </section>

            {/* AdSense In-Article Top */}
            <section className="container mx-auto px-4 my-4 md:my-8 opacity-90 transition-opacity hover:opacity-100">
                <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ""} format="auto" />
            </section>

            {/* Cards Section */}
            <section className="py-16 md:py-24 bg-brand-light">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">

                        <Card className="group bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-2xl">
                            <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-transform duration-300">
                                <Zap className="h-7 w-7 text-brand-primary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-xl">Empieza en 60s</CardTitle>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                Introduce los datos básicos de tu intervención y obtén una estructura jerárquica clara al instante.
                            </p>
                            <Link href="/como-funciona" className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
                                Ver Cómo Funciona
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Card>

                        <Card className="group bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-2xl shadow-sm">
                            <div className="h-14 w-14 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-transform duration-300">
                                <Target className="h-7 w-7 text-brand-secondary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-xl">Qué Obtienes</CardTitle>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                Un esqueleto base para tus diligencias y herramientas accesorias (turnos, índices, cronologías) útiles para todo el ciclo de trabajo.
                            </p>
                            <Link href="/herramientas" className="inline-flex items-center text-sm font-semibold text-brand-secondary hover:text-purple-700 transition-colors">
                                Explorar Herramientas
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Card>

                        <Card className="group bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-2xl">
                            <div className="h-14 w-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-100 transition-transform duration-300">
                                <Shield className="h-7 w-7 text-red-500" />
                            </div>
                            <CardTitle className="text-brand-dark mb-3 text-xl">Límites Rojos</CardTitle>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                Atestados Fast es orientativo. NUNCA introduzcas datos personales (PII) reales en las herramientas ni en los simuladores.
                            </p>
                            <Link href="/buenas-practicas" className="inline-flex items-center text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                                Leer Buenas Prácticas
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
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
