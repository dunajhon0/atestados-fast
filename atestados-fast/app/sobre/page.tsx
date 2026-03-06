import { Metadata } from 'next';
import { ChangelogTool } from '@/components/tools/ChangelogTool';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ShieldAlert, Heart, Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sobre el Proyecto | Atestados Fast',
    description: 'Conoce más sobre la misión, transparencia y sistema de financiación independiente de la iniciativa Atestados Fast.',
};

export default function SobrePage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Sobre Atestados Fast
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Una iniciativa independiente nacida para reducir la fricción burocrática policial.
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-4xl mb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                        <Heart className="w-8 h-8 mx-auto text-brand-primary mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Para Agentes Reales</h3>
                        <p className="text-sm text-slate-600">Creado pensando en los patrulleros que necesitan estructurar datos rápidamente sin ser expertos en lenguaje procesal.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                        <ShieldAlert className="w-8 h-8 mx-auto text-amber-500 mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">No Oficial</h3>
                        <p className="text-sm text-slate-600">Este proyecto no está vinculado a la DGP, Guardia Civil ni Policías Locales. Es una herramienta de refuerzo formativo y orientativo.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                        <Activity className="w-8 h-8 mx-auto text-emerald-500 mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Financiación Abierta</h3>
                        <p className="text-sm text-slate-600">El servidor se mantiene gracias a los espacios publicitarios (AdSense) no intrusivos en las páginas informativas.</p>
                    </div>
                </div>

                <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Contacto Orgánico</h2>
                    <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                        Si tienes una idea constructiva, encuentras un error o quieres proponer un modelo base que ayude a otros compañeros, escríbenos (no recabamos datos, minimización total).
                    </p>
                    <a href="mailto:contacto@dunajhon.com" className="inline-flex items-center justify-center font-medium bg-brand-primary text-white hover:bg-brand-secondary h-11 px-8 rounded-lg transition-colors">
                        Enviar Sugerencia por Email
                    </a>
                </div>
            </div>

            <ToolLayout
                title="Historial de Transparencia (Changelog)"
                description="Nos gusta dejar claro cómo evoluciona la herramienta. Aquí puedes ver de forma transparente las versiones y las decisiones tomadas para la plataforma."
            >
                <ChangelogTool />
            </ToolLayout>

        </div>
    );
}
