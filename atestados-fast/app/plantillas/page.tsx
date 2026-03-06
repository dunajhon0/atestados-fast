import { Metadata } from 'next';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { TemplateBuilder } from '@/components/tools/TemplateBuilder';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';

export const metadata: Metadata = {
    title: 'Plantillas y Glosario | Atestados Fast',
    description: 'Esqueletos y plantillas base para diferentes tipos de intervención policial y glosario rápido de términos legales.',
};

const GLOSARIO = [
    { term: "Diligencia", def: "Actuación o trámite que se lleva a cabo en un procedimiento administrativo o judicial, dejando constancia por escrito." },
    { term: "Atestado", def: "Conjunto de diligencias policiales instruidas para la averiguación de un delito y descubrimiento de sus autores." },
    { term: "Investigado", def: "Persona a la que, en la fase de instrucción, se le atribuye la posible comisión de un hecho punible." },
    { term: "VPR", def: "Valoración Policial del Riesgo. Instrumento utilizado en los casos de Violencia de Género." },
    { term: "Efectos Intervenidos", def: "Objetos o instrumentos relacionados con el delito que son incautados para ser puestos a disposición judicial." }
];

export default function PlantillasPage() {
    return (
        <div className="pb-16 pt-12">
            <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Plantillas Base
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Descarga esqueletos pre-estructurados para no partir desde cero. Útiles para aquellos días en los que tu Jefatura no te proporciona un formato actualizado.
                </p>
            </div>

            <ToolLayout
                title="Constructor de Plantillas"
                description="Selecciona el tipo de intervención, adapta el borrador directamente en el navegador y descárgalo o cópialo. Los placeholders [ENTRE_CORCHETES] son los campos que tú deberás rellenar con datos reales en tu editor de texto seguro una vez descargado."
            >
                <TemplateBuilder />
            </ToolLayout>

            {/* Glosario Rápido */}
            <div className="container mx-auto px-4 max-w-4xl mt-20 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Glosario Rápido (Top 5 Términos)</h2>
                <div className="bg-white border text-center md:text-left border-slate-200 rounded-2xl p-6 shadow-sm">
                    <Accordion type="single" className="w-full">
                        {GLOSARIO.map((item, i) => (
                            <AccordionItem key={i} title={<span className="font-bold text-brand-dark">{item.term}</span>}>
                                {item.def}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
