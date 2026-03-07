"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, TerminalSquare } from "lucide-react";

export const navLinks = [
    { href: "/como-funciona", label: "Cómo Funciona" },
    { href: "/buenas-practicas", label: "Buenas Prácticas" },
    { href: "/plantillas", label: "Plantillas" },
    { href: "/herramientas", label: "Herramientas" },
    { href: "/recursos-oficiales", label: "Recursos" },
];

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const handleClose = () => setIsOpen(false);

    // Scroll listener for dynamic precision header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ease-in-out border-b
                ${scrolled
                    ? "bg-white/80 backdrop-blur-xl border-slate-200/60 shadow-sm"
                    : "bg-white/95 backdrop-blur-md border-transparent"
                }
            `}
        >
            <div
                className={`w-full max-w-[1400px] mx-auto px-6 lg:px-10 transition-all duration-300 flex justify-between items-center
                    ${scrolled ? "h-16 lg:h-20" : "h-20 lg:h-24"}
                `}
            >
                {/* Brand Lockup: Logo + Text */}
                <Link href="/" className="flex items-center gap-3 xl:gap-4 flex-shrink-0 group" onClick={handleClose}>
                    <Image
                        src="/logo.png"
                        alt="Atestados Fast Logo"
                        width={48}
                        height={48}
                        className="w-10 h-10 xl:w-12 xl:h-12 object-contain group-hover:scale-105 transition-transform duration-300 rounded-xl shadow-lg shadow-blue-600/20"
                        priority
                    />
                    <span className="font-black text-xl xl:text-2xl tracking-tighter text-slate-900 group-hover:text-blue-700 transition-colors">
                        Atestados Fast
                    </span>
                </Link>

                {/* Main Navigation (Centered) */}
                <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                    <div className="flex gap-1 md:gap-2 lg:gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-1 py-2 text-[14px] xl:text-[15px] transition-all duration-200
                                        ${isActive
                                            ? "text-blue-600 font-bold"
                                            : "text-slate-500 font-medium hover:text-slate-900"
                                        }
                                    `}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in-50" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Area: Main CTA */}
                <div className="hidden lg:flex items-center flex-shrink-0">
                    <Link
                        href="https://atestadosfast.dunajhon.com/demo/"
                        className="group flex-shrink-0 flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white px-7 py-3 rounded-xl font-bold text-sm xl:text-[15px] transition-all duration-300 shadow-[0_8px_16px_-6px_rgba(9,9,11,0.4)] hover:shadow-[0_12px_20px_-8px_rgba(9,9,11,0.6)] hover:-translate-y-0.5 active:scale-95"
                    >
                        <TerminalSquare className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        Hacer atestado
                    </Link>
                </div>

                {/* Mobile controls */}
                <div className="flex lg:hidden items-center gap-3">
                    <Link
                        href="https://atestadosfast.dunajhon.com/demo/"
                        className="flex items-center justify-center bg-[#09090B] hover:bg-[#18181B] text-white w-10 h-10 rounded-xl transition-all shadow-md active:scale-95"
                        aria-label="Hacer atestado"
                    >
                        <TerminalSquare className="w-[18px] h-[18px] text-blue-400" />
                    </Link>

                    <button
                        className="w-10 h-10 flex items-center justify-center text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors rounded-xl"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Alternar menú móvil"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out origin-top shadow-xl
                    ${isOpen ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="flex flex-col p-6 gap-2 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={handleClose}
                                className={`p-4 rounded-xl text-lg font-semibold transition-colors flex items-center ${isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {link.label}
                                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />}
                            </Link>
                        );
                    })}

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
                        <Link href="/sobre" onClick={handleClose} className="text-base font-medium text-slate-500 hover:text-slate-900 transition-colors">Sobre Nosotros</Link>
                        <Link href="/faq" onClick={handleClose} className="text-base font-medium text-slate-500 hover:text-slate-900 transition-colors">FAQ</Link>
                    </div>

                    {/* Mobile legal links */}
                    <div className="mt-8 grid grid-cols-2 gap-3 opacity-60">
                        <Link href="/legal#privacidad" onClick={handleClose} className="text-xs font-medium text-slate-500 text-center">Privacidad</Link>
                        <Link href="/legal#cookies" onClick={handleClose} className="text-xs font-medium text-slate-500 text-center">Cookies</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
