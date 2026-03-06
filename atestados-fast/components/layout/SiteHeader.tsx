"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, ExternalLink } from "lucide-react";

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
        <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 group" onClick={handleClose}>
                    <div className="bg-brand-primary p-2 rounded-lg group-hover:bg-brand-secondary transition-colors">
                        <ShieldCheck className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-brand-dark hidden sm:block">
                        Atestados Fast
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    <div className="flex gap-4 xl:gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${pathname === link.href
                                        ? "text-brand-primary font-semibold"
                                        : "text-slate-600 hover:text-brand-primary"
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
                        className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md ml-2"
                    >
                        Abrir GPT
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile menu controls */}
                <div className="flex items-center gap-3 lg:hidden">
                    <a
                        href={process.env.NEXT_PUBLIC_GPT_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-brand-primary text-white p-2 rounded-lg transition-colors"
                        aria-label="Abrir GPT"
                    >
                        <span className="text-xs font-bold mr-1 md:hidden">GPT</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                        className="p-2 text-slate-700 bg-slate-100 rounded-lg"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Alternar menú móvil"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full h-[calc(100vh-64px)] bg-white border-t border-slate-200 overflow-y-auto">
                    <div className="flex flex-col p-4 gap-2 pb-24">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={handleClose}
                                className={`p-4 rounded-xl text-base font-medium transition-colors ${pathname === link.href
                                        ? "bg-brand-primary/10 text-brand-primary font-semibold"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile legal links */}
                        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                            <Link href="/legal#privacidad" onClick={handleClose} className="text-sm text-slate-500 p-2 text-center bg-slate-50 rounded-lg">Privacidad</Link>
                            <Link href="/legal#cookies" onClick={handleClose} className="text-sm text-slate-500 p-2 text-center bg-slate-50 rounded-lg">Cookies</Link>
                            <Link href="/legal#terminos" onClick={handleClose} className="col-span-2 text-sm text-slate-500 p-2 text-center bg-slate-50 rounded-lg">Términos de Uso</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
