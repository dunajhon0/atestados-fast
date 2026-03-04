import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atestadosfast.dunajhon.com";

  // Añade aquí tus páginas importantes
  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/cookies`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];
}
