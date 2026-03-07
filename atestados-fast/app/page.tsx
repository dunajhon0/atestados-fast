import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Sparkles, Zap, ShieldAlert, Layers } from 'lucide-react';
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
            {/* Hero Section */}
            <section className="relative pt-12 pb-12 md:pt-20 md:pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-brand-light to-brand-light">
                <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                    <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-dark tracking-tight mb-6">
                            Agiliza la redacción y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">enfócate en la calle</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Sistema organizativo formativo y herramientas para orientarte en la confección de atestados y diligencias. No oficial, rápido y 100% privado en tu navegador.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-2 sm:px-0">
                            <Button asChild size="lg" className="w-full sm:w-auto">
                                <Link href="/demo">
                                    <Sparkles className="h-5 w-5" />
                                    Probar motor de redacción
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                                <a href={gptUrl} target="_blank" rel="noopener noreferrer">
                                    <Bot className="h-5 w-5" />
                                    Abrir GPT Público
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Internal Search Tool (Integrated closely to Hero) */}
                    <div className="max-w-2xl w-full shadow-2xl shadow-brand-primary/10 rounded-3xl border border-slate-200 bg-white animate-in zoom-in-95 duration-700 delay-100 fill-mode-both">
                        <InternalSearch />
                    </div>
                </div>
            </section>

            {/* AdSense In-Article Top */}
            <section className="container mx-auto px-4 my-4 md:my-8 opacity-90 transition-opacity hover:opacity-100">
                <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ""} format="auto" />
            </section>

            {/* Cards Section */}
            <section className="py-12 md:py-16 bg-brand-light">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">

                        {/* Card 1 */}
                        <Card className="group bg-white border border-slate-200 hover:border-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />
                            <div className="h-16 w-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                                <Zap className="h-8 w-8 text-brand-primary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-4 text-2xl font-bold tracking-tight">Empieza en 60s</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Introduce los datos básicos de tu intervención y obtén una estructura jerárquica clara al instante.
                            </p>
                            <Button asChild variant="outline" className="w-full group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors">
                                <Link href="/como-funciona">
                                    Ver cómo funciona
                                    <ArrowRight className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </Button>
                        </Card>

                        {/* Card 2 */}
                        <Card className="group bg-white border border-slate-200 hover:border-brand-secondary/30 hover:shadow-2xl hover:shadow-brand-secondary/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-sm">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />
                            <div className="h-16 w-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                                <Layers className="h-8 w-8 text-brand-secondary" />
                            </div>
                            <CardTitle className="text-brand-dark mb-4 text-2xl font-bold tracking-tight">Qué Obtienes</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Un esqueleto base para tus diligencias y herramientas accesorias (turnos, índices, cronologías).
                            </p>
                            <Button asChild variant="outline" className="w-full group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-colors">
                                <Link href="/herramientas">
                                    Explorar herramientas
                                    <ArrowRight className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </Button>
                        </Card>

                        {/* Card 3 */}
                        <Card className="group bg-white border border-slate-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 text-left flex flex-col p-8 md:p-10 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />
                            <div className="h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                                <ShieldAlert className="h-8 w-8 text-red-500" />
                            </div>
                            <CardTitle className="text-brand-dark mb-4 text-2xl font-bold tracking-tight">Límites Rojos</CardTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow">
                                Atestados Fast es orientativo. NUNCA introduzcas datos personales (PII) reales en las herramientas.
                            </p>
                            <Button asChild variant="outline" className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                                <Link href="/buenas-practicas">
                                    Leer buenas prácticas
                                    <ArrowRight className="h-4 w-4 ml-2 opacity-70 group-hover:translate-x-1 transition-all" />
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
