export default function PrivacyPage() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 prose prose-slate">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">Política de Privacidad</h1>
            <p className="mb-4">Efectiva desde: Enero de 2024</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Identidad del responsable</h2>
            <p className="mb-4">En cumplimiento de la legislación vigente y del Reglamento General de Protección de Datos (RGPD), se informa que este sitio web "Atestados Fast" opera como un portal puramente informativo. Los datos que voluntariamente decida enviar el usuario a través de enlaces externos de terceros (por ejemplo, a simuladores o bots de IA operados por OpenAI) quedan sometidos a la política de privacidad de dichas plataformas.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Finalidad de la recopilación de datos</h2>
            <p className="mb-4">Esta página de aterrizaje <strong>no almacena, no procesa y no transfiere</strong> datos personales sensibles ni información policial confidencial. El simulador incluido en esta web se ejecuta íntegramente de manera técnica en su navegador (Front-End) y no remite los datos capturados a ningún servidor backend de nuestra propiedad. Los borradores son temporales y se borran inmediatamente al recargar la página.</p>
            <p className="mb-4">Para la gestión de analíticas y monetización, utilizamos herramientas de terceros que pueden recopilar información estadística, siempre bajo el consentimiento explícito del usuario gestionado a través de nuestro banner de preferencias.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Terceros y servicios publicitarios</h2>
            <p className="mb-4">Nuestra web emplea Google AdSense para la inserción de anuncios y facilitar el soporte del proyecto. AdSense utiliza cookies (u otras tecnologías de rastreo) para mostrar anuncios basados en sus visitas previas a este u otros sitios de internet. El usuario puede revocar o modificar este permiso en todo momento abriendo la configuración de cookies del pie de página.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Recomendación sobre el manejo de información sensible</h2>
            <p className="mb-4"><strong>Aviso Crucial:</strong> En calidad de Agente de la Autoridad, usted asume la responsabilidad legal respecto a los datos que incluye en herramientas de IA (como ChatGPT externo). Se prohíbe introducir en herramientas de terceros datos de carácter personal, números de filiación, matrículas, antecedentes y cualquier información sujeta a reservas de la LOPDGDD. La finalidad de la IA es generar la <em>estructura y el relato genérico</em>, no albergar datos sujetos a privacidad.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Ejercicio de derechos y contacto</h2>
            <p className="mb-4">Al no recabar datos personales de forma directa en bases de datos propias, el ejercicio de derechos ARCO-POL debe dirigirse a los proveedores de los servicios integrados (Google, OpenAI). No obstante, para cualquier queja, sugerencia o reclamación relacionada con la privacidad general de la web, puede contactarnos en: <strong>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@ejemplo.com'}</strong>.</p>
        </div>
    );
}
