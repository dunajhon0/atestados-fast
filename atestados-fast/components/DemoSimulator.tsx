'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
    Presentation, Copy, Check, FileText, Loader2, AlertCircle,
    ChevronDown, ChevronRight, ExternalLink, Mic, MicOff,
    Plus, Trash2, ShieldCheck, MapPin, Calendar, Users,
    ClipboardCheck, Zap, Info, ArrowDown, Rocket, Clock, History, CalendarRange
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

type TemporalidadMode = 'exacto' | 'rango' | 'relativo';

export default function DemoSimulator() {
    // 1. STATE MANAGEMENT (Robust Source of Truth)
    const [formData, setFormData] = useState({
        tipo: 'Seguridad Ciudadana - Altercado Público',
        lugar: '',
        fecha: '', // Mantener por compatibilidad con borrador actual pero se nutre de temporalidad
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
        observaciones: '',
        // NUEVO: Temporalidad Pro
        temporalidad: {
            mode: 'exacto' as TemporalidadMode,
            fechaInicio: '',
            horaInicio: '',
            fechaFin: '',
            horaFin: '',
            relativoValor: 1,
            relativoUnidad: 'horas' as 'horas' | 'dias',
            relativoLabel: ''
        }
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [resultadoContext, setResultadoContext] = useState<any>(null);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    // 2. HANDLERS & LOGIC
    const addRole = useCallback((rol: string) => {
        const newParticipant = {
            id: Math.random().toString(36).substr(2, 9),
            rol,
            datos: ''
        };
        setFormData(prev => ({
            ...prev,
            participantes: [...prev.participantes, newParticipant]
        }));
    }, []); // Empty dependency array as setFormData is stable

    // 3. ANALYTICS & VALIDATION LAYER
    const analysis = useMemo(() => {
        const lowerRelato = formData.relato.toLowerCase();
        const { temporalidad } = formData;

        // Detection Logic
        const detections = {
            lugar: formData.lugar.trim().length > 3 ? formData.lugar : (lowerRelato.match(/en la calle ([^,.]+)/i)?.[1] || null),
            // Temporalidad Validation
            temporalidad: false as boolean | string,
            intervinientes: formData.participantes.length > 0,
            hechos: formData.relato.trim().length > 30,
            pruebas: Object.values(formData.pruebas).some(v => v) || formData.notasPruebas.length > 5,
        };

        // Validation of Temporalidad
        if (temporalidad.mode === 'exacto') {
            detections.temporalidad = temporalidad.fechaInicio && temporalidad.horaInicio ? 'OK' : false;
        } else if (temporalidad.mode === 'rango') {
            const start = new Date(`${temporalidad.fechaInicio}T${temporalidad.horaInicio}`);
            const end = new Date(`${temporalidad.fechaFin}T${temporalidad.horaFin}`);
            if (temporalidad.fechaInicio && temporalidad.horaInicio && temporalidad.fechaFin && temporalidad.horaFin) {
                detections.temporalidad = end >= start ? 'OK' : 'ERROR_RANGE';
            }
        } else {
            detections.temporalidad = 'OK'; // Relativo siempre tiene valor por defecto
        }

        const flags = {
            lesiones: lowerRelato.includes('lesion') || lowerRelato.includes('herid') || formData.pruebas.parte_medico,
            detenido: lowerRelato.includes('detenid') || lowerRelato.includes('arrest') || formData.participantes.some(p => p.rol.includes('Autor')),
        };

        return { detections, flags };
    }, [formData]);

    // 3. GENERATION ENGINE
    const generarBorradorEstructurado = () => {
        const { detections, flags } = analysis;
        const { tipo, relato, participantes, pruebas, notasPruebas, observaciones, temporalidad } = formData;

        // Dynamic Time Formatting
        let timeString = '[PENDIENTE: TEMPORALIDAD]';
        if (temporalidad.mode === 'exacto') {
            timeString = `el día ${temporalidad.fechaInicio} a las ${temporalidad.horaInicio} horas`;
        } else if (temporalidad.mode === 'rango') {
            timeString = `en el intervalo comprendido entre las ${temporalidad.horaInicio} del ${temporalidad.fechaInicio} y las ${temporalidad.horaFin} del ${temporalidad.fechaFin}`;
        } else {
            timeString = `hace aproximadamente ${temporalidad.relativoValor} ${temporalidad.relativoUnidad}`;
        }

        const fLugar = detections.lugar || '[PENDIENTE: UBICACIÓN EXACTA]';

        const resumen = `Actuación por ${tipo}. Hechos ocurridos ${timeString} en ${fLugar}. ${flags.lesiones ? 'Se constatan lesiones.' : ''}`;

        const cronologia = [
            `Recepción del aviso y llegada al lugar (${fLugar}).`,
            `Determinación del marco temporal: ${timeString}.`,
            detections.intervinientes ? `Identificación de ${participantes.length} personas implicadas.` : 'Identificación preliminar de partes.',
            `Instrucción del hecho y recopilación de indicios.`
        ];

        const comparecencia = `DILIGENCIA DE EXPOSICIÓN DE HECHOS

ANTE LA FUERZA ACTUANTE, comparecen los Agentes con NIP [ADJUNTE NIP] y exponen:

PRIMERO. - CIRCUNSTANCIAS DE LUGAR Y TIEMPO
Que los hechos tienen lugar en ${fLugar}, habiendo sucedido ${timeString}. La patrulla se persona en el lugar tras ser comisionada por [INDICAR ORIGEN].

SEGUNDO. - RELATO DE LOS HECHOS
Que, según se observa y se manifiesta, ${relato || '[PENDIENTE: DESCRIPCIÓN DE LOS HECHOS]'}.

TERCERO. - PERSONAS IMPLICADAS
${participantes.length > 0
                ? participantes.map(p => `* [${p.rol.toUpperCase()}] ${p.datos || '[SIN DATOS DE FILIACIÓN]'}`).join('\n')
                : '-- No se han aportado datos de filiación específicos --'}

CUARTO. - INDICIOS Y GESTIONES
${Object.entries(pruebas).filter(([_, v]) => v).map(([k]) => `* Consta: ${k.toUpperCase()}`).join('\n')}
${notasPruebas ? `Detalles técnicos: ${notasPruebas}\n` : ''}${observaciones ? `Gestiones realizadas: ${observaciones}` : ''}

PARA QUE ASÍ CONSTE Y SURTA LOS EFECTOS OPORTUNOS.`;

        return { resumen, cronologia, comparecencia, detections };
    };

    // 4. HANDLERS
    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (analysis.detections.temporalidad === 'ERROR_RANGE') {
            setError("Error: La fecha de fin no puede ser anterior a la de inicio.");
            return;
        }
        if (formData.relato.length < 10) {
            setError("El relato es demasiado corto para procesar.");
            return;
        }
        setError(null);
        setStatus('loading');
        setTimeout(() => {
            setResultadoContext(generarBorradorEstructurado());
            setStatus('success');
            document.getElementById('resultado-visor')?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };

    const setTemporalidad = (updates: Partial<typeof formData.temporalidad>) => {
        setFormData(prev => ({
            ...prev,
            temporalidad: { ...prev.temporalidad, ...updates }
        }));
    };

    const CheckIndicator = ({ active, label, error = false }: { active: boolean, label: string, error?: boolean }) => (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${error ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : active ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/50 border-white/5 text-slate-500'}`}>
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-rose-500 animate-pulse' : active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
    );

    const gptUrl = process.env.NEXT_PUBLIC_GPT_PUBLIC_URL || "#";

    return (
        <div className="container mx-auto px-4 max-w-7xl pb-24">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

                {/* COLUMNA IZQUIERDA: MOTOR */}
                <div className="lg:col-span-7 space-y-6">
                    <section className="bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <ArrowDown className="w-24 h-24" />
                        </div>

                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <ClipboardCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Consola de Datos</h2>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">SaaS Operational System</p>
                            </div>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-8">
                            {/* CATEGORÍA 1: MODALIDAD Y LUGAR */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Intervención</label>
                                    <select
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl h-12 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer hover:bg-white/[0.05]"
                                        value={formData.tipo}
                                        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                    >
                                        {INTERVENTION_TYPES.map(t => <option key={t.id} value={t.label} className="bg-slate-900">{t.label}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Ubicación</label>
                                    <div className="relative group/input">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Ej: Calle Gran Vía, 12"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl h-12 pl-11 pr-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
                                            value={formData.lugar}
                                            onChange={e => setFormData({ ...formData, lugar: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CATEGORÍA 2: TEMPORALIDAD PRO (NEW) */}
                            <div className="bg-blue-500/[0.01] border border-white/5 rounded-3xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" /> Temporalidad
                                    </label>
                                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                                        {(['exacto', 'rango', 'relativo'] as TemporalidadMode[]).map(m => (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => setTemporalidad({ mode: m })}
                                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${formData.temporalidad.mode === m ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="animate-in fade-in zoom-in-95 duration-300">
                                    {formData.temporalidad.mode === 'exacto' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-11 pr-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.fechaInicio} onChange={e => setTemporalidad({ fechaInicio: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="relative">
                                                    <History className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-11 pr-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.horaInicio} onChange={e => setTemporalidad({ horaInicio: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.temporalidad.mode === 'rango' && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="date" placeholder="Inicio" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.fechaInicio} onChange={e => setTemporalidad({ fechaInicio: e.target.value })} />
                                                <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.horaInicio} onChange={e => setTemporalidad({ horaInicio: e.target.value })} />
                                            </div>
                                            <div className="flex items-center justify-center py-1">
                                                <CalendarRange className="w-4 h-4 text-blue-500/40" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="date" placeholder="Fin" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.fechaFin} onChange={e => setTemporalidad({ fechaFin: e.target.value })} />
                                                <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs outline-none focus:border-blue-500/50" value={formData.temporalidad.horaFin} onChange={e => setTemporalidad({ horaFin: e.target.value })} />
                                            </div>
                                        </div>
                                    )}

                                    {formData.temporalidad.mode === 'relativo' && (
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {['Hoy', 'Ayer', 'Últimas 6h', 'Últimas 24h'].map(chip => (
                                                    <button
                                                        key={chip}
                                                        type="button"
                                                        onClick={() => {
                                                            const today = new Date().toISOString().split('T')[0];
                                                            if (chip === 'Hoy') setTemporalidad({ fechaInicio: today, relativoLabel: chip });
                                                            if (chip === 'Últimas 24h') setTemporalidad({ relativoValor: 24, relativoUnidad: 'horas', relativoLabel: chip });
                                                        }}
                                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:bg-blue-500 hover:text-white transition-all"
                                                    >
                                                        {chip}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs" value={formData.temporalidad.relativoValor} onChange={e => setTemporalidad({ relativoValor: parseInt(e.target.value) })} />
                                                <select className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-white text-xs" value={formData.temporalidad.relativoUnidad} onChange={e => setTemporalidad({ relativoUnidad: e.target.value as any })}>
                                                    <option value="horas" className="bg-slate-900">Horas</option>
                                                    <option value="dias" className="bg-slate-900">Días</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CATEGORÍA 3: NARRATIVA */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Narrativa Cruda</label>
                                <div className="relative group/text">
                                    <textarea
                                        rows={5}
                                        placeholder="Describe lo ocurrido. Ejemplo: La patrulla observa a un individuo..."
                                        className={`w-full bg-white/[0.03] border rounded-[24px] p-5 text-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none ${error && formData.relato.length < 10 ? 'border-rose-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
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

                            {/* CATEGORÍA 4: SUJETOS */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Sujetos Implicados</label>
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
                                                    placeholder="DNI, nombre o descripción..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-20 pr-4 text-white text-xs outline-none focus:border-blue-500/50"
                                                    value={p.datos}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        participantes: formData.participantes.map(x => x.id === p.id ? { ...x, datos: e.target.value } : x)
                                                    })}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, participantes: formData.participantes.filter(x => x.id !== p.id) })}
                                                className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ACCIÓN FINAL */}
                            <div className="pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <CheckIndicator active={analysis.detections.lugar !== null} label="Lugar" />
                                    <CheckIndicator active={analysis.detections.temporalidad === 'OK'} error={analysis.detections.temporalidad === 'ERROR_RANGE'} label="Tiempo" />
                                    <CheckIndicator active={analysis.detections.hechos} label="Hechos" />
                                    <CheckIndicator active={analysis.detections.intervinientes} label="Sujetos" />
                                </div>

                                <Button
                                    variant="ultra-contrast"
                                    size="lg"
                                    className="w-full h-16 group shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <Rocket className="w-5 h-5 fill-current" />
                                            <span className="text-sm font-black uppercase tracking-[0.1em]">Generar Borrador Estructurado</span>
                                        </div>
                                    )}
                                </Button>
                                {error && <p className="text-rose-400 text-[10px] font-black uppercase text-center mt-5 tracking-widest animate-pulse">{error}</p>}
                            </div>
                        </form>
                    </section>
                </div>

                {/* COLUMNA DERECHA: VISOR */}
                <div className="lg:col-span-5 relative h-full">
                    <div id="resultado-visor" className="sticky top-24 bg-[#050505]/90 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl flex flex-col transition-all border-l-blue-500/20">
                        {/* Header Visor */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">Output Profesional</span>
                                    <h3 className="text-white font-bold text-sm tracking-tight">Borrador de Diligencia</h3>
                                </div>
                            </div>
                            {resultadoContext && (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(resultadoContext.comparecencia);
                                        setCopiedSection('doc');
                                        setTimeout(() => setCopiedSection(null), 2000);
                                    }}
                                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5"
                                >
                                    {copiedSection === 'doc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        {/* Visor Area */}
                        <div className="flex-1 p-10 overflow-y-auto min-h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent_50%)]">
                            {!resultadoContext ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 select-none">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
                                        <Rocket className="w-12 h-12 text-blue-500 relative z-10" />
                                    </div>
                                    <div>
                                        <p className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-3">Motor Stand-by</p>
                                        <p className="text-slate-500 text-xs max-w-[240px] mx-auto leading-relaxed">Configura los parámetros tácticos e inicia la compilación del documento.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                                    {/* Resumen Card */}
                                    <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Zap className="w-12 h-12 text-blue-400" />
                                        </div>
                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                                            <Info className="w-3.5 h-3.5" /> Compilación Exitosa
                                        </h4>
                                        <p className="text-slate-200 text-xs leading-relaxed font-medium">{resultadoContext.resumen}</p>
                                    </div>

                                    {/* Document Text */}
                                    <div className="relative group/doc">
                                        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/5 to-transparent"></div>
                                        <pre className="text-[13px] font-mono text-slate-400 leading-[1.8] whitespace-pre-wrap selection:bg-blue-500/40 selection:text-white">
                                            {resultadoContext.comparecencia.split(/(\[PENDIENTE:[^\]]+\])/).map((part: string, i: number) =>
                                                part.startsWith('[PEND')
                                                    ? <span key={i} className="text-amber-500 font-black decoration-amber-500/30 underline-offset-4 underline">{part}</span>
                                                    : part
                                            )}
                                        </pre>
                                    </div>

                                    {/* Crono Footer */}
                                    <div className="space-y-4 pt-10 border-t border-white/5">
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Cronología de Actuación</h4>
                                        <div className="space-y-4">
                                            {resultadoContext.cronologia.map((item: string, i: number) => (
                                                <div key={i} className="flex gap-5 group">
                                                    <div className="w-px h-auto bg-white/5 relative">
                                                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 border-2 border-white/10 group-hover:border-blue-500/50 transition-all"></div>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400/80 leading-relaxed py-0.5 group-hover:text-slate-300 transition-colors">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Visor */}
                        <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
                            <span className="text-[8px] text-slate-600 font-black uppercase tracking-[0.5em]">Fast Redactor Engine • v4.2.0 • Encryption Enabled</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* BLOCK FINAL: GPT CALL */}
            <div className="mt-32 max-w-5xl mx-auto">
                <section className="relative bg-[#050505] border border-white/5 rounded-[56px] p-12 sm:p-24 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/[0.02] mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mb-10 border border-white/5">
                            Level Up Operations
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-white mb-10 tracking-tighter leading-tight italic">
                            ¿Necesitas el <br /> <span className="text-blue-500">Documento Oficial?</span>
                        </h2>
                        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-14 max-w-2xl mx-auto">
                            La simulación local estructura tus datos primarios. Para generar el atestado profesional interactuando con la normativa, pulsa el botón oficial.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                            <Link href={gptUrl} className="w-full sm:w-auto">
                                <Button variant="ultra-contrast" size="xl" className="w-full sm:px-14 h-18 group transition-all">
                                    <div className="flex items-center gap-4">
                                        <ExternalLink className="w-6 h-6" />
                                        <span className="text-lg">Compilar en GPT oficial</span>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
