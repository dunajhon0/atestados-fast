import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { FaqDiagnosticWizard } from '@/components/tools/FaqDiagnosticWizard';

export const metadata: Metadata = {
    title: 'Preguntas Frecuentes | Atestados Fast',
    description: 'Resuelve todas tus dudas acerca del uso seguro, funcionamiento y compatibilidad de Atestados Fast.',
};

export default function FaqPage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Preguntas Frecuentes
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Todo lo que necesitas saber sobre la seguridad, privacidad y operatividad de nuestra plataforma.
                </p>
            </div>

            <ToolLayout
                title="Diagnóstico Rápido de Riesgo"
                description="Si es tu primera vez usando la IA para redactar un atestado, responde a estas 3 breves preguntas para saber si tu planteamiento es seguro procesalmente."
            >
                <FaqDiagnosticWizard />
            </ToolLayout>

            <div className="container mx-auto px-4 mt-16 mb-20 max-w-4xl">
                <FAQ />
            </div>
        </div>
    );
}
