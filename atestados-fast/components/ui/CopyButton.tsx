"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "./Button"

interface CopyButtonProps {
    text: string;
    className?: string;
    label?: string;
    variant?: "outline" | "ghost" | "primary" | "secondary";
}

export function CopyButton({ text, className = "", label = "Copiar", variant = "outline" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                document.body.prepend(textArea);
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    }

    return (
        <Button
            variant={variant}
            size="sm"
            className={className}
            onClick={handleCopy}
        >
            {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copiado" : label}
        </Button>
    )
}
