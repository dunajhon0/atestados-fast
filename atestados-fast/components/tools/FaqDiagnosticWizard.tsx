"use client"

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"

const QUESTIONS = [
    {
        text: "¿Vas a introducir nombres reales completos de los ciudadanos?",
        options: [
            { answer: "Sí", result: "rojo" },
            { answer: "No, usaré iniciales o seudónimos", result: "verde" }
        ]
    },
    {
        text: "¿El atestado requiere describir violencia física extrema o contenido sensible ilegal para procesar?",
        options: [
            { answer: "Sí", result: "rojo" },
            { answer: "No, es una intervención estándar", result: "verde" }
        ]
    },
    {
        text: "¿Tienes intención de copipegar el resultado sin realizar una lectura minuciosa previa?",
        options: [
            { answer: "Sí, confío ciegamente", result: "rojo" },
            { answer: "No, haré una revisión humana como agente", result: "verde" }
        ]
    }
];

export function FaqDiagnosticWizard() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0); // 0 errors = good to go

    const handleAnswer = (result: "rojo" | "verde") => {
        if (result === "rojo") setScore(s => s + 1);
        setStep(s => s + 1);
    }

    const reset = () => {
        setStep(0);
        setScore(0);
    }

    if (step >= QUESTIONS.length) {
        const isSuccess = score === 0;
        return (
            <div className={`p-6 border rounded-xl text-center ${isSuccess ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {isSuccess ? <Check className="w-8 h-8" /> : <div className="text-3xl font-bold">!</div>}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isSuccess ? 'text-emerald-900' : 'text-red-900'}`}>
                    {isSuccess ? "Diagnóstico: Listo para usar" : "Diagnóstico: Riesgo Detectado"}
                </h3>
                <p className={`mb-6 text-sm ${isSuccess ? 'text-emerald-800' : 'text-red-800'}`}>
                    {isSuccess
                        ? "Tu planteamiento es seguro. Entiendes las limitaciones y proteges los datos."
                        : `Has marcado ${score} respuesta(s) de riesgo. Por favor, lee atentamente el apartado de Buenas Prácticas y las FAQs.`}
                </p>
                <button onClick={reset} className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Volver a realizar
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-6 tracking-widest uppercase">
                <span>Pregunta {step + 1} de {QUESTIONS.length}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-8">{QUESTIONS[step].text}</h3>
            <div className="space-y-3">
                {QUESTIONS[step].options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(opt.result as "rojo" | "verde")}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-all flex items-center justify-between group"
                    >
                        <span className="font-medium text-slate-700 group-hover:text-brand-dark">{opt.answer}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary" />
                    </button>
                ))}
            </div>
        </div>
    )
}
