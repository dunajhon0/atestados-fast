'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
    clientId: string;
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
    style?: React.CSSProperties;
}

export default function AdSlot({ clientId, slotId, format = 'auto', layoutKey, style }: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // Check consent on mount
        const checkConsent = () => {
            const consentText = localStorage.getItem('cookie-consent-v1');
            const hasAdsConsent = consentText ? JSON.parse(consentText).ads : false;
            setHasConsent(hasAdsConsent);

            if (hasAdsConsent && window) {
                try {
                    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                } catch (err) {
                    console.error('AdSense error:', err);
                }
            }
        };

        checkConsent();

        // Listen for consent changes
        const handleConsentChange = () => {
            checkConsent();
        };

        window.addEventListener('consent-updated', handleConsentChange);
        return () => window.removeEventListener('consent-updated', handleConsentChange);
    }, []);

    if (!hasConsent) {
        return (
            <div className="my-8 py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-center px-4">
                <p className="text-slate-500 font-medium mb-2">Bloque de Publicidad Bloqueado</p>
                <p className="text-xs text-slate-400 mb-4">La publicidad ayuda a mantener esta iniciativa. Por favor, acepta las Cookies de Publicidad.</p>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('show-cookie-preferences'))}
                    className="text-xs text-brand-primary font-medium hover:underline bg-brand-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                    Configurar Cookies
                </button>
            </div>
        );
    }

    return (
        <div className="ad-container my-8 text-center overflow-hidden flex flex-col items-center relative">
            <span className="text-[10px] uppercase text-slate-400 font-medium tracking-widest bg-white px-2 mb-2">
                Publicidad
            </span>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block', minHeight: '90px', ...style }}
                data-ad-client={clientId}
                data-ad-slot={slotId}
                data-ad-format={format}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
                data-full-width-responsive="true"
            />
        </div>
    );
}
