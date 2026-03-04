'use client';

import { useState } from 'react';
import { ExternalLink, Copy, Check, MessageSquare } from 'lucide-react';

export default function GptPublicCta() {
    const [copied, setCopied] = useState(false);
    const gptUrl = process.env.NEXT_PUBLIC_GPT_PUBLIC_URL || '#';

    const handleCopy = () => {
        navigator.clipboard.writeText(gptUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="gpt-publico" className="bg-brand-dark py-20 text-white scroll-mt-20">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                    <MessageSquare className="w-8 h-8 text-brand-primary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Redacta mejor y más rápido</h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    Utiliza nuestro asistente basado en IA para transformar tus notas rápidas en borradores estructurados, con el tono adecuado y listos para ser revisados.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={gptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                    >
                        Abrir GPT público <ExternalLink className="w-5 h-5" />
                    </a>
                    <button
                        onClick={handleCopy}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5" /> ¡Enlace copiado!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" /> Copiar enlace
                            </>
                        )}
                    </button>
                </div>

                <p className="mt-8 text-sm text-slate-400">
                    Requiere cuenta en ChatGPT (gratuita o Plus). Ningún dato se guarda en nuestros servidores.
                </p>
            </div>
        </section>
    );
}
