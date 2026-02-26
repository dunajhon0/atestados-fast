'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const gptUrl = process.env.NEXT_PUBLIC_GPT_URL || '#';

    const NavLinks = () => (
        <>
            <a href="#como-funciona" className="text-slate-600 hover:text-brand-primary font-medium transition-colors" onClick={() => setIsOpen(false)}>Cómo funciona</a>
            <a href="#demo" className="text-slate-600 hover:text-brand-primary font-medium transition-colors" onClick={() => setIsOpen(false)}>Demo</a>
            <a href="#practicas" className="text-slate-600 hover:text-brand-primary font-medium transition-colors" onClick={() => setIsOpen(false)}>Buenas Prácticas</a>
            <a href="#recursos" className="text-slate-600 hover:text-brand-primary font-medium transition-colors" onClick={() => setIsOpen(false)}>Recursos</a>
            <a href="#faq" className="text-slate-600 hover:text-brand-primary font-medium transition-colors" onClick={() => setIsOpen(false)}>FAQ</a>
        </>
    );

    return (
        <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-primary p-2 rounded-lg group-hover:bg-brand-secondary transition-colors">
                        <ShieldCheck className="text-white w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-brand-dark">Atestados Fast</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLinks />
                    <a
                        href={gptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-dark hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                        Abrir GPT
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Alternar menú"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 flex flex-col gap-6 shadow-xl">
                    <NavLinks />
                    <a
                        href={gptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-primary text-white text-center px-4 py-3 rounded-xl font-bold"
                        onClick={() => setIsOpen(false)}
                    >
                        Abrir GPT Atestados
                    </a>
                </div>
            )}
        </nav>
    );
}
