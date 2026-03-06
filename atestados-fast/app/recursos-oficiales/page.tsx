import { Metadata } from 'next';
import { ResourcesFilter } from '@/components/tools/ResourcesFilter';

export const metadata: Metadata = {
    title: 'Recursos Oficiales | Atestados Fast',
    description: 'Biblioteca filtrable con los recursos normativos y fuentes oficiales más importantes (BOE, AEPD, Código Penal).',
};

export default function RecursosOficialesPage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Recursos Oficiales
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Biblioteca de enlaces a fuentes oficiales del Estado. Atestados Fast no aloja estos documentos, garantizando que siempre accedas a la versión oficial y actualizada (BOE consolidado).
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <ResourcesFilter />
            </div>

        </div>
    );
}
