import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atestadosfast.dunajhon.com";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date() },
    { url: `${baseUrl}/demo`, lastModified: new Date() },
    { url: `${baseUrl}/buenas-practicas`, lastModified: new Date() },
    { url: `${baseUrl}/plantillas`, lastModified: new Date() },
    { url: `${baseUrl}/herramientas`, lastModified: new Date() },
    { url: `${baseUrl}/recursos-oficiales`, lastModified: new Date() },
    { url: `${baseUrl}/faq`, lastModified: new Date() },
    { url: `${baseUrl}/sobre`, lastModified: new Date() },
    { url: `${baseUrl}/legal`, lastModified: new Date() },
  ];
}
