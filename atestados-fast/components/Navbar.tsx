'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                </div>
            )}
        </nav>
    );
}
