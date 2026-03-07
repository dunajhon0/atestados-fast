"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";

export const navLinks = [
    { href: "/", label: "Portal" },
    { href: "/como-funciona", label: "Cómo Funciona" },
    { href: "/demo", label: "Demo" },
    { href: "/buenas-practicas", label: "Buenas Prácticas" },
    { href: "/plantillas", label: "Plantillas" },
    { href: "/herramientas", label: "Herramientas" },
    { href: "/recursos-oficiales", label: "Recursos" },
    { href: "/faq", label: "FAQ" },
    { href: "/sobre", label: "Sobre Nosotros" },
];

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleClose = () => setIsOpen(false);

    return (
        <nav className="fixed w-full bg-white/95 backdrop-blur-xl z-50 border-b border-slate-200/80 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex justify-between items-center">
                {/* Brand Logo Banner */}
                <Link href="/" className="flex items-center flex-shrink-0 group transition-transform hover:scale-[1.02]" onClick={handleClose}>
                    <Image
                        src="/logo.png"
                        alt="Atestados Fast Banner Logo"
                        width={380}
                        height={96}
                        className="object-contain object-left h-14 sm:h-16 lg:h-20 w-auto drop-shadow-sm"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center justify-end flex-grow ml-8">
                    <div className="flex items-center gap-4 2xl:gap-6 mr-6 2xl:mr-8 overflow-x-auto no-scrollbar">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[13px] 2xl:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${pathname === link.href
                                    ? "text-blue-600"
                                    : "text-slate-500 hover:text-blue-600"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Main CTA */}
                    <a
                        href={process.env.NEXT_PUBLIC_GPT_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                    >
                        Abrir GPT
                        <ExternalLink className="w-4 h-4 ml-1 opacity-90" />
                    </a>
                </div>

                {/* Mobile menu controls */}
                <div className="flex xl:hidden items-center gap-3">
                    <a
                        href={process.env.NEXT_PUBLIC_GPT_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white p-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors shadow-md shadow-blue-600/20"
                        aria-label="Abrir GPT"
                    >
                        <span className="text-xs sm:text-sm font-bold mr-2 hidden sm:block">GPT</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                        className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Alternar menú móvil"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="xl:hidden absolute top-20 lg:top-24 left-0 w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] bg-white border-t border-slate-100 overflow-y-auto">
                    <div className="flex flex-col p-4 gap-2 pb-24">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={handleClose}
                                className={`p-4 rounded-xl text-base font-semibold transition-colors ${pathname === link.href
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile legal links */}
                        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
                            <Link href="/legal#privacidad" onClick={handleClose} className="text-sm font-medium text-slate-500 p-3 text-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">Privacidad</Link>
                            <Link href="/legal#cookies" onClick={handleClose} className="text-sm font-medium text-slate-500 p-3 text-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">Cookies</Link>
                            <Link href="/legal#terminos" onClick={handleClose} className="col-span-2 text-sm font-medium text-slate-500 p-3 text-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">Términos de Uso / Aviso Legal</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
