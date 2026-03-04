import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsentManager from '@/components/ConsentManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Atestados Fast - Asistencia IA para Redacción Policial',
    description: 'Herramienta de asistencia basada en IA para facilitar y agilizar la redacción estructurada de atestados policiales. Segura, rápida y optimizada para agentes de la autoridad.',
    openGraph: {
        title: 'Atestados Fast - Asistencia IA para Redacción Policial',
        description: 'Guía y redacción asistida de atestados policiales.',
        siteName: 'Atestados Fast',
        locale: 'es_ES',
        type: 'website',
    },
    other: {
        'google-adsense-account': 'ca-pub-3779816940145698',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3779816940145698"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </head>
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen pt-16">
                    {children}
                </main>
                <Footer />
                <ConsentManager />
            </body>
        </html>
    );
}
