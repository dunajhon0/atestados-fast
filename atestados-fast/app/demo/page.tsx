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
        <div className="pb-16 pt-8">
            {/* Tool 1: Pre-chequeo Anonimización */}
            <ToolLayout
                title="Escudo de Anonimización (Pre-chequeo)"
                description="Pega tu texto bruto aquí antes de meterlo al motor. Esta utilidad local cambiará automáticamente los formatos típicos de DNI, teléfono y matrículas por etiquetas genéricas como [DNI], evitando fugas accidentales antes de redactar."
            >
                <AnonymizerTool />
            </ToolLayout>

            {/* Main Demo Simulator */}
            <div className="container mx-auto px-4 max-w-6xl mt-12 mb-8">
                <header className="mb-8 text-center">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
                        Motor de Redacción Principal
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Introduce los datos del hecho. Este entorno es idéntico a las instrucciones que procesan los borradores. Recuerda: <strong>Todo lo que escribas hoy debe ser ficticio.</strong>
                    </p>
                </header>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 py-12 shadow-inner">
                <DemoSimulator />
            </div>

        </div>
    );
}
