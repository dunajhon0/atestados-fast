"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";

export default function SiteFooter() {
    return (
        <footer className="bg-brand-dark pt-16 pb-8 border-t border-slate-800 text-slate-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand & Disclaimer */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4 transition-transform hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Atestados Fast Logo"
                                width={180}
                                height={54}
                                className="object-contain h-10 sm:h-12 w-auto brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-sm max-w-sm mb-6 leading-relaxed text-slate-400">
                            Iniciativa para agilizar la redacción estructurada. No oficial. Herramienta orientativa basada en Inteligencia Artificial y utilidades locales para uso responsable por agentes.
                        </p>
                    </div>

                    {/* Navigation Map */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Secciones Clave</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/demo" className="hover:text-white transition-colors">Motor de Redacción</Link></li>
                            <li><Link href="/buenas-practicas" className="hover:text-white transition-colors">Buenas Prácticas</Link></li>
                            <li><Link href="/plantillas" className="hover:text-white transition-colors">Plantillas Base</Link></li>
                            <li><Link href="/herramientas" className="hover:text-white transition-colors">Herramientas Extra</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Legal Hub */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Jurídico y Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/legal#privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/legal#cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
                            <li><Link href="/legal#terminos" className="hover:text-white transition-colors">Términos de Uso / Aviso Legal</Link></li>
                            <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre el Proyecto</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        Atestados Fast {new Date().getFullYear()}. Todos los derechos reservados.<br />
                        El uso publicitario (AdSense) financia el servidor.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
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
