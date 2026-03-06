"use client"

import { useState } from "react"
import { ShieldCheck, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"

export function AnonymizerTool() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [foundMatches, setFoundMatches] = useState<number>(0)

    const handleAnonymize = () => {
        let result = input;

        // RegEx patterns
        const patterns = [
            // DNI / NIE (e.g. 12345678A, X1234567A)
            { regex: /\b([A-Z]?\d{7,8}[A-Z])\b/gi, replacement: "[DNI/NIE]" },
            // Telephone numbers (Spanish format approx)
            { regex: /\b(\+34|0034)?(?:6|7|8|9)\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/g, replacement: "[TELÉFONO]" },
            // Emails
            { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: "[EMAIL]" },
            // License plates (e.g. 1234ABC, 1234 ABC)
            { regex: /\b(\d{4}[\s-]*[B-DF-HJ-NP-TV-Z]{3})\b/gi, replacement: "[MATRÍCULA]" },
        ];

        let matches = 0;
        patterns.forEach(p => {
            // count matches
            const m = result.match(p.regex);
            if (m) matches += m.length;
            result = result.replace(p.regex, p.replacement);
        });

        setFoundMatches(matches);
        setOutput(result);
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Pega tu borrador con datos reales aquí:
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none text-sm"
                        placeholder="El DNI 12345678Z conducía el vehículo 9999BBB y se le llamó al 600123456..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        Esta operación se realiza 100% en tu navegador. Nada se envía al servidor.
                    </p>
                    <Button onClick={handleAnonymize} className="mt-4 w-full" disabled={!input.trim()}>
                        <ShieldCheck className="w-4 h-4 mr-2" /> Detectar y Anonimizar
                    </Button>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Resultado Seguro:
                    </label>
                    <div className="w-full h-48 p-3 border border-emerald-200 bg-emerald-50 rounded-lg overflow-y-auto text-sm whitespace-pre-wrap">
                        {output || <span className="text-emerald-700/50 italic">El texto limpio aparecerá aquí...</span>}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-xs font-semibold text-emerald-700">
                            {output && (
                                <span className="flex items-center">
                                    <Check className="w-3 h-3 mr-1" /> {foundMatches} patrones censurados.
                                </span>
                            )}
                        </p>
                        {output && <CopyButton text={output} variant="primary" />}
                    </div>
                </div>
            </div>
        </div>
    )
}
