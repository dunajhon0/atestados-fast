'use client';

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function Footer() {
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@atestadosfast.com';
    const gptUrl = process.env.NEXT_PUBLIC_GPT_URL || '#';

    return (
        <footer className="bg-brand-dark pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    <div className="md:col-span-2">
                        <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                            <ShieldAlert className="text-brand-primary w-6 h-6" />
                            Atestados Fast
                        </h3>
                        <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
                            Iniciativa para agilizar la redacción estructurada. No oficial. Operativo independiente y herramienta orientativa basada en Inteligencia Artificial externa para uso responsable por agentes.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Jurídico y Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Términos de Uso / Aviso Legal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Contacto</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">Email: {email}</a></li>
                            <li className="pt-4">
                                <a href={gptUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors border border-slate-700">
                                    Acceder a GPT
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Atestados Fast. Todos los derechos reservados. Proyecto puramente formativo e informativo.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            // Trigger cookie preferences - will be handled by ConsentManager event listener
                            window.dispatchEvent(new CustomEvent('show-cookie-preferences'));
                        }}
                        className="text-xs text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4"
                    >
                        Configurar Cookies
                    </button>
                </div>
            </div>
        </footer>
    );
}
