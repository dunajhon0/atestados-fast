import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atestadosfast.dunajhon.com";

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/como-funciona', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/demo', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/buenas-practicas', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/plantillas', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/herramientas', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/recursos-oficiales', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/sobre', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/legal', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
