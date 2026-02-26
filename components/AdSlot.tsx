'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
    clientId: string;
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
    style?: React.CSSProperties;
}

export default function AdSlot({ clientId, slotId, format = 'auto', layoutKey, style }: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // Check if consent has been given (logic matches ConsentManager)
            const consentText = localStorage.getItem('cookie-consent-v1');
            const hasAdsConsent = consentText ? JSON.parse(consentText).ads : false;

            // Only push ad if we have consent
            if (hasAdsConsent && window && !(window as any).adsbygoogleSetup) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="ad-container my-4 text-center overflow-hidden">
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
