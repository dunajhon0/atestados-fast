import { MessageSquare, ListChecks, FileEdit, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <MessageSquare className="w-8 h-8 text-brand-primary" />,
            title: "1. Relato y Hechos Principales",
            desc: "Inicia la conversación con el GPT explicando el tipo de intervención (p.ej.: alcoholemia, hurto, lesiones) de manera directa y coloquial."
        },
        {
            icon: <ListChecks className="w-8 h-8 text-brand-primary" />,
            title: "2. Preguntas Guiadas",
            desc: "La IA identificará omisiones legales importantes y te hará 2-3 preguntas clave (ubicación exacta, sintomatología, manifestaciones previas)."
        },
        {
            icon: <FileEdit className="w-8 h-8 text-brand-primary" />,
            title: "3. Borrador Estructurado",
            desc: "Recibe al instante un documento organizado con lenguaje técnico y jurídico, separando actuación, inspección ocular y derechos."
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-brand-accent" />,
            title: "4. Revisión y Exportación",
            desc: "Lee el borrador atentamente, corrige posibles alucinaciones y pégalo en tu procesador oficial sustituyendo los \"[DATOS]\" por los reales."
        }
    ];

    return (
        <section id="como-funciona" className="container mx-auto px-4 pt-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Un flujo de trabajo diseñado para agilizar tu labor</h2>
                <p className="text-slate-600 text-lg">
                    Olvídate del "síndrome del papel en blanco". Convierte notas rápidas del dispositivo de campo en una exposición de hechos sólida y profesional.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow relative group">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
