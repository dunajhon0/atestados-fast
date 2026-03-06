import { Metadata } from 'next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { PrintButton } from '@/components/ui/PrintButton';
import { CookieSettingsButton } from '@/components/ui/CookieSettingsButton';

export const metadata: Metadata = {
    title: 'Portal Legal y Privacidad | Atestados Fast',
    description: 'Términos de uso, política de privacidad y cookies de Atestados Fast.',
};

export default function LegalPage() {
    return (
        <div className="pb-24 pt-12 print-safe">
            <div className="container mx-auto px-4 max-w-4xl mb-12 text-center no-print">
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
                    Legal y Privacidad
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Políticas de transparencia aplicables a atestadosfast.dunajhon.com
                </p>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* We use print utilities so only active content shows neatly when printing */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">

                    <Tabs defaultValue="privacidad" className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-100 gap-4 no-print">
                            <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                                <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
                                <TabsTrigger value="cookies">Cookies</TabsTrigger>
                                <TabsTrigger value="terminos">Términos</TabsTrigger>
                            </TabsList>
                            <PrintButton />
                        </div>

                        <TabsContent value="privacidad" id="privacidad" className="prose prose-slate max-w-none print:block">
                            <h2 className="text-2xl font-bold mb-4">Política de Privacidad Integral</h2>
                            <p><strong>Última actualización:</strong> Octubre 2024</p>

                            <h3>1. Información de Identificación Común</h3>
                            <p>El responsable del funcionamiento de este sitio (Atestados Fast) no pertenece oficialmente a ningún organismo institucional público gubernamental. Esta es una herramienta experimental y orientativa.</p>

                            <h3>2. Qué información (NO) recopilamos</h3>
                            <p><strong>Borradores y Textos:</strong> Todo el proceso de generación de los borradores, reestructuración y plantillas se ejecuta al 100% en el cliente (tu propio navegador). Nuestro servidor <strong>JAMÁS recibe, lee, intercepta ni procesa</strong> el contenido del texto que describes en los cuadros de texto de las herramientas.</p>

                            <h3>3. Sobre OpenAI (API / GPT Público)</h3>
                            <p>Si usas nuestra versión pública de GPT, la interacción se realiza a través de la interfaz de OpenAI sujeta a sus propias <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">políticas de privacidad</a> y acuerdos de procesamiento de datos de terceros.</p>

                            <h3>4. Analítica técnica</h3>
                            <p>Solo procesaremos métricas agregadas y anonimizadas de los botones (e.g. &quot;Se generó un documento&quot;, &quot;Se cambió una vista&quot;) exclusivamente para saber el conteo estadístico sin vinculación a IPs ni usuarios concretos.</p>
                        </TabsContent>

                        <TabsContent value="cookies" id="cookies" className="prose prose-slate max-w-none print:hidden">
                            <h2 className="text-2xl font-bold mb-4">Política de Cookies y Consentimiento</h2>

                            <h3>¿Qué son las Cookies?</h3>
                            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo local para recordar preferencias, analizar tráfico y poder ofrecer funciones como la visualización de anuncios publicitarios.</p>

                            <h3>¿Cuáles usamos?</h3>
                            <ul>
                                <li><strong>Estrictamente Necesarias:</strong> Recordar tu preferencia sobre el propio banner de cookies. (Técnicas, primera parte).</li>
                                <li><strong>Publicidad (AdSense):</strong> Solo si nos das permiso, se cargarán scripts de tercero (Google AdSense) que pueden emplear cookies de DoubleClick para personalizar o medir sus anuncios según la normativa pertinente.</li>
                            </ul>

                            <h3>Gestión de Consentimiento</h3>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl my-6">
                                <p className="mb-4 text-sm font-medium">Puedes modificar tus preferencias de cookies en cualquier momento utilizando el siguiente botón que volverá a abrir el gestor principal de la web (CMP).</p>
                                <CookieSettingsButton />
                            </div>
                        </TabsContent>

                        <TabsContent value="terminos" id="terminos" className="prose prose-slate max-w-none print:hidden">
                            <h2 className="text-2xl font-bold mb-4">Términos de Uso / Aviso Legal</h2>
                            <p>El acceso y uso a Atestados Fast atribuye la condición de Usuario, el cual acepta expresamente estas condiciones:</p>

                            <ol className="list-decimal pl-5 space-y-4 mt-6">
                                <li><strong>Naturaleza de la Web:</strong> Se trata de una utilidad de tipo formativo/guía. No nos responsabilizamos del uso indebido que se haga del atestado o minuta resultante en un procedimiento oficial real. La responsabilidad última del atestado es siempre y exclusivamente del agente instructor o actuante que lo firma y ratifica.</li>
                                <li><strong>Obligación de Anonimización:</strong> El Usuario se compromete mediante el uso del servicio a <strong>NUNCA INTRODUCIR Datos de Carácter Personal (PII) reales</strong>, datos bancarios, domiciliarios ni similares.</li>
                                <li><strong>Disponibilidad:</strong> Al ser un sitio mantenido de forma independiente por el autor (Dunajhon), el acceso continuo o la no-desaparición de la plataforma no se pueden garantizar.</li>
                            </ol>
                        </TabsContent>

                    </Tabs>

                </div>
            </div>
        </div>
    );
}
