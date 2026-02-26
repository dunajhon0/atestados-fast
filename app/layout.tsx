import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="scroll-smooth">
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
