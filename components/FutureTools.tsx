import { Calculator, CalendarClock } from 'lucide-react';

export default function FutureTools() {
    const drogasUrl = process.env.NEXT_PUBLIC_SUBDOMINIO_DROGAS || '#';
    const turnosUrl = process.env.NEXT_PUBLIC_SUBDOMINIO_TURNOS || '#';

    return (
        <section className="bg-brand-dark py-16 text-white border-y-4 border-brand-primary">
            <div className="container mx-auto px-4 max-w-5xl text-center">
                <h2 className="text-3xl font-bold mb-4">Próximas Herramientas Atestados Fast</h2>
                <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                    Nos encontramos trabajando meticulosamente para aportar nuevas soluciones tecnológicas gratuitas (y seguras) con estricto apego legal y metodológico, orientadas exclusivamente a facilitar cálculos y cuadrar jornadas del colectivo policial.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <a href={drogasUrl} className="block group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-8 rounded-2xl transition-all cursor-not-allowed">
                        <Calculator className="w-10 h-10 text-slate-500 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2 text-slate-300">Calculadora Analítica (Próximamente)</h3>
                        <p className="text-sm text-slate-500">Herramienta legal estandarizada para estructurar intervenciones basadas en sustancias incautadas. Completamente anónima y referenciada. Actualmente en fase piloto.</p>
                    </a>

                    <a href={turnosUrl} className="block group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-8 rounded-2xl transition-all cursor-not-allowed">
                        <CalendarClock className="w-10 h-10 text-slate-500 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2 text-slate-300">Gestor de Turnos (Próximamente)</h3>
                        <p className="text-sm text-slate-500">Generador de cuadrantes con cadencias asimétricas. Integrará cálculo de descansos obligatorios. Herramienta visual e imprimible.</p>
                    </a>
                </div>
            </div>
        </section>
    );
}
