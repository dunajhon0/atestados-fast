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
                    dark: '#0b1120',
                    light: '#f8fafc',
                    primary: '#4f46e5',
                    secondary: '#7c3aed',
                    accent: '#10b981',
                }
            },
        },
    },
    plugins: [],
};
export default config;
