'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: "¿Qué hace exactamente Atestados Fast?", a: "Es una herramienta web informativa que te enseña a redactar atestados de manera guiada y rápida utilizando una inteligencia artificial externa para ordenar la exposición cronológica y jurídica." },
    { q: "¿Es seguro utilizar la Inteligencia Artificial?", a: "Técnicamente el uso principal se hace en plataformas robustas como nuestro simulador de Front-End o un GPT oficial. Sin embargo, su seguridad jurídica recae en NO introducir jamás datos reales o procesales. Es imperativo sustituirlos por identificadores genéricos como 'Sujeto A' o '[DATOS OMITIDOS]'." },
    { q: "¿La web almacena mis borradores?", a: "No. En el demostrador visual simulado de esta web el proceso ocurre a nivel de navegador. Se elimina tan pronto se actualiza la pestaña y no poseemos infraestructura backend vinculada a base de datos." },
    { q: "¿Sustituye esta IA el trabajo de instrucción penal?", a: "Bajo ningún concepto. La instrucción, la valoración de pruebas, lecturas formales, interrogatorios y el atestado legal emanan exclusivamente de la autoridad competente. La IA es únicamente un apoyo taquigráfico y lingüístico." },
    { q: "¿Es una aplicación oficial del Ministerio?", a: "Absolutamente no. Es un desarrollo independiente que no guarda relación organizativa, laboral ni financiera con entidades corporativas, ministerios ni agrupaciones oficiales." },
    { q: "¿Qué pasa si la IA se inventa un suceso?", a: "Es lo que se conoce como 'alucinación'. Por este motivo, la regla dorada absoluta es la Revisión Humana inquebrantable integral antes de aprobar, firmar y elevar ninguna actuación procesal." },
    { q: "¿Cómo se financia esta iniciativa gratuita?", a: "Se mantiene operativamente gracias a la inserción de espacios publicitarios (banners de Google AdSense), los cuales se muestran siempre manteniendo el respeto, la pulcritud visual y en cumplimiento al consentimiento de cookies del propio usuario." },
    { q: "¿Hay opciones de contacto ante dudas sobre protección?", a: "Sí, puede encontrar en nuestro pie de página un enlace a políticas donde hay una vía de contacto para solventar dudas estrictamente ligadas con el funcionamiento de la web (no con asesoría penal)." }
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section id="faq" className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-brand-dark mb-10">Preguntas Frecuentes</h2>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden hover:border-brand-primary/50 transition-colors">
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:bg-slate-50"
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            >
                                <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-brand-primary' : ''}`} />
                            </button>
                            {openIdx === idx && (
                                <div className="px-6 pb-4 pt-1 bg-slate-50 text-slate-600 border-t border-slate-100">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
