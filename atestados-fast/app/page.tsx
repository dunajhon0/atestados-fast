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
            <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tight mb-6">
                            Agiliza la redacción y enfócate en la calle
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Sistema organizativo formativo y herramientas para orientarte en la confección de atestados y diligencias. No oficial, rápido y 100% privado en el navegador.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                            <Button asChild size="lg" className="h-14 px-8 text-base">
                                <Link href="/demo">
                                    <Zap className="mr-2 h-5 w-5" />
                                    Probar Motor de Redacción
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-white">
                                <a href={gptUrl} target="_blank" rel="noopener noreferrer">
                                    Abrir GPT Público
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        {/* Internal Search Tool */}
                        <div className="max-w-2xl mx-auto w-full">
                            <InternalSearch />
                        </div>
                    </div>
                </div>
            </section>

            {/* AdSense In-Article Top */}
            <section className="container mx-auto px-4 my-8">
                <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ""} format="auto" />
            </section>

            {/* Cards Section */}
            <section className="py-20 bg-white border-y border-slate-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-brand-dark text-white border-brand-dark/20 text-center flex flex-col items-center p-8">
                            <Zap className="h-12 w-12 text-brand-primary mb-6" />
                            <CardTitle className="text-white mb-4">Empieza en 60s</CardTitle>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                                Introduce los datos básicos de tu intervención y obtén una estructura jerárquica clara al instante.
                            </p>
                            <Button asChild variant="primary" className="w-full">
                                <Link href="/como-funciona">Ver Cómo Funciona</Link>
                            </Button>
                        </Card>

                        <Card className="text-center flex flex-col items-center p-8 border-slate-200">
                            <Target className="h-12 w-12 text-blue-500 mb-6" />
                            <CardTitle className="mb-4">Qué Obtienes</CardTitle>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Un esqueleto base para tus diligencias y herramientas accesorias (turnos, índices, cronologías) útiles para todo el ciclo de trabajo.
                            </p>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/herramientas">Explorar Herramientas</Link>
                            </Button>
                        </Card>

                        <Card className="bg-red-50 text-center flex flex-col items-center p-8 border-red-100">
                            <Shield className="h-12 w-12 text-red-500 mb-6" />
                            <CardTitle className="mb-4 text-red-900">Límites Rojos</CardTitle>
                            <p className="text-red-700/80 text-sm leading-relaxed mb-6 flex-grow">
                                Atestados Fast es orientativo y no oficial. NUNCA introduzcas datos personales (PII) reales en las herramientas ni en los simuladores.
                            </p>
                            <Button asChild variant="outline" className="w-full border-red-200 hover:bg-red-100 text-red-700">
                                <Link href="/buenas-practicas">Leer Buenas Prácticas</Link>
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
