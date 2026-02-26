'use client';

import { useState, useEffect } from 'react';

type ConsentSettings = {
    necessary: boolean;
    analytics: boolean;
    ads: boolean;
};

export default function ConsentManager() {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [settings, setSettings] = useState<ConsentSettings>({
        necessary: true,
        analytics: false,
        ads: false
    });

    useEffect(() => {
        // Check local storage for consent on mount
        const savedConsent = localStorage.getItem('cookie-consent-v1');
        if (savedConsent) {
            setSettings(JSON.parse(savedConsent));
        } else {
            setShowBanner(true);
        }

        // Listen to custom event to show preferences from Footer
        const handleShowPref = () => {
            setShowBanner(false);
            setShowPreferences(true);
        };
        window.addEventListener('show-cookie-preferences', handleShowPref);
        return () => window.removeEventListener('show-cookie-preferences', handleShowPref);
    }, []);

    const saveConsent = (newSettings: ConsentSettings) => {
        localStorage.setItem('cookie-consent-v1', JSON.stringify(newSettings));
        setSettings(newSettings);
        setShowBanner(false);
        setShowPreferences(false);

        // If ads are accepted, inject AdSense script
        if (newSettings.ads) {
            const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
            if (adClientId && !document.querySelector('script[src*="adsbygoogle.js"]')) {
                const script = document.createElement('script');
                script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
                script.async = true;
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
            }
        }
    };

    const acceptAll = () => saveConsent({ necessary: true, analytics: true, ads: true });
    const rejectOptional = () => saveConsent({ necessary: true, analytics: false, ads: false });

    if (!showBanner && !showPreferences) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 p-6 pointer-events-auto flex flex-col gap-4">

                {/* Simple Banner View */}
                {showBanner && !showPreferences && (
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="text-sm text-slate-600">
                            <p className="font-bold text-slate-800 mb-1">Aviso sobre el uso de cookies</p>
                            Utilizamos cookies propias necesarias para el funcionamiento del sitio web, y de terceros (Google AdSense) para analizar el tráfico y mostrar anuncios personalizados de forma no intrusiva.
                            <a href="/cookies" className="text-brand-primary hover:underline ml-1">Más información</a>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                            <button onClick={() => setShowPreferences(true)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Configurar</button>
                            <button onClick={rejectOptional} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Rechazar todo</button>
                            <button onClick={acceptAll} className="px-4 py-2 text-sm text-white bg-brand-primary rounded-lg hover:bg-brand-secondary transition-colors font-medium">Aceptar todo</button>
                        </div>
                    </div>
                )}

                {/* Preferences Panel */}
                {showPreferences && (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Centro de Preferencias de Privacidad</h3>
                        <p className="text-sm text-slate-600 mb-6">Al visitar nuestro sitio web, este puede almacenar o recuperar información en su navegador. Esta información podría ser sobre usted, sus preferencias o su dispositivo y se utiliza principalmente para hacer que el sitio funcione como espera.</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="pr-4">
                                    <h4 className="font-bold text-slate-800 text-sm">Estrictamente Necesarias</h4>
                                    <p className="text-xs text-slate-500 mt-1">Estas cookies son necesarias para que el sitio web funcione y para guardar sus preferencias de privacidad. No se pueden desactivar.</p>
                                </div>
                                <div className="relative">
                                    <input type="checkbox" checked disabled className="sr-only" />
                                    <div className="block bg-brand-primary w-10 h-6 rounded-full opacity-50"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-4"></div>
                                </div>
                            </div>

                            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="pr-4">
                                    <h4 className="font-bold text-slate-800 text-sm">Estadísticas y Analítica</h4>
                                    <p className="text-xs text-slate-500 mt-1">Nos permiten contar las visitas y fuentes de tráfico para poder evaluar y mejorar el rendimiento de nuestro sitio.</p>
                                </div>
                                <label className="relative cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={settings.analytics} onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })} />
                                    <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>

                            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="pr-4">
                                    <h4 className="font-bold text-slate-800 text-sm">Publicidad (Google AdSense)</h4>
                                    <p className="text-xs text-slate-500 mt-1">Se utilizan para mostrarle anuncios relevantes y atractivos para el usuario individual. Sin ellas, no podremos monetizar y mantener la plataforma gratuita.</p>
                                </div>
                                <label className="relative cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={settings.ads} onChange={(e) => setSettings({ ...settings, ads: e.target.checked })} />
                                    <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                            <button
                                onClick={() => saveConsent(settings)}
                                className="px-5 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                            >
                                Guardar preferencias
                            </button>
                            <button
                                onClick={acceptAll}
                                className="px-5 py-2 text-sm text-white bg-brand-primary rounded-lg hover:bg-brand-secondary transition-colors font-medium"
                            >
                                Aceptar todas
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
