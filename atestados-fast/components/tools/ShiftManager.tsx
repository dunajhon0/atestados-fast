"use client"

import { useState } from "react"
import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ShiftManager() {
    const [pattern, setPattern] = useState("MMTTNNLLLL"); // M=Mañana, T=Tarde, N=Noche, L=Libre
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [weeks, setWeeks] = useState(4);
    const [generated, setGenerated] = useState<string>("");

    const handleGenerate = () => {
        // Generate .ICS file based on pattern
        if (!pattern || !startDate) return;

        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Atestados Fast//Gestor de Turnos//ES\n";

        let currentDate = new Date(startDate);
        const patternArray = pattern.split("");
        const totalDays = weeks * 7;

        for (let i = 0; i < totalDays; i++) {
            const currentShift = patternArray[i % patternArray.length];
            if (currentShift !== 'L') {
                const dateStr = currentDate.toISOString().split('T')[0].replace(/-/g, '');
                // Simple mapping for hours. Just an approximation.
                let startHour = "060000"; let endHour = "140000";
                if (currentShift === 'T') { startHour = "140000"; endHour = "220000"; }
                if (currentShift === 'N') { startHour = "220000"; endHour = "060000"; } // would need +1 day logic for real ICS

                icsContent += `BEGIN:VEVENT\nSUMMARY:Turno ${currentShift}\nDTSTART:${dateStr}T${startHour}Z\nDTEND:${dateStr}T${endHour}Z\nEND:VEVENT\n`;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        icsContent += "END:VCALENDAR";
        setGenerated(icsContent);
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generated], { type: 'text/calendar' });
        element.href = URL.createObjectURL(file);
        element.download = `cuadrante_${startDate}.ics`;
        document.body.appendChild(element);
        element.click();
        element.remove();
    }

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Patrón (M, T, N, L)</label>
                    <input
                        type="text"
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value.toUpperCase())}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-brand-primary focus:border-transparent text-sm font-mono tracking-widest"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha Inicio (Día 1 del patrón)</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-brand-primary text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Semanas a generar</label>
                    <input
                        type="number"
                        min="1" max="52"
                        value={weeks}
                        onChange={(e) => setWeeks(Number(e.target.value))}
                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-brand-primary text-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={() => setGenerated("")}>Limpiar</Button>
                <Button onClick={handleGenerate}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Generar Calendario
                </Button>
            </div>

            {generated && (
                <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="font-bold text-emerald-800">Calendario .ICS Generado con éxito</p>
                        <p className="text-sm text-emerald-700 mt-1">Contiene {weeks * 7} días procesados. Puedes importarlo en Google Calendar o Apple Calendar.</p>
                    </div>
                    <Button variant="primary" onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700 border-none">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar .ICS
                    </Button>
                </div>
            )}
        </div>
    )
}
