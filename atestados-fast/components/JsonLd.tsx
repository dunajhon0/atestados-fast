export function OrganizationJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Atestados Fast",
        "url": "https://atestadosfast.dunajhon.com",
        "logo": "https://atestadosfast.dunajhon.com/logo.png",
        "description": "Herramienta de asistencia formativa basada en IA para facilitar la redacción estructurada de atestados policiales.",
        "sameAs": []
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function WebSiteJsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://atestadosfast.dunajhon.com/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://atestadosfast.dunajhon.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ToolJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": `https://atestadosfast.dunajhon.com${url}`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
