import { ExternalLink, BookOpen } from 'lucide-react';

export default function Resources() {
    const boeCodigoPenal = process.env.NEXT_PUBLIC_BOE_CODIGO_PENAL_URL || 'https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444';
    const boeHome = process.env.NEXT_PUBLIC_BOE_HOME_URL || 'https://www.boe.es/';

    return (
        <section id="recursos" className="container mx-auto px-4 pb-10">
            <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Recursos Oficiales Relevantes</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <a href={boeCodigoPenal} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-light p-3 rounded-lg text-brand-primary"><BookOpen /></div>
                            <div>
                                <h4 className="font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Código Penal Español</h4>
                                <p className="text-sm text-slate-500">Versión consolidada BOE</p>
                            </div>
                        </div>
                        <ExternalLink className="text-slate-400 group-hover:text-brand-primary w-5 h-5 transition-colors" />
                    </a>

                    <a href={boeHome} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-light p-3 rounded-lg text-slate-600"><BookOpen /></div>
                            <div>
                                <h4 className="font-bold text-slate-800 group-hover:text-brand-primary transition-colors">Boletín Oficial del Estado</h4>
                                <p className="text-sm text-slate-500">Legislación general y normativas</p>
                            </div>
                        </div>
                        <ExternalLink className="text-slate-400 group-hover:text-brand-primary w-5 h-5 transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
}
