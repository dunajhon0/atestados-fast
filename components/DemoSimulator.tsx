'use client';

import { useState } from 'react';
import { Presentation, Copy, Check, FileText } from 'lucide-react';

export default function DemoSimulator() {
    const [formData, setFormData] = useState({
        tipo: 'Seguridad Ciudadana - Altercado publico',
        lugar: '',
        fecha: '',
        relato: '',
    });

    const [result, setResult] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Escapar contenido básico para simulación
    const escapeHtml = (unsafe: string) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.relato) return;

        const currentData = {
            lugar: formData.lugar || '[UBICACIÓN NO ESPECIFICADA]',
            fecha: formData.fecha || '[FECHA/HORA NO ESPECIFICADA]',
            relato: escapeHtml(formData.relato)
        };

        const mockDraft = `DILIGENCIA DE EXPOSICIÓN DE HECHOS:

En ${currentData.lugar}, siendo las ${currentData.fecha}, los agentes actuantes, encontrándose de servicio para la prevención de la Seguridad Ciudadana, hacen constar:

1. MOTIVO DE LA INTERVENCIÓN
Que han sido requeridos por la Sala / Centro de Mando debido a un posible delito relacionado con la tipología de: ${formData.tipo}. 

2. DESARROLLO DE LOS ACTOS
Al personarse en el lugar, la dotación policial observa y procede según se resume a continuación expuesto por el agente instructor:
${currentData.relato}

3. INSPECCIÓN Y MEDIDAS CAUTELARES
[DATOS PENDIENTES DE CUMPLIMENTAR POR EL INSTRUCTOR]

Se instruye la presente diligencia para dejar constancia fidedigna a la Autoridad Judicial o competente. Firmado.`;

        setResult(mockDraft);
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="demo" className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">

                {/* Izquierda: Formulario explicativo */}
                <div className="lg:w-1/2 w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
                        <Presentation className="w-4 h-4" /> Entorno de Simulación Segura
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Prueba cómo estructuraría la información</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Hemos construido este simulador rápido. Esta demo NO envía tus datos a ninguna API por tu seguridad;
                        el borrador se construye directamente en tu navegador usando código local para demostrarte cómo se genera una macro-estructura a partir de texto desordenado. En el futuro planeamos habilitar la conexión a modelos superiores.
                    </p>

                    <form onSubmit={handleGenerate} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="grid gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Intervención</label>
                                <select
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-brand-primary outline-none"
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                >
                                    <option>Seguridad Ciudadana - Altercado publico</option>
                                    <option>Seguridad Vial - Alcoholemia positiva</option>
                                    <option>Delito Patrimonial - Hurto o Robo</option>
                                    <option>Violencia / Amenazas</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Lugar genérico</label>
                                    <input type="text" placeholder="Ej: Vía Pública, Calle Mayor"
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-1 focus:ring-brand-primary"
                                        value={formData.lugar}
                                        onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Hora aproximada</label>
                                    <input type="time"
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-1 focus:ring-brand-primary"
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Relato rápido e informal</label>
                                <textarea
                                    rows={4}
                                    placeholder="Llegamos y vimos a dos tíos pegándose. Uno huyó corriendo, pillamos al otro que olía mucho a alcohol..."
                                    className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 outline-none focus:ring-1 focus:ring-brand-primary resize-none"
                                    value={formData.relato}
                                    onChange={(e) => setFormData({ ...formData, relato: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-brand-dark hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors">
                                Generar borrador (Demo Front-End)
                            </button>
                        </div>
                    </form>
                </div>

                {/* Derecha: Resultado generado */}
                <div className="lg:w-1/2 w-full h-full relative">
                    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl w-full sticky top-24 min-h-[400px]">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-brand-primary" /> Borrador Resultante
                            </h3>
                            {result && (
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${copied ? 'bg-brand-accent/20 text-brand-accent' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            )}
                        </div>

                        <div className="bg-slate-900 rounded-lg p-4 h-full text-slate-300 font-mono text-sm whitespace-pre-wrap overflow-y-auto max-h-[500px]">
                            {result ? result : (
                                <span className="text-slate-500 italic">Aquí aparecerá el texto redactado estructuradamente con vocabulario formal. Rellena el formulario de la izquierda y haz clic en generar.</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
