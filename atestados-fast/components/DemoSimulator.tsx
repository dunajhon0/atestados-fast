'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
    Presentation, Copy, Check, FileText, Loader2, AlertCircle,
    ChevronDown, ChevronRight, ExternalLink, Mic, MicOff,
    Plus, Trash2, ShieldCheck, MapPin, Calendar, Users,
    ClipboardCheck, Zap, Info, ArrowDown, Rocket
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Configuration for tooltips and mapping
const INTERVENTION_TYPES = [
    { id: 'sc-altercado', label: 'Seguridad Ciudadana - Altercado Público', icon: <Users className="w-4 h-4" /> },
    { id: 'sv-alcoholemia', label: 'Seguridad Vial - Alcoholemia', icon: <MapPin className="w-4 h-4" /> },
    { id: 'dp-patrimonio', label: 'Delito Patrimonial - Robo/Hurto', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'violencia', label: 'Violencia / Amenazas', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'otros', label: 'Otro servicio recurrente', icon: <Zap className="w-4 h-4" /> },
];

export default function DemoSimulator() {
    // 1. STATE MANAGEMENT (Robust Source of Truth)
    const [formData, setFormData] = useState({
        tipo: 'Seguridad Ciudadana - Altercado Público',
        lugar: '',
        fecha: '',
        relato: '',
        participantes: [] as { id: string, rol: string, datos: string }[],
        pruebas: {
            testifical: false,
            documental: false,
            grafica: false,
            arma: false,
            drogas: false,
            cctv: false,
            parte_medico: false,
        },
        notasPruebas: '',
        observaciones: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [resultadoContext, setResultadoContext] = useState<any>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    // 2. ANALYTICS & VALIDATION LAYER (Apartado por Apartado)
    const analysis = useMemo(() => {
        const lowerRelato = formData.relato.toLowerCase();

        // Detection Logic
        const detections = {
            lugar: formData.lugar.trim().length > 3 ? formData.lugar : (lowerRelato.match(/en la calle ([^,.]+)/i)?.[1] || null),
            fecha: formData.fecha.trim().length > 5 ? formData.fecha : (lowerRelato.match(/el día ([^,.]+)/i)?.[1] || null),
            intervinientes: formData.participantes.length > 0,
            hechos: formData.relato.trim().length > 30,
            pruebas: Object.values(formData.pruebas).some(v => v) || formData.notasPruebas.length > 5,
            observaciones: formData.observaciones.trim().length > 5
        };

        const flags = {
            lesiones: lowerRelato.includes('lesion') || lowerRelato.includes('herid') || formData.pruebas.parte_medico,
            detenido: lowerRelato.includes('detenid') || lowerRelato.includes('arrest') || formData.participantes.some(p => p.rol.includes('Autor')),
            violencia: lowerRelato.includes('fuerza') || lowerRelato.includes('golpe') || lowerRelato.includes('amenaza'),
        };

        return { detections, flags };
    }, [formData]);

    // 3. GENERATION ENGINE (Solving [PENDIENTE] issue)
    const generarBorradorEstructurado = () => {
        const { detections, flags } = analysis;
        const { tipo, relato, participantes, pruebas, notasPruebas, observaciones } = formData;

        // Smart Mapping
        const fLugar = detections.lugar || '[PENDIENTE: UBICACIÓN EXACTA]';
        const fFecha = detections.fecha || '[PENDIENTE: FECHA/HORA]';

        // Result object construction
        const resumen = `Actuación por ${tipo}. Hechos ocurridos en ${fLugar} el ${fFecha}. ${flags.lesiones ? 'Se constatan lesiones.' : ''} ${flags.detenido ? 'Procedimiento con detenido.' : ''}`;

        const cronologia = [
            `Recepción del aviso y llegada al lugar (${fLugar}).`,
            `Aseguramiento de la zona y atención inicial.`,
            detections.intervinientes ? `Identificación de ${participantes.length} personas implicadas.` : 'Identificación preliminar de partes.',
            `Instrucción del hecho y recopilación de indicios.`
        ];

        // Construction of the formal document
        const comparecencia = `DILIGENCIA DE EXPOSICIÓN DE HECHOS

ANTE LA FUERZA ACTUANTE, comparecen los Agentes con NIP [ADJUNTE NIP] y exponen:

PRIMERO. - CIRCUNSTANCIAS DE LUGAR Y TIEMPO
Que los hechos tienen lugar en ${fLugar}, siendo aproximadamente las ${fFecha}. La patrulla se persona en el lugar tras ser comisionada por [INDICAR ORIGEN].

SEGUNDO. - RELATO DE LOS HECHOS
Que, según se observa y se manifiesta, ${relato || '[PENDIENTE: DESCRIPCIÓN DE LOS HECHOS]'}.

TERCERO. - PERSONAS IMPLICADAS
${participantes.length > 0
                ? participantes.map(p => `* [${p.rol.toUpperCase()}] ${p.datos || '[SIN DATOS DE FILIACIÓN]'}`).join('\n')
                : '-- No se han aportado datos de filiación específicos en este formulario --'}

CUARTO. - INDICIOS Y GESTIONES
${Object.entries(pruebas).filter(([_, v]) => v).map(([k]) => `* Consta: ${k.toUpperCase()}`).join('\n')}
${notasPruebas ? `Detalles técnicos: ${notasPruebas}\n` : ''}${observaciones ? `Gestiones realizadas: ${observaciones}` : ''}

PARA QUE ASÍ CONSTE Y SURTA LOS EFECTOS OPORTUNOS.`;

        return { resumen, cronologia, comparecencia, detections };
    };

    // 4. HANDLERS
    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.relato.length < 10) {
            setError("El relato es demasiado corto para procesar una estructura válida.");
            return;
        }
        setError(null);
        setStatus('loading');
        setTimeout(() => {
            setResultadoContext(generarBorradorEstructurado());
            setStatus('success');
            window.scrollTo({ top: document.getElementById('resultado-visor')?.offsetTop || 0, behavior: 'smooth' });
        }, 800);
    };

    const addRole = (rol: string) => {
        setFormData(prev => ({
            ...prev,
            participantes: [...prev.participantes, { id: Math.random().toString(36).substring(7), rol, datos: '' }]
        }));
    };

    // Render Helpers
    const CheckIndicator = ({ active, label }: { active: boolean, label: string }) => (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${active ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/50 border-white/5 text-slate-500'}`}>
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] border-emerald-400' : 'bg-slate-700'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
    );

    const gptUrl = process.env.NEXT_PUBLIC_GPT_PUBLIC_URL || "#";

    return (
        <div className="container mx-auto px-4 max-w-7xl pb-24">
            <div className="grid lg:grid-cols-12 gap-12 items-start">

                {/* COLUMNA IZQUIERDA: MOTOR DE ESTRUCTURACIÓN */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="bg-[#0A0A0B] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ArrowDown className="w-24 h-24" />
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <ClipboardCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Consola de Datos</h2>
                                <p className="text-slate-500 text-xs">Mapeo heurístico en tiempo real</p>
                            </div>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-6">
                            {/* TIPO E INTERVENCIÓN */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Modalidad</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                                        value={formData.tipo}
                                        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                    >
                                        {INTERVENTION_TYPES.map(t => <option key={t.id} value={t.label} className="bg-slate-900">{t.label}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Lugar</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Calle, establecimiento, N-XX..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-12 pl-11 pr-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                                            value={formData.lugar}
                                            onChange={e => setFormData({ ...formData, lugar: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* FECHA Y RELATO */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Hechos y Observaciones</label>
                                <div className="relative group/text">
                                    <textarea
                                        rows={6}
                                        placeholder="Describe lo ocurrido cronológicamente. Nuestro sistema identificará automáticamente los hitos nucleares del relato..."
                                        className={`w-full bg-white/5 border rounded-[24px] p-5 text-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none group-hover/text:bg-white/[0.07] ${error ? 'border-rose-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                                        value={formData.relato}
                                        onChange={e => setFormData({ ...formData, relato: e.target.value })}
                                    />
                                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsListening(!isListening)}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                                        >
                                            <Mic className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* PARTICIPANTES DINÁMICOS */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Personas Implicadas</label>
                                    <div className="flex gap-2">
                                        {['Víctima', 'Autor', 'Testigo'].map(role => (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => addRole(role)}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                                + {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {formData.participantes.map(p => (
                                        <div key={p.id} className="flex gap-3 animate-in fade-in slide-in-from-top-2">
                                            <div className="relative flex-1">
                                                <div className={`absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${p.rol === 'Víctima' ? 'bg-emerald-500/20 text-emerald-400' : p.rol === 'Autor' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                    {p.rol}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="DNI, nombre o descripción física..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-20 pr-4 text-white text-xs outline-none focus:border-blue-500/50"
                                                    value={p.datos}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        participantes: formData.participantes.map(x => x.id === p.id ? { ...x, datos: e.target.value } : x)
                                                    })}
                                                />
                                            </div>
                                            <button
                                                onClick={() => setFormData({ ...formData, participantes: formData.participantes.filter(x => x.id !== p.id) })}
                                                className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.participantes.length === 0 && (
                                        <div className="text-center py-4 border-2 border-dashed border-white/5 rounded-2xl text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                                            No hay intervinientes añadidos
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CAPA DE VERIFICACIÓN (REAL-TIME AUDIT) */}
                            <div className="pt-4 border-t border-white/5">
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <CheckIndicator active={analysis.detections.lugar !== null} label="Ubicación" />
                                    <CheckIndicator active={analysis.detections.fecha !== null} label="Temporalidad" />
                                    <CheckIndicator active={analysis.detections.hechos} label="Narrativa" />
                                    <CheckIndicator active={analysis.detections.intervinientes} label="Sujetos" />
                                </div>

                                <Button
                                    variant="ultra-contrast"
                                    size="lg"
                                    className="w-full h-16 group"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Rocket className="w-5 h-5 fill-current" />
                                            <span>Generar Borrador Estructurado</span>
                                        </>
                                    )}
                                </Button>
                                {error && <p className="text-rose-400 text-[10px] font-black uppercase text-center mt-4 tracking-widest">{error}</p>}
                            </div>
                        </form>
                    </section>
                </div>

                {/* COLUMNA DERECHA: VISOR DE BORRADOR / DOCUMENTO */}
                <div className="lg:col-span-5 h-full">
                    <div id="resultado-visor" className="sticky top-24 bg-[#050505] border border-blue-500/10 rounded-[32px] overflow-hidden shadow-2xl shadow-blue-500/5 min-h-[600px] flex flex-col transition-all">
                        {/* Header del Visor */}
                        <div className="bg-white/5 p-6 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-white">Borrador Operativo</span>
                            </div>
                            {resultadoContext && (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(resultadoContext.comparecencia);
                                        setCopiedSection('doc');
                                        setTimeout(() => setCopiedSection(null), 2000);
                                    }}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                >
                                    {copiedSection === 'doc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        {/* Cuerpo del Documento */}
                        <div className="flex-1 p-8 overflow-y-auto bg-[url('/grid.svg')] bg-repeat">
                            {!resultadoContext ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <ArrowDown className="w-12 h-12 text-blue-500 animate-bounce" />
                                    <div>
                                        <p className="text-white font-black uppercase text-xs tracking-widest mb-2">Esperando entrada</p>
                                        <p className="text-slate-500 text-[10px] max-w-[200px] mx-auto leading-relaxed">Completa el formulario y pulsa generar para visualizar la estructura del atestado.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in duration-700">
                                    {/* Resumen Ejecutivo */}
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-2xl">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                                            <Info className="w-3 h-3" /> Resumen del Caso
                                        </h4>
                                        <p className="text-slate-200 text-xs leading-relaxed">{resultadoContext.resumen}</p>
                                    </div>

                                    {/* El Documento Formal */}
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full"></div>
                                        <pre className="text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-wrap selection:bg-blue-500/30 selection:text-white">
                                            {resultadoContext.comparecencia.split(/(\[PENDIENTE:[^\]]+\])/).map((part: string, i: number) =>
                                                part.startsWith('[PEND')
                                                    ? <span key={i} className="bg-amber-500/20 text-amber-500 px-1 rounded font-bold underline decoration-amber-500/30 hover:bg-amber-500/30 transition-colors cursor-pointer">{part}</span>
                                                    : part
                                            )}
                                        </pre>
                                    </div>

                                    {/* Cronología */}
                                    <div className="space-y-4 pt-8 border-t border-white/5">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cronología Estructurada</h4>
                                        <div className="space-y-3">
                                            {resultadoContext.cronologia.map((item: string, i: number) => (
                                                <div key={i} className="flex gap-4 group">
                                                    <div className="w-px h-auto bg-white/10 relative">
                                                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-white/20 group-hover:bg-blue-500 transition-colors"></div>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 py-0.5">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sello de Calidad */}
                        <div className="bg-white/[0.02] p-4 text-center border-t border-white/5">
                            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">IA Heurística Local v4.0 • Sin conexión externa</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BLOCK FINAL: UPGRADE TO OFFICIAL GPT */}
            <div className="mt-32 relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full"></div>
                <section className="relative bg-[#050505] border border-white/5 rounded-[48px] p-12 sm:p-20 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-500/20">
                            The Professional Upgrade
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                            ¿Necesitas un documento <br /> <span className="text-blue-500">oficial completo</span>?
                        </h2>
                        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
                            Este simulador local estructura tus datos, pero el verdadero <span className="text-white">Atestados Fast</span> se encuentra en el GPT Público Especializado de OpenAI.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href={gptUrl} className="w-full sm:w-auto">
                                <Button variant="ultra-contrast" size="xl" className="w-full sm:px-12 group shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                                    <div className="flex items-center gap-3">
                                        <ExternalLink className="w-6 h-6" />
                                        <span>Abrir GPT Público</span>
                                    </div>
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="xl"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    navigator.clipboard.writeText(gptUrl);
                                    setCopiedSection('gpt');
                                    setTimeout(() => setCopiedSection(null), 2000);
                                }}
                            >
                                {copiedSection === 'gpt' ? 'Enlace Copiado' : 'Copiar Enlace'}
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                            <div className="flex flex-col items-center">
                                <ShieldCheck className="w-8 h-8 text-slate-500 mb-2" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Seguro</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Zap className="w-8 h-8 text-slate-500 mb-2" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Instantáneo</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Landmark className="w-8 h-8 text-slate-500 mb-2" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Oficial</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Additional components used inside the main simulator for clean code but kept here for local context
function Landmark(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="3" y1="22" x2="21" y2="22" />
            <line x1="6" y1="18" x2="6" y2="11" />
            <line x1="10" y1="18" x2="10" y2="11" />
            <line x1="14" y1="18" x2="14" y2="11" />
            <line x1="18" y1="18" x2="18" y2="11" />
            <polygon points="12 2 20 7 4 7" />
        </svg>
    );
}
