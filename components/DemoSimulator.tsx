'use client';

import { useState, useRef } from 'react';
import { Presentation, Copy, Check, FileText, Loader2, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

export default function DemoSimulator() {
    const [formData, setFormData] = useState({
        tipo: 'Seguridad Ciudadana - Altercado publico',
        lugar: '',
        fecha: '',
        relato: '',
        participantes: '',
        pruebas: {
            testifical: false,
            documental: false,
            grafica: false,
            armas: false,
            drogas: false,
        },
        observaciones: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);
    const relatoRef = useRef<HTMLTextAreaElement>(null);

    const [resultadoContext, setResultadoContext] = useState<any>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const handleCheckboxChange = (prueba: string) => {
        setFormData(prev => ({
            ...prev,
            pruebas: {
                ...prev.pruebas,
                [prueba as keyof typeof prev.pruebas]: !prev.pruebas[prueba as keyof typeof prev.pruebas]
            }
        }));
    };

    const generarBorrador = () => {
        const { tipo, lugar, fecha, relato, participantes, pruebas, observaciones } = formData;

        // A) Resumen
        const resumen = `Intervención policial clasificada preliminarmente como ${tipo}. Los actuantes se personan en el lugar, constatando los hechos descritos en el relato principal. Se procede a la identificación de las partes involucradas y a la adopción de medidas preventivas, quedando a expensas de la posterior valoración jurídica y actuaciones complementarias.`;

        // B) Cronología
        const cronologia = [
            `${fecha || '[PENDIENTE: HORA]'} - Llegada de la dotación policial a ${lugar || '[PENDIENTE: LUGAR]'}.`,
            "Evaluación inicial del escenario y aseguramiento de la zona.",
            "Contacto con las partes implicadas y recogida de manifestaciones in situ.",
            "Adopción de medidas operativas según el desarrollo de la intervención.",
            "Finalización de la actuación en el lugar y confección de la presente diligencia."
        ];

        // C) Huecos de información
        const huecos = [];
        if (!lugar) huecos.push("Falta concretar lugar exacto de los hechos (vía, número, localidad).");
        if (!fecha) huecos.push("Falta concretar día y hora precisa de la intervención.");
        if (!participantes) huecos.push("Falta identificación completa de intervinientes (víctimas, testigos, presuntos autores).");
        if (!Object.values(pruebas).some(v => v)) huecos.push("No se han referenciado indicios, actas de aprehensión u otro tipo de prueba material/documental.");
        if (huecos.length === 0) huecos.push("No se detectan faltas de información estructurales evidentes en este perfil preliminar.");

        // D) Encaje jurídico
        const encaje = "La actuación descrita pudiera ser constitutiva de infracción (penal o administrativa), sujeta a la tipificación que en su caso determine la Autoridad competente. Se relatan los hechos de forma objetiva, sin prejuzgar la calificación final, atendiendo exclusivamente a lo observado por los agentes y manifestado por las partes en el momento de la intervención.";

        // E) Comparecencia
        const pParticipantes = participantes ? `\nQue se procede a la identificación de los implicados:\n${participantes}` : "\n[PENDIENTE: IDENTIFICACIÓN DE IMPLICADOS Y TESTIGOS]";

        const pruebasList = Object.entries(pruebas)
            .filter(([_, value]) => value)
            .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(', ');

        const pPruebas = pruebasList ? `\nSe reseñan los siguientes indicios/medios de prueba: ${pruebasList}.` : "";
        const pObservaciones = observaciones ? `\nOTRAS CONSIDERACIONES: ${observaciones}` : "";

        const comparecencia = `DILIGENCIA DE EXPOSICIÓN DE HECHOS:

En ${lugar || '[PENDIENTE: UBICACIÓN]'}, siendo las ${fecha || '[PENDIENTE: HORA]'}, los agentes de la Autoridad que suscriben, encontrándose prestando servicio para la prevención de la Seguridad Ciudadana, mediante la presente hacen constar:

PRIMERO. - MOTIVO DE LA INTERVENCIÓN
Que en la fecha y hora indicadas, la dotación es requerida/se persona por motivo de un presunto incidente de tipología: ${tipo}.

SEGUNDO. - DESARROLLO DE LA ACTUACIÓN
A la llegada al lugar, la fuerza actuante observa lo siguiente y recaba las siguientes manifestaciones (diferenciando de manera estricta aquello constatado visualmente por los agentes de lo referido por terceros):

${relato}${pParticipantes}${pPruebas}${pObservaciones}

TERCERO. - ACTUACIONES PRÁCTICADAS
[PENDIENTE: DETALLAR TRASLADOS, LECTURA DE DERECHOS SI PROCEDE, INTERVENCIÓN DE EFECTOS, ETC.]

Se instruye la presente diligencia para dejar constancia fidedigna a la Autoridad competentes de los extremos expuestos, de cuyas resultas se elevará el correspondiente Atestado o Acta si hubiere lugar a ello. 

CONSTE Y CERTIFICO.`;

        return { resumen, cronologia, huecos, encaje, comparecencia };
    };

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.relato.trim()) {
            setError("El relato breve de los hechos es obligatorio.");
            relatoRef.current?.focus();
            return;
        }

        setError(null);
        setStatus('loading');

        setTimeout(() => {
            const data = generarBorrador();
            setResultadoContext(data);
            setStatus('success');
        }, 600);
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(id);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const handleCopyAll = () => {
        if (!resultadoContext) return;

        const { resumen, cronologia, huecos, encaje, comparecencia } = resultadoContext;
        const allText = `--- RESUMEN DEL CASO ---\n${resumen}\n\n--- CRONOLOGÍA ---\n${cronologia.map((c: string) => '- ' + c).join('\n')}\n\n--- HUECOS DE INFORMACIÓN ---\n${huecos.map((h: string) => '- ' + h).join('\n')}\n\n--- ENCAJE JURÍDICO PRUDENTE ---\n${encaje}\n\n--- BORRADOR DE COMPARECENCIA ---\n${comparecencia}`;

        handleCopy(allText, 'all');
    };

    const AccordionBlock = ({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen);
        return (
            <div className="border border-slate-700 rounded-lg mb-3 overflow-hidden bg-slate-800/80">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 flex justify-between items-center text-left bg-slate-800 hover:bg-slate-700/80 transition-colors"
                    type="button"
                >
                    <span className="font-semibold text-slate-200 text-sm tracking-wide">{title}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                    <div className="px-4 py-4 border-t border-slate-700 bg-slate-900/50 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section id="demo" className="container mx-auto px-4 w-full">
            <div className="flex flex-col xl:flex-row gap-8 items-start w-full max-w-7xl mx-auto">

                {/* Panel Izquierdo: Formulario */}
                <div className="xl:w-[45%] w-full shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-6 border border-slate-200">
                        <Presentation className="w-4 h-4" /> Entorno de Simulación (100% Local)
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">Prueba el motor de estructuración</h2>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        Completa los campos con datos ficticios. Nuestro simulador ordenará la información al instante,
                        identificará huecos de información importantes y generará un borrador formal.
                    </p>

                    <form onSubmit={handleGenerate} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="grid gap-5">
                            {/* Fila 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                                    <span>Tipo de Intervención</span>
                                </label>
                                <select
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm"
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                >
                                    <option>Seguridad Ciudadana - Altercado publico</option>
                                    <option>Seguridad Vial - Alcoholemia positiva</option>
                                    <option>Delito Patrimonial - Hurto o Robo</option>
                                    <option>Violencia / Amenazas</option>
                                </select>
                            </div>

                            {/* Fila 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lugar genérico</label>
                                    <input type="text" placeholder="Ej: Vía Pública, Calle Mayor"
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
                                        value={formData.lugar}
                                        onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fecha/Hora</label>
                                    <input type="text" placeholder="Ej: 22/05/2026 03:15h"
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Fila 3: Relato (Required) */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                                    Relato libre u observado <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    ref={relatoRef}
                                    rows={4}
                                    placeholder="Llegamos y vimos a dos personas peleando. Una huyó, la otra tenía heridas leves..."
                                    className={`w-full border rounded-lg p-3 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm resize-none ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-brand-primary'}`}
                                    value={formData.relato}
                                    onChange={(e) => {
                                        setFormData({ ...formData, relato: e.target.value });
                                        if (error) setError(null);
                                    }}
                                ></textarea>
                                {error && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5" /> {error}
                                    </p>
                                )}
                            </div>

                            {/* Fila 4: Participantes */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Personas implicadas (Opcional)</label>
                                <textarea
                                    rows={2}
                                    placeholder="Ej: Varón indocumentado (presunto autor), Testigo 1..."
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm resize-none"
                                    value={formData.participantes}
                                    onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
                                ></textarea>
                            </div>

                            {/* Fila 5: Pruebas */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Indicios o Pruebas</label>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(formData.pruebas).map((prueba) => (
                                        <label key={prueba} className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-slate-200 select-none">
                                            <input
                                                type="checkbox"
                                                className="rounded text-brand-primary focus:ring-brand-primary/50 bg-white border-slate-300"
                                                checked={formData.pruebas[prueba as keyof typeof formData.pruebas]}
                                                onChange={() => handleCheckboxChange(prueba)}
                                            />
                                            <span className="text-xs font-medium text-slate-700 capitalize">{prueba}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Fila 6: Observaciones */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Observaciones</label>
                                <input type="text" placeholder="Ej: Se requiere limpieza de vía, daños en mobiliario..."
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm"
                                    value={formData.observaciones}
                                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-dark hover:bg-slate-800 text-white font-semibold flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed mt-2"
                            >
                                {status === 'loading' ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Procesando relato...</>
                                ) : (
                                    <>Procesar Intervención</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Panel Derecho: Resultado */}
                <div className="xl:w-[55%] w-full h-full relative">
                    <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl w-full xl:sticky xl:top-24 border border-slate-700 min-h-[500px] flex flex-col">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 border-b border-slate-800 pb-5">
                            <div>
                                <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                                    <FileText className="w-5 h-5 text-brand-primary" /> Documento Operativo
                                </h3>
                                <p className="text-slate-400 text-xs mt-1">Análisis estructurado y borrador formal</p>
                            </div>

                            {resultadoContext && (
                                <button
                                    onClick={handleCopyAll}
                                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${copiedSection === 'all' ? 'bg-brand-primary/20 text-brand-primary ring-1 ring-brand-primary/50' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                                >
                                    {copiedSection === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copiedSection === 'all' ? 'Todo Copiado' : 'Copiar Todo'}
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            {!resultadoContext ? (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/30">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-slate-500" />
                                    </div>
                                    <span className="text-slate-400 font-medium">Sin datos procesados</span>
                                    <p className="text-slate-500 text-sm mt-2 max-w-sm">Rellena el formulario y haz clic en "Procesar Intervención" para ver el análisis heurístico y el borrador.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in duration-500">

                                    <AccordionBlock title="A. Resumen del Caso">
                                        {resultadoContext.resumen}
                                    </AccordionBlock>

                                    <AccordionBlock title="B. Cronología Operativa">
                                        <ul className="list-disc pl-5 space-y-1 text-slate-300">
                                            {resultadoContext.cronologia.map((item: string, idx: number) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionBlock>

                                    <AccordionBlock title="C. Huecos de Información">
                                        <ul className="list-disc pl-5 space-y-1 text-amber-200/80">
                                            {resultadoContext.huecos.map((item: string, idx: number) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionBlock>

                                    <AccordionBlock title="D. Encaje Jurídico">
                                        <p className="text-slate-400 italic font-serif">"{resultadoContext.encaje}"</p>
                                    </AccordionBlock>

                                    <div className="mt-6 border border-brand-primary/30 rounded-lg overflow-hidden flex flex-col items-stretch">
                                        <div className="bg-brand-primary/10 px-4 py-3 flex justify-between items-center border-b border-brand-primary/20">
                                            <span className="font-bold text-brand-primary text-sm uppercase tracking-wider flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> E. Borrador Consolidado
                                            </span>
                                            <button
                                                onClick={() => handleCopy(resultadoContext.comparecencia, 'comparecencia')}
                                                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors ${copiedSection === 'comparecencia' ? 'text-brand-primary' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                {copiedSection === 'comparecencia' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copiedSection === 'comparecencia' ? 'Copiado' : 'Copiar'}
                                            </button>
                                        </div>
                                        <div className="bg-slate-900 justify-start items-start p-4 text-slate-300 font-mono text-xs sm:text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto leading-relaxed border-t border-slate-800 shadow-inner">
                                            {resultadoContext.comparecencia}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
