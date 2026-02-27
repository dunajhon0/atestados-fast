'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollHintToGpt() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const ctaElement = document.getElementById('gpt-publico');
        if (!ctaElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the CTA is visible in the viewport, hide the scroll hint
                setIsVisible(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1, // Trigger when 10% of the CTA is visible
            }
        );

        observer.observe(ctaElement);

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToCta = () => {
        const ctaElement = document.getElementById('gpt-publico');
        if (ctaElement) {
            ctaElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToCta}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-slate-50 hover:text-brand-primary transition-all animate-bounce"
            aria-label="Ir al GPT público"
        >
            <span className="text-sm font-medium">Más abajo: Accede al GPT público</span>
            <ChevronDown className="w-4 h-4" />
        </button>
    );
}
