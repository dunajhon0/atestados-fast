import { Metadata } from 'next';
import BestPractices from '@/components/BestPractices';
import { TrafficLightGuide } from '@/components/tools/TrafficLightGuide';
import { ToolLayout } from '@/components/layout/ToolLayout';

export const metadata: Metadata = {
    title: 'Buenas Prácticas | Atestados Fast',
    description: 'Guía de revisión humana y semáforo del instructor: coherencia, derechos de los detenidos y custodia judicial.',
};

export default function BuenasPracticasPage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    De Agente a Instructor
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Un buen atestado no solo debe estar bien estructurado con inteligencia artificial; debe ser pulcro procedimentalmente hablando.
                </p>
            </div>

            <ToolLayout
                title="Semáforo del Instructor"
                description="Evalúa rápidamente si el enfoque de tu redacción está en Verde (Correcto) o en Rojo (Riesgo procesal). Evita juicios de valor y afirmaciones sin base probatoria."
            >
                <TrafficLightGuide />
            </ToolLayout>

            <div className="container mx-auto px-4 mb-20">
                {/* Reuse the old BestPractices content, adapted */}
                <BestPractices />
            </div>
        </div>
    );
}
