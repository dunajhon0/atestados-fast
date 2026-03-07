'use client';

import DemoSimulator from '@/components/DemoSimulator';

export default function DemoPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* NEW: Aurora Dynamic Background (Senior UI) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[30%] bg-blue-400/5 blur-[80px] rounded-full animate-pulse-slow delay-700"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:40px_40px]"></div>
            </div>

            <div className="relative z-10 pb-16 pt-20">
                {/* Main Demo Simulator Header */}
                <div className="container mx-auto px-4 max-w-6xl mb-16">
                    <header className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.2em] mb-8 border border-blue-500/20 uppercase">
                            Operational Redactor Pro
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.95]">
                            Estructurador de <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">Diligencias Tácticas</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                            Máxima precisión en el mapeo de hechos. Estructura relatos operativos con rigor profesional y temporalidad exacta.
                        </p>
                    </header>
                </div>

                <div>
                    <DemoSimulator />
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-float { animation: float 12s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .animate-pulse-slow, .animate-float { animation: none !important; }
                }
            `}</style>
        </div>
    );
}
