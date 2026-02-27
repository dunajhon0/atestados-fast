'use client';

import { useState, useRef } from 'react';
import { Presentation, Copy, Check, FileText, Loader2, AlertCircle, ChevronDown, ChevronRight, ArrowDown, ExternalLink } from 'lucide-react';

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
            arma: false,
            drogas: false,
            cctv: false,
            parte_medico: false,
            otros: false,
        },
        notasPruebas: '',
        observaciones: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);
    const relatoRef = useRef<HTMLTextAreaElement>(null);

    const [resultadoContext, setResultadoContext] = useState<any>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const getContextualHelp = () => {
        if (!formData.relato) return "Sugerencia: incluye 'origen del aviso', 'qué se observa al llegar', 'qué manifiestan', 'actuaciones', 'situación final'.";
        const lower = formData.relato.toLowerCase();
        let suggestions = [];
        if (!lower.includes('llega') && !lower.includes('aviso')) suggestions.push("origen de la intervención");
        if (!lower.includes('manifiest') && !lower.includes('indic') && !lower.includes('refier') && !lower.includes('dijo')) suggestions.push("manifestaciones");
        if (suggestions.length > 0) return `Sugerencia: podrías añadir ${suggestions.join(' y ')}.`;
        return "El relato parece estructurado. Revisa que no queden detalles operativos importantes por incluir.";
    };

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
        const { tipo, lugar, fecha, relato, participantes, pruebas, notasPruebas, observaciones } = formData;

        const lowerRelato = relato.toLowerCase();
        const hasManifestaciones = lowerRelato.includes('dijo') || lowerRelato.includes('manifiest') || lowerRelato.includes('refiere') || lowerRelato.includes('indic');

        const flags = {
            lesiones: lowerRelato.includes('lesion') || lowerRelato.includes('herid') || lowerRelato.includes('sangre') || lowerRelato.includes('golpe') || pruebas.parte_medico,
            drogas: lowerRelato.includes('droga') || lowerRelato.includes('sustancia') || lowerRelato.includes('estupefaciente') || pruebas.drogas,
            arma: lowerRelato.includes('arma') || lowerRelato.includes('cuchillo') || lowerRelato.includes('navaja') || pruebas.arma,
            patrimonio: lowerRelato.includes('robo') || lowerRelato.includes('hurto') || lowerRelato.includes('sustra') || lowerRelato.includes('cartera') || lowerRelato.includes('móvil'),
            huida: lowerRelato.includes('huida') || lowerRelato.includes('huy') || lowerRelato.includes('fuga'),
            cctv: lowerRelato.includes('camara') || lowerRelato.includes('cámara') || lowerRelato.includes('grabación') || lowerRelato.includes('video') || pruebas.cctv,
        };

        const fLugar = lugar || '[PENDIENTE: LUGAR EXACTO]';
        const fFecha = fecha || '[PENDIENTE: FECHA Y HORA]';

        // A) Resumen
        let resumen = `Intervención policial por ${tipo} en ${fLugar}. `;
        if (flags.lesiones) resumen += "Se registran lesiones o necesidad de asistencia médica. ";
        if (flags.arma) resumen += "Presencia de armas u objetos peligrosos. ";
        if (flags.drogas) resumen += "Relacionado con sustancias estupefacientes. ";
        if (flags.patrimonio) resumen += "Constitutivo de presunto delito patrimonial. ";
        if (flags.huida) resumen += "Consta huida de los presuntos autores. ";
        resumen += "Se adoptan las medidas de seguridad perimetral y se asegura la zona, a expensas de la posterior valoración jurídica y gestiones documentales.";

        // B) Cronología
        const cronologia = [
            `${fFecha} - Inicio de la intervención (requerimiento o actuación de oficio).`,
            `Personación de los actuantes en ${fLugar} y aseguramiento preventivo.`,
            hasManifestaciones ? "Recopilación de manifestaciones de las partes implicadas in situ." : "Observación directa de los hechos por la fuerza actuante.",
            "Adopción de medidas operativas correspondientes (identificaciones, intervenciones).",
            "Finalización de la actuación en el lugar y confección de la presente diligencia."
        ];

        // C) Huecos de información
        const huecos = [];
        if (!lugar) huecos.push("Falta concretar lugar exacto de los hechos (vía, número, poblado).");
        if (!fecha) huecos.push("Falta concretar día y hora precisa de la intervención.");
        if (!participantes) huecos.push("Requiere filiación completa de intervinientes (víctimas, testigos, presuntos autores/investigados).");
        if (flags.lesiones && !pruebas.parte_medico) huecos.push("Se mencionan lesiones pero no consta Parte Médico asegurado como prueba.");
        if (flags.arma && !pruebas.arma) huecos.push("Se menciona arma pero no se ha marcado como indicio intervenido preliminarmente.");
        if (flags.patrimonio && !hasManifestaciones) huecos.push("En actos patrimoniales es imperativo detallar la declaración de la víctima (tipo de efecto, tasación, autoría).");
        if (flags.huida && !lowerRelato.includes('dirección') && !lowerRelato.includes('descripción')) huecos.push("Consta huida de implicados pero faltaría descripción de los mismos y dirección de huida.");
        if (huecos.length === 0) huecos.push("Estructura base del apunte suficientemente sólida.");

        // D) Encaje jurídico
        let encaje = "La actuación descrita podría ser compatible con una infracción ";
        if (tipo.includes('Vial')) encaje += "contra la Seguridad Vial";
        else if (flags.patrimonio) encaje += "contra el Patrimonio";
        else if (flags.lesiones || tipo.includes('Violencia')) encaje += "contra las Personas";
        else if (flags.drogas) encaje += "contra la Salud Pública o infracción administrativa (LO 4/2015)";
        else encaje += "penal o administrativa a determinar por la Autoridad";
        encaje += ", quedando supeditada ineludiblemente a la valoración jurídica final del instructor o de la Autoridad Judicial. Se relatan los hechos de forma aséptica y preliminar.";

        // E) Comparecencia
        const pParticipantes = participantes ? `\nQue se procede a la identificación de los implicados intervinientes, con los siguientes roles y filiaciones:\n${participantes}` : "\n[PENDIENTE: IDENTIFICACIÓN Y ROLES DE IMPLICADOS / TESTIGOS / VÍCTIMAS]";

        const activePruebas = Object.entries(pruebas).filter(([_, v]) => v).map(([k]) => k.replace('_', ' ').toUpperCase());
        const pPruebasStr = activePruebas.length > 0 ? activePruebas.join(', ') : '';
        let pPruebasSection = pPruebasStr ? `\nQue se recogen, aseguran o da cuenta de los siguientes indicios y pruebas: ${pPruebasStr}.` : "";
        if (notasPruebas && pPruebasSection) pPruebasSection += `\nDetalles de prueba adicionales: ${notasPruebas}`;

        const pObservaciones = observaciones ? `\n\nOTRAS GESTIONES OPERATIVAS Y OBSERVACIONES RELEVANTES:\n${observaciones}` : "";

        const comparecencia = `DILIGENCIA DE EXPOSICIÓN Y CONSTANCIA DE HECHOS

En [PENDIENTE: DEPENDENCIA POLICIAL O SEDE], siendo las [PENDIENTE: HORA DE CONFECCIÓN] horas del día de la fecha, los Agentes de la Autoridad con carnet profesional [PENDIENTE: NIP/TIP 1] y [PENDIENTE: NIP/TIP 2], prestando servicio para la prevención de la Seguridad Ciudadana, mediante la presente hacen constar:

PRIMERO. - ORIGEN DE LA INTERVENCIÓN
Que siendo las ${fFecha}, la dotación actuante es requerida/se persona prestando servicio en la zona, ocurriendo los hechos en ${fLugar}, por motivo de un presunto incidente catalogado inicialmente como: ${tipo}.

SEGUNDO. - DESARROLLO DE LA ACTUACIÓN Y MANIFESTACIONES
A la llegada al lugar, los agentes intervinientes constatan de visu los siguientes extremos objetivos y recaban las manifestaciones in situ que a continuación se detallan (diferenciando de manera estricta ambas fuentes de información):

${relato}${pParticipantes}${pPruebasSection}${pObservaciones}

TERCERO. - ACTUACIONES PRACTICADAS Y FINALIZACIÓN
[PENDIENTE: DETALLAR TRASLADOS, LECTURAS DE DERECHOS SI PROCEDEN, GESTIONES CON SALA U OTROS INDICATIVOS]
Se adoptan las medidas de seguridad correspondientes, informando en su caso a las partes de los derechos que les asisten y de los trámites legales oportunos. Se instruye la presente diligencia para dejar constancia fidedigna de los extremos expuestos, a los efectos probatorios que procedan, de cuyas resultas se elevará el correspondiente Atestado o Acta si hubiere lugar a ello.

CONSTE Y CERTIFICO.

(NOTA: Revisión humana obligatoria. Documento no oficial creado mediante simulación heurística local).`;

        // F) Anexos
        const anexos = [];
        if (pruebas.parte_medico || flags.lesiones) anexos.push("Parte Facultativo de Asistencia Médica (Original y/o diligenciado)");
        if (pruebas.arma || pruebas.drogas) anexos.push("Acta de Intervención / Aprehensión de efectos");
        if (flags.cctv) anexos.push("Reporte Fotográfico y/o Soporte Digital de Grabación (CCTV / Móvil)");
        if (pruebas.documental) anexos.push("Prueba Documental anexa de interés");
        if (anexos.length === 0) anexos.push("No se deducen Anexos específicos en base al relato estructurado preliminarmente.");

        return { resumen, cronologia, huecos, encaje, comparecencia, anexos };
    };

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.relato.trim().length < 15) {
            setError("El relato debe contener al menos 15 caracteres descriptivos para poder estructurarlo.");
            relatoRef.current?.focus();
            return;
        }

        setError(null);
        setStatus('loading');

        setTimeout(() => {
            const data = generarBorrador();
            setResultadoContext(data);
            setStatus('success');
        }, 500);
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(id);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const handleCopyAll = () => {
        if (!resultadoContext) return;
        const { resumen, cronologia, huecos, encaje, comparecencia, anexos } = resultadoContext;
        const allText = `--- A. RESUMEN DEL CASO ---\n${resumen}\n\n--- B. CRONOLOGÍA OPERATIVA ---\n${cronologia.map((c: string) => '- ' + c).join('\n')}\n\n--- C. HUECOS DE INFORMACIÓN ---\n${huecos.map((h: string) => '- ' + h).join('\n')}\n\n--- D. ENCAJE JURÍDICO PRUDENTE ---\n${encaje}\n\n--- E. BORRADOR DE COMPARECENCIA ---\n${comparecencia}\n\n--- F. ANEXOS / EVIDENCIAS SUGERIDAS ---\n${anexos.map((a: string) => '- ' + a).join('\n')}`;
        handleCopy(allText, 'all');
    };

    const scrollToCta = () => {
        const ctaElement = document.getElementById('demo-cta-gpt');
        if (ctaElement) {
            ctaElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const AccordionBlock = ({ title, defaultOpen = false, children, highlight = false }: { title: string, defaultOpen?: boolean, children: React.ReactNode, highlight?: boolean }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen);
        return (
            <div className={`border rounded-lg mb-3 overflow-hidden ${highlight ? 'border-amber-500/30 shadow-sm shadow-amber-500/5' : 'border-slate-700 bg-slate-800/80 shadow-sm shadow-black/20'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 flex justify-between items-center text-left transition-colors ${highlight ? 'bg-amber-900/20 hover:bg-amber-900/30' : 'bg-slate-800 hover:bg-slate-700/80'}`}
                    type="button"
                >
                    <span className={`font-semibold text-sm tracking-wide ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>{title}</span>
                    {isOpen ? <ChevronDown className={`w-4 h-4 ${highlight ? 'text-amber-400' : 'text-slate-400'}`} /> : <ChevronRight className={`w-4 h-4 ${highlight ? 'text-amber-400' : 'text-slate-400'}`} />}
                </button>
                {isOpen && (
                    <div className={`px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap border-t ${highlight ? 'border-amber-500/20 text-neutral-300' : 'border-slate-700 bg-slate-900/50 text-slate-300'}`}>
                        {children}
                    </div>
                )}
            </div>
        );
    };

    const formatPendienteTags = (text: string) => {
        return text.split(/(\[PENDIENTE:[^\]]+\])/).map((part: string, i: number) =>
            part.startsWith('[PENDIENTE') ? <span key={i} className="text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded opacity-90 mx-0.5 whitespace-nowrap">{part}</span> : part
        );
    };

    const anyPruebaChecked = Object.values(formData.pruebas).some(v => v);
    const gptUrl = process.env.NEXT_PUBLIC_GPT_PUBLIC_URL || "#";

    return (
        <section id="demo" className="container mx-auto px-4 w-full flex flex-col items-center">
            <div className="flex flex-col xl:flex-row gap-8 items-start w-full max-w-7xl mx-auto mb-12">

                {/* Panel Izquierdo: Formulario */}
                <div className="xl:w-[45%] w-full shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-6 border border-slate-200 shadow-sm">
                        <Presentation className="w-4 h-4 text-brand-primary" /> Entorno de Simulación (100% Local)
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Prueba el motor de estructuración</h2>
                    <p className="text-slate-600 mb-8 text-sm leading-relaxed max-w-lg">
                        Completa los campos con datos ficticios. Nuestro simulador ordenará la información al instante mediante una técnica de análisis heurístico local.
                    </p>

                    <form onSubmit={handleGenerate} className="bg-white p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200 relative overflow-hidden">
                        <div className="grid gap-5">
                            {/* Fila 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                                    <span>Tipo de Intervención</span>
                                </label>
                                <select
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-sm font-medium text-slate-700 hover:border-slate-400"
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                >
                                    <option>Seguridad Ciudadana - Altercado publico</option>
                                    <option>Seguridad Vial - Alcoholemia positiva</option>
                                    <option>Delito Patrimonial - Hurto o Robo</option>
                                    <option>Violencia / Amenazas</option>
                                    <option>Otro servicio recurrente</option>
                                </select>
                            </div>

                            {/* Fila 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lugar genérico <span className="text-slate-400 font-normal text-xs">(Recomendado)</span></label>
                                    <input type="text" placeholder="Ej: Vía pública, portal..."
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm hover:border-slate-400"
                                        value={formData.lugar}
                                        onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fecha/Hora</label>
                                    <input type="text" placeholder="Ej: 22/05/2026 03:15h"
                                        className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm hover:border-slate-400"
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
                                    rows={5}
                                    placeholder="Llegamos y observamos a un varón alterado. Nos manifiesta que..."
                                    className={`w-full border rounded-lg p-3 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm resize-none hover:border-slate-400 ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-brand-primary'}`}
                                    value={formData.relato}
                                    onChange={(e) => {
                                        setFormData({ ...formData, relato: e.target.value });
                                        if (error) setError(null);
                                    }}
                                ></textarea>
                                {error && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium bg-red-50 p-2 rounded w-fit">
                                        <AlertCircle className="w-3.5 h-3.5" /> {error}
                                    </p>
                                )}
                                {!error && (
                                    <p className="text-brand-primary text-xs mt-1.5 flex items-center gap-1.5 font-medium px-1">
                                        {getContextualHelp()}
                                    </p>
                                )}
                            </div>

                            {/* Fila 4: Participantes */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Personas implicadas <span className="text-slate-400 font-normal text-xs">(Roles, opcional)</span></label>
                                <textarea
                                    rows={2}
                                    placeholder="Ej: Víctima (varón contusionado), Testigo, Investigado (indocumentado)..."
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm resize-none hover:border-slate-400"
                                    value={formData.participantes}
                                    onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
                                ></textarea>
                            </div>

                            {/* Fila 5: Pruebas */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Indicios o Pruebas</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Object.keys(formData.pruebas).map((prueba) => {
                                        const label = prueba.replace('_', ' ');
                                        const isChecked = formData.pruebas[prueba as keyof typeof formData.pruebas];
                                        return (
                                            <label key={prueba} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer transition-all border select-none hover:scale-[1.02] active:scale-95 ${isChecked ? 'bg-brand-primary/10 border-brand-primary text-brand-dark shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}>
                                                <input
                                                    type="checkbox"
                                                    className="w-3.5 h-3.5 text-brand-primary border-slate-300 rounded focus:ring-brand-primary/50"
                                                    checked={isChecked}
                                                    onChange={() => handleCheckboxChange(prueba)}
                                                />
                                                <span className={`text-xs capitalize ${isChecked ? 'font-semibold' : 'font-medium'}`}>{label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {anyPruebaChecked && (
                                    <input type="text" placeholder="Notas sobre las pruebas u objetos (opcional)..."
                                        className="w-full border border-slate-200 rounded-lg p-2 bg-slate-50/50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm text-slate-700 placeholder:text-slate-400"
                                        value={formData.notasPruebas}
                                        onChange={(e) => setFormData({ ...formData, notasPruebas: e.target.value })}
                                    />
                                )}
                            </div>

                            {/* Fila 6: Observaciones */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Observaciones de gestión</label>
                                <input type="text" placeholder="Ej: Indicativo de apoyo, traslados médicos..."
                                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm hover:border-slate-400"
                                    value={formData.observaciones}
                                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-dark hover:bg-slate-800 text-brand-primary overflow-hidden relative group font-bold flex items-center justify-center gap-2 py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed mt-2"
                            >
                                <div className="absolute inset-0 w-full h-full bg-slate-900 group-hover:bg-black transition-colors"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    {status === 'loading' ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Procesando relato...</>
                                    ) : (
                                        <>Procesar Intervención</>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Panel Derecho: Resultado */}
                <div className="xl:w-[55%] w-full h-full relative">
                    <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl w-full xl:sticky xl:top-24 border border-slate-700 min-h-[500px] flex flex-col items-stretch">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-800 pb-5">
                            <div>
                                <h3 className="text-white font-bold flex items-center gap-2 text-xl tracking-tight">
                                    <FileText className="w-5 h-5 text-brand-primary" /> Documento Operativo
                                </h3>
                                <p className="text-slate-400 text-xs mt-1.5 font-medium tracking-wide uppercase">Capa analítica heurística local</p>
                            </div>

                            {resultadoContext && (
                                <button
                                    onClick={handleCopyAll}
                                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${copiedSection === 'all' ? 'bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/50' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'}`}
                                >
                                    {copiedSection === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copiedSection === 'all' ? 'Todo Copiado' : 'Copiar Todo'}
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            {!resultadoContext ? (
                                <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-700/60 rounded-xl bg-slate-800/20">
                                    <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mb-5 ring-4 ring-slate-800/30">
                                        <FileText className="w-7 h-7 text-slate-500" />
                                    </div>
                                    <span className="text-slate-300 font-semibold mb-2">Sin datos de intervención</span>
                                    <p className="text-slate-500 text-sm max-w-sm leading-relaxed">Rellena el formulario y haz clic en "Procesar Intervención" para activar el motor de estructuración y generar el borrador policial.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">

                                    <AccordionBlock title="A. Resumen del Caso">
                                        {resultadoContext.resumen}
                                    </AccordionBlock>

                                    <AccordionBlock title="B. Cronología Operativa">
                                        <ul className="list-disc pl-5 space-y-1.5 text-slate-300 marker:text-brand-primary/60">
                                            {resultadoContext.cronologia.map((item: string, idx: number) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionBlock>

                                    <AccordionBlock title="C. Huecos de Información" highlight={resultadoContext.huecos.some((h: string) => h.includes('Falta') || h.includes('Requiere'))}>
                                        <ul className="list-disc pl-5 space-y-1.5 marker:text-amber-500/70">
                                            {resultadoContext.huecos.map((item: string, idx: number) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionBlock>

                                    <AccordionBlock title="D. Encaje Jurídico">
                                        <p className="text-slate-400 italic font-serif leading-relaxed text-[13px]">"{resultadoContext.encaje}"</p>
                                    </AccordionBlock>

                                    <div className="mt-8 border border-brand-primary/20 rounded-xl overflow-hidden shadow-xl shadow-brand-primary/5">
                                        <div className="bg-gradient-to-r from-brand-primary/20 to-transparent px-5 py-3.5 flex justify-between items-center border-b border-brand-primary/20 backdrop-blur-sm">
                                            <span className="font-bold text-brand-primary text-sm tracking-wider flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 text-brand-primary/80" /> E. BORRADOR CONSOLIDADO
                                            </span>
                                            <button
                                                onClick={() => handleCopy(resultadoContext.comparecencia, 'comparecencia')}
                                                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${copiedSection === 'comparecencia' ? 'bg-brand-primary/20 text-brand-primary ring-1 ring-brand-primary/40' : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 ring-1 ring-slate-700/50'}`}
                                            >
                                                {copiedSection === 'comparecencia' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copiedSection === 'comparecencia' ? 'Copiado' : 'Copiar Borrador'}
                                            </button>
                                        </div>
                                        <div className="bg-[#0b1120] p-5 text-slate-300 font-mono text-[13px] sm:text-sm whitespace-pre-wrap max-h-[450px] overflow-y-auto leading-[1.7] relative selection:bg-brand-primary/30 selection:text-white">
                                            {formatPendienteTags(resultadoContext.comparecencia)}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <AccordionBlock title="F. Anexos / Evidencias Sugeridas">
                                            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 marker:text-brand-primary/60">
                                                {resultadoContext.anexos.map((item: string, idx: number) => (
                                                    <li key={idx}><span className="text-slate-400 font-medium">Anexo {idx + 1}:</span> {item}</li>
                                                ))}
                                            </ul>
                                        </AccordionBlock>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Nuevo Bloque Continuación GPT Oficial */}
            <div className="w-full flex flex-col items-center mt-8 pb-12 animate-in fade-in duration-700 delay-300">
                <button
                    onClick={scrollToCta}
                    className="flex flex-col items-center gap-2 text-slate-400 hover:text-brand-primary transition-all cursor-pointer mb-8 p-3 rounded-xl hover:bg-slate-50 group hover:scale-105 active:scale-95"
                    aria-label="Ir al GPT Público"
                >
                    <span className="text-sm font-semibold tracking-wide uppercase">Continúa abajo con el GPT público</span>
                    <ArrowDown className="w-6 h-6 animate-bounce text-slate-300 group-hover:text-brand-primary" />
                </button>

                <div id="demo-cta-gpt" className="w-full max-w-4xl bg-[#0b1120] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-10 text-center sm:text-left">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-brand-primary text-xs font-bold mb-4 border border-brand-primary/20 tracking-wider">
                                ACCESO A LA HERRAMIENTA OFICIAL
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">Usa el motor avanzado en ChatGPT</h3>
                            <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed max-w-xl">
                                La prueba local heurística está limitada. El verdadero <strong>Atestados Fast</strong> reside en un <span className="text-slate-200 font-medium">GPT público y especializado</span> que interactúa dinámicamente contigo, conoce normativa actualizada y estructura atestados formales completos.
                            </p>
                        </div>

                        <div className="shrink-0 flex flex-col gap-3.5 w-full sm:w-auto items-center sm:items-stretch">
                            <a
                                href={gptUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-primary hover:bg-[#e6c200] text-brand-dark font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,215,0,0.4)] w-full"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Abrir GPT público
                            </a>
                            <button
                                onClick={() => handleCopy(gptUrl, 'gpt_link_cta')}
                                className="bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-xl text-sm transition-all border border-slate-700/80 flex items-center justify-center gap-2 w-full group/copy"
                            >
                                {copiedSection === 'gpt_link_cta' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-500 group-hover/copy:text-white" />}
                                {copiedSection === 'gpt_link_cta' ? 'Enlace copiado' : 'Copiar enlace directo'}
                            </button>
                            <span className="text-[11px] text-slate-500 font-medium text-center mt-1">Requiere cuenta gratuita en OpenAI</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
