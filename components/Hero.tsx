import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
    const gptUrl = process.env.NEXT_PUBLIC_GPT_URL || '#';

    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-full bg-brand-dark -z-10 rounded-b-[4rem] md:rounded-b-[8rem]" />

            <div className="container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-light text-sm font-medium mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-brand-accent"></span>
                    Inteligencia Artificial para instructores
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto">
                    Simplifica la redacción de tus diligencias judiciales con <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">precisión</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Guía interactiva basada en IA para obtener borradores bien estructurados. Narra de manera coherente, profesional y ahorra hasta un 40% del tiempo de redacción en oficina.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <a
                        href="#demo"
                        className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-primary/50"
                    >
                        Probar motor de estructuración
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href="#como-funciona"
                        className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                        <FileText className="w-5 h-5" />
                        Ver cómo funciona
                    </a>
                </div>

                <p className="text-sm text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-2">
                    <span className="block border border-slate-600 rounded p-0.5 text-[0.6rem] font-mono leading-none">⚠️</span>
                    Recuerda: Uso responsable. Toda IA requiere revisión humana exhaustiva. No incluyas datos reales sensibles.
                </p>
            </div>
        </section>
    );
}
