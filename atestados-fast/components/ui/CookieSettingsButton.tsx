"use client"

export function CookieSettingsButton() {
    return (
        <button
            onClick={() => window.dispatchEvent(new CustomEvent('show-cookie-preferences'))}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
            Abrir Configuración de Cookies
        </button>
    )
}
