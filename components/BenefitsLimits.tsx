import { Scale, EyeOff, UserSearch, AlertTriangle } from 'lucide-react';

export default function BenefitsLimits() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">Lo que puede hacer por ti (y lo que debes evitar)</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Que SI hace */}
                    <div className="border border-green-200 bg-green-50 rounded-2xl p-8 relative overflow-hidden">
                        <div className="w-2 bg-brand-accent absolute left-0 top-0 bottom-0"></div>
                        <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
                            <Scale className="text-green-600" /> Gran Capacidad Para:
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-green-800">
                                <span className="mt-1 flex-shrink-0 bg-green-200 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                                Estructurar secuencias lógicas del relato cronológicamente de forma ordenada.
                            </li>
                            <li className="flex items-start gap-3 text-green-800">
                                <span className="mt-1 flex-shrink-0 bg-green-200 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                                Elevar el vocabulario (p.ej.: transformar "lo pillamos" por "fue interceptado y neutralizado temporalmente").
                            </li>
                            <li className="flex items-start gap-3 text-green-800">
                                <span className="mt-1 flex-shrink-0 bg-green-200 text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                                Sugerir omisiones comunes como: estado del clima, luminosidad, sintomatología general observable.
                            </li>
                        </ul>
                    </div>

                    {/* Que NO hace / LIMITES */}
                    <div className="border border-red-200 bg-red-50 rounded-2xl p-8 relative overflow-hidden">
                        <div className="w-2 bg-red-500 absolute left-0 top-0 bottom-0"></div>
                        <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                            <AlertTriangle className="text-red-600" /> Límites Rojos Estrictos:
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-red-800">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                                <p><strong>Cero Datos Reales:</strong> Nunca introduzcas nombres, DNI, matrículas reales, n.º de placa ni historiales médicos de implicados. Usa etiquetas como <em>[AUTOR 1]</em>.</p>
                            </li>
                            <li className="flex items-start gap-3 text-red-800">
                                <UserSearch className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                                <p><strong>Revisión Humana Obligatoria:</strong> La IA puede "alucinar" detalles (inventarse hechos). Está prohibido firmar y remitir diligencias sin comprobar al detalle que lo expuesto refleja la realidad verídica y documentada de la actuación.</p>
                            </li>
                            <li className="flex items-start gap-3 text-red-800">
                                <EyeOff className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                                <p><strong>Garantía de RGPD:</strong> Las plataformas que conectan desde fuera procesan datos. Debes extremar la prudencia para salvaguardar tu seguridad jurídica.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
