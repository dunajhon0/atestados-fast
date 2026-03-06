"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"

const TEMPLATES = [
    {
        id: "hurto",
        name: "Atestado por Hurto",
        content: "DILIGENCIA DE EXPOSICIÓN DE LOS HECHOS\n\nEn [LOCALIDAD], a las [HORA] horas del día [FECHA].\n\nComparece el Agente con carné profesional [NÚMERO], para hacer constar que, encontrándose de servicio, procedió a la detención de [INVESTIGADO] por la presunta comisión de un delito de hurto en [LUGAR].\n\nHECHOS:\n1. Siendo las [HORA], se recibe aviso de la Sala...\n2. Una vez en el lugar, la parte perjudicada manifiesta que...\n3. Se procede a la identificación de...\n\nDiligencia que se extiende para que conste y surta los efectos oportunos."
    },
    {
        id: "alcoholemia",
        name: "Atestado por Alcoholemia",
        content: "DILIGENCIA DE INTERVENCIÓN Y PRUEBAS DE ALCOHOLEMIA\n\nEn [LOCALIDAD], a las [HORA] horas del día [FECHA].\n\nComparece la Fuerza Actuante para hacer constar que, observando al vehículo [MATRÍCULA] circular de forma errática por la vía [VÍA], se procede a darle el alto.\n\nSÍNTOMAS OBSERVADOS:\n- Halitosis alcohólica: [SÍ/NO]\n- Habla pastosa: [SÍ/NO]\n\nPRUEBAS:\n1ª Prueba a las [HORA]: [RESULTADO] mg/l.\n2ª Prueba a las [HORA]: [RESULTADO] mg/l.\n\nSe informa de los derechos..."
    },
    {
        id: "violencia",
        name: "Atestado por V.G. / V.D.",
        content: "DILIGENCIA DE VALORACIÓN POLICIAL DEL RIESGO (VPR)\n\nEn [LOCALIDAD], a las [HORA] horas del día [FECHA].\n\nHECHOS:\nSe recibe llamada de alerta en el domicilio sito en [DIRECCIÓN]. A la llegada de la dotación, la víctima manifiesta que su pareja/expareja [NÚMERO_ID] le ha agredido/amenazado.\n\nACTUACIÓN:\nSe procede a la detención y lectura de derechos de [INVESTIGADO].\nSe acompaña a la víctima al centro médico [NOMBRE_CENTRO] obteniendo el parte de lesiones adjunto.\n\n..."
    }
]

export function TemplateBuilder() {
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
    const [content, setContent] = useState(TEMPLATES[0].content);

    const handleTemplateSelect = (templateId: string) => {
        const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
        setSelectedTemplate(template);
        setContent(template.content);
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${selectedTemplate.id}_plantilla.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        element.remove();
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Tipo de Plantilla</h3>
                <div className="flex flex-col gap-2">
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleTemplateSelect(t.id)}
                            className={`p-3 text-left rounded-xl transition-all border ${selectedTemplate.id === t.id
                                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-bold shadow-sm"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                {t.name}
                            </div>
                        </button>
                    ))}
                </div>
                <div className="bg-blue-50 p-4 border border-blue-100 rounded-lg mt-6 text-sm text-blue-800">
                    <p><strong>Nota:</strong> Estas plantillas son esqueletos estructurales. Recuerda reemplazar los corchetes <kbd className="bg-white border border-blue-200 px-1 rounded mx-1">[]</kbd> con tus datos reales de la intervención en tu propio editor, nunca aquí de forma que quede guardado.</p>
                </div>
            </div>

            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Borrador</h3>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" /> .txt
                        </Button>
                        <CopyButton text={content} variant="primary" />
                    </div>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-[500px] p-4 bg-slate-900 text-slate-50 font-mono text-sm leading-relaxed rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary placeholder-slate-600 resize-none selection:bg-brand-primary/30"
                />
            </div>
        </div>
    )
}
