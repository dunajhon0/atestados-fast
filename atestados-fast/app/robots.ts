import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atestadosfast.dunajhon.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
