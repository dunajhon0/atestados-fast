import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0F172A',
                    light: '#F8FAFC',
                    primary: '#5B6CFF',
                    secondary: '#7C3AED',
                    accent: '#10b981',
                }
            },
        },
    },
    plugins: [],
};
export default config;
