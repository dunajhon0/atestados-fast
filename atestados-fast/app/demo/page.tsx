import { Metadata } from 'next';
import DemoSimulator from '@/components/DemoSimulator';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { AnonymizerTool } from '@/components/tools/AnonymizerTool';

export const metadata: Metadata = {
    title: 'Demo y Simulador | Atestados Fast',
    description: 'Motor de redacción interactivo para la estructuración de atestados policiales. Pruébalo en vivo con datos ficticios.',
};

export default function DemoPage() {
    return (
        <div className="pb-16 pt-12">
            {/* Main Demo Simulator Header */}
            <div className="container mx-auto px-4 max-w-6xl mb-12">
                <header className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 border border-blue-500/20 tracking-widest uppercase">
                        Motor de Estructuración Pro
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        El Redactor Inteligente
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Transforma relatos crudos en borradores policiales técnicos con rigor jurídico.
                        Este simulador aplica nuestra tecnología de mapeo de datos 100% local.
                    </p>
                </header>
            </div>

            <div className="relative z-10">
                <DemoSimulator />
            </div>
        </div>
    );
}
