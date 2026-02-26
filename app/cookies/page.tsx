export default function CookiesPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 prose prose-slate">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">Política de Cookies</h1>
            <p className="mb-4">La presente política explica qué son las cookies, cuáles empleamos, con qué finalidades y cómo puede gestionarlas o eliminarlas.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. ¿Qué es una cookie?</h2>
            <p className="mb-4">Es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario. Sirven para recordar sus preferencias de navegación, optimizar su experiencia y analizar datos estadísticos de uso.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Tipos de cookies en nuestro portal</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Estrictamente necesarias:</strong> Aquellas requeridas para guardar el propio consentimiento de esta normativa. Se almacenan sin caducidad invasiva utilizando `localStorage` en su dispositivo local para recordar su elección.</li>
                <li><strong>Analíticas (Terceros):</strong> Herramientas para cuantificar el número de usuarios y realizar mediciones estadísticas con la finalidad de mejorar nuestra oferta formativa o informativa.</li>
                <li><strong>Publicitarias (Terceros - Google AdSense):</strong> Se usan para segmentar y mejorar los anuncios mostrados. Estas cookies solo se activan si nos concede permiso explícito seleccionando la opción correspondiente en nuestro panel.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Gestión, revocación y eliminación</h2>
            <p className="mb-4">Usted tiene el control. Puede modificar sus preferencias en nuestra web haciendo clic en "Configurar Cookies" en el aviso inferior de la página. Además, puede configurarlo externamente mediante su navegador para bloquear o ser alertado sobre su instalación:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Chrome: Configuración &gt; Privacidad y seguridad &gt; Cookies.</li>
                <li>Firefox: Opciones &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
                <li>Safari: Preferencias &gt; Privacidad.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Actualizaciones</h2>
            <p className="mb-4">Es probable que adaptemos esta Política a futuras exigencias legislativas (p.ej.: nuevas versiones de Consent Mode u obligatoriedad impuesta por la AEPD), recomendando revisar la misma periódicamente.</p>
        </div>
    );
}
