/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },

    // Recomendado para hosting estático (evita 404 en rutas como /privacy)
    trailingSlash: true,
};

module.exports = nextConfig;