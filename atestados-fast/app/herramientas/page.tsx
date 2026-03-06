import { Metadata } from 'next';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ShiftManager } from '@/components/tools/ShiftManager';
import { IndexGenerator } from '@/components/tools/IndexGenerator';

export const metadata: Metadata = {
    title: 'Herramientas Extra | Atestados Fast',
    description: 'Gestor de turnos ICS, generador de índices de diligencias y otras utilidades gratuitas para el trabajo diario.',
};

export default function HerramientasPage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Herramientas Extra
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Más allá del atestado, tu trabajo diario requiere organización. Aquí tienes herramientas creadas específicamente para ahorrarte tiempo orgánico.
                </p>
            </div>

            <ToolLayout
                title="1. Gestor de Turnos y Cuadrantes"
                description="Genera el calendario de trabajo de todo tu año basado en tu patrón (ej: MMTTNNLL...). Exporta un archivo .ICS para sincronizarlo con Google Calendar, Outlook o Apple, gratis y sin registrarte."
            >
                <ShiftManager />
            </ToolLayout>

            <div className="my-16" />

            <ToolLayout
                title="2. Generador Rápido de Índices"
                description="Marca las diligencias que componen tu atestado y obtén un índice numerado al instante para la carátula o el cierre del documento."
            >
                <IndexGenerator />
            </ToolLayout>

            {/* Roadmap Section */}
            <div className="container mx-auto px-4 max-w-4xl mt-24 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Roadmap de Próximas Herramientas</h2>
                <div className="grid md:grid-cols-2 gap-6 opacity-75">
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded">PRÓXIMAMENTE</div>
                        <h3 className="font-bold text-slate-800 mb-2 mt-4">Calculadora de Plazos de Detención</h3>
                        <p className="text-sm text-slate-600">Herramienta para calcular las 72 horas legales y los tiempos máximos permitidos.</p>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded">PRÓXIMAMENTE</div>
                        <h3 className="font-bold text-slate-800 mb-2 mt-4">Buscador Ágil de Códigos Penales</h3>
                        <p className="text-sm text-slate-600">Filtro rápido para buscar delitos y sus artículos vinculados sin depender de guías pesadas en PDF.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
