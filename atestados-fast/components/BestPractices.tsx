import { FileWarning, Check } from 'lucide-react';

export default function BestPractices() {
    return (
        <section id="practicas" className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Checklist de Buenas Prácticas</h2>
                    <p className="text-slate-600">Guía indispensable a revisar de forma rutinaria antes del registro del atestado oficial.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2"><Check className="text-green-500" /> Así Sí (Aceptable)</h4>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm border-l-4 border-green-500 font-mono text-slate-700 italic">
                                "Sobre las 22:30, la dotación actuante es requerida en un bar próximo. Al llegar, nos entrevistamos con [TESTIGO 1], empleada del local, quien nos expone visualmente nerviosa que un individuo ha forcejeado..."
                            </div>
                            <p className="text-xs text-slate-500 mt-2">No se detallan datos reales, se prioriza claridad aséptica y anonimato durante la redacción asistida.</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2"><FileWarning className="text-red-500" /> Así NO (Ilegalidad/Riesgo)</h4>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm border-l-4 border-red-500 font-mono text-slate-700 italic">
                                "Resulta que hemos detenido a Juan Romero Pérez con DNI XXXXXXX-Y. Tenía medio gramo en el coche matrícula 2222-BBB, su cuñado gritaba..."
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Nunca envíes a un motor externo datos personales, de matrículas o afiliaciones explícitas que vulneren directamente el derecho de reserva de datos y la cadena de custodia.</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h4 className="text-lg font-bold text-slate-800 mb-4">Checklist Final (El semáforo instructor)</h4>
                        <div className="space-y-3">
                            {[
                                "¿He comprobado y eliminado todo nombre, matrícula, DNI o filiación real del prompt introducido?",
                                "¿He leído desde la primera a la última frase garantizando que la IA no se ha inventado actos procesales no realizados?",
                                "¿Menciona aspectos físicos como resistencia explícita? Deben coincidir quirúrgicamente con el parte de lesiones aportado.",
                                "¿Está especificado con minucioso detalle el momento de lectura de derechos si hubiere detenidos vinculados al relato?",
                            ].map((text, i) => (
                                <label key={i} className="flex flex-start gap-4 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                                    <input type="checkbox" className="w-5 h-5 rounded text-brand-primary accent-brand-primary mt-0.5 border-slate-300" />
                                    <span className="text-slate-700">{text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
