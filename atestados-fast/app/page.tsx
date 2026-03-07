'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, ShieldCheck, Layers, Info, Wrench, BookOpen, Rocket, MessageSquareText, Timer, Package, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { InternalSearch } from '@/components/tools/InternalSearch';
import AdSlot from '@/components/AdSlot';

export default function Home() {
    const gptUrl = process.env.NEXT_PUBLIC_GPT_URL || "#";

    return (
        <div className="min-h-screen bg-[#020203] text-slate-300 selection:bg-blue-500/30 selection:text-blue-200">
            {/* Scanline Animation Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                <div className="scanline"></div>
            </div>

            {/* Strategic Atmosphere: Layered Background */}
            <div className="fixed inset-0 z-0">
                {/* Glow Central */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
                {/* Tactical Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[bottom_1px_center] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            {/* Hero Section: The Tactical Command Hub */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden z-10">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-pulse">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Plataforma táctica de alto rendimiento</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8">
                            REDACCIÓN POLICIAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">SIN FRICCIÓN</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            El estándar de oro para el agente moderno. <span className="text-slate-200">Privacidad absoluta en local</span>, velocidad algorítmica y rigor procesal en cada hito.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 mb-16 w-full px-4 sm:px-0 max-w-3xl mx-auto">
                            <Link href="/demo" className="flex-1">
                                <Button variant="ultra-contrast" size="xl" className="w-full group relative overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                                    <div className="flex items-center justify-center gap-3 relative z-10 px-2">
                                        <Rocket className="h-6 w-6 fill-current" />
                                        <span>Iniciar Redactor</span>
                                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                </Button>
                            </Link>

                            <a href={gptUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" size="xl" className="w-full group transition-all backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-3">
                                        <MessageSquareText className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <span className="opacity-70 group-hover:opacity-100 transition-opacity">Consola GPT Pública</span>
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Integrated Search Console */}
                    <div className="max-w-3xl w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-black/40 backdrop-blur-xl rounded-[28px] border border-white/10 p-2 shadow-2xl">
                            <InternalSearch />
                        </div>
                        {/* Quick Action Chips */}
                        <div className="flex flex-wrap justify-center gap-2 mt-6 animate-in fade-in duration-1000 delay-500">
                            {['/Plantillas', '/Cronología', '/Leyes', '/Checklist'].map((chip) => (
                                <button key={chip} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-slate-500 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all uppercase tracking-widest">
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AdSense In-Article Top */}
            <section className="container mx-auto px-4 my-8 md:my-12 relative z-10">
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 text-center">
                    <span className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.3em] mb-4 block">Contenido Patrocinado</span>
                    <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ""} format="auto" />
                </div>
            </section>

            {/* Operational Modules: Glassmorphism Grid */}
            <section className="pb-24 pt-8 relative z-10 w-full overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Module 1: Time */}
                        <div className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] p-10 transition-all hover:bg-white/[0.03] hover:border-blue-500/20 hover:-translate-y-2">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Timer className="w-32 h-32 text-blue-500" />
                            </div>
                            <div className="h-16 w-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-8">
                                <Timer className="h-8 w-8 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-blue-400 transition-colors">Empieza en <span className="block text-blue-500">60 segundos.</span></h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                                Ingesta de datos eficiente. Estructura el relato fáctico mientras los hechos están frescos.
                            </p>
                            <Link href="/como-funciona" className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                                Explorar Flujo <ArrowRight className="w-4 h-4 text-blue-500" />
                            </Link>
                        </div>

                        {/* Module 2: Tools */}
                        <div className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] p-10 transition-all hover:bg-white/[0.03] hover:border-emerald-500/20 hover:-translate-y-2">
                            <div className="h-16 w-16 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-8">
                                <Package className="h-8 w-8 text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-emerald-400 transition-colors">Arsenal <span className="block text-emerald-500">Operativo.</span></h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                                Del generador de minutas al sastre de diligencias. Todo lo que necesitas en un solo hub.
                            </p>
                            <Link href="/herramientas" className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                                Ver Equipamiento <ArrowRight className="w-4 h-4 text-emerald-500" />
                            </Link>
                        </div>

                        {/* Module 3: Security */}
                        <div className="group relative bg-white/[0.01] border border-white/5 rounded-[40px] p-10 transition-all hover:bg-white/[0.03] hover:border-rose-500/20 hover:-translate-y-2">
                            <div className="h-16 w-16 rounded-2xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center mb-8">
                                <ShieldAlert className="h-8 w-8 text-rose-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-none group-hover:text-rose-400 transition-colors">Límites <span className="block text-rose-500">Críticos.</span></h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-medium">
                                Seguridad de datos y buenas prácticas. Garantiza la integridad jurídica de tu trabajo diario.
                            </p>
                            <Link href="/buenas-practicas" className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                                Protocolo <ArrowRight className="w-4 h-4 text-rose-500" />
                            </Link>
                        </div>

                    </div>

                    {/* Bottom Branding / Trust line */}
                    <div className="mt-24 border-t border-white/5 pt-12 text-center overflow-hidden">
                        <div className="flex justify-center items-center gap-12 grayscale opacity-20 pointer-events-none select-none">
                            <span className="text-4xl font-black tracking-[0.5em] text-white">ATESTADOS FAST</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* AdSense Footer */}
            <section className="container mx-auto px-4 my-12 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8">
                    <AdSlot clientId="ca-pub-3779816940145698" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE || ""} format="fluid" layoutKey="-gw-1+2a-9x+5c" />
                </div>
            </section>

            <style jsx>{`
                .scanline {
                    width: 100%;
                    height: 2px;
                    background: rgba(59, 130, 246, 0.03);
                    position: absolute;
                    top: 0;
                    left: 0;
                    animation: scanline 8s linear infinite;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
                }

                @keyframes scanline {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }

                :global(.selection\:bg-blue-500\/30::selection) {
                    background-color: rgba(59, 130, 246, 0.3) !important;
                }
            `}</style>
        </div>
    );
}
