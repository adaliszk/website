import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

export function defineConfig(config?: Partial<Config>): Config {
    return {
        jit: true,
        content: [
            "./node_modules/@adaliszk.io/design/**/*.js",
            "./src/**/*.{html,css,tsx,ts}",
            "./src/*.{html,css,tsx,ts}",
        ],
        plugins: [typography],
        theme: {
            colors: {
                white: "#ffffff",
                black: "#000000",
                primary: "#add037",
                secondary: "#3056a9",
                accent: "#819a24",
                neutral: "#101010",
                background: "#1e1e1e",
                foreground: "#e0e0e0",
            },
            fontFamily: {
                display: ["Oswald", "Helvetica", "sans-serif"],
                body: ["Inconsolata", "Helvetica", "sans-serif"],
                sans: ["Inconsolata", "sans-serif"],
                serif: ["Inconsolata", "serif"],
            },
        },
        ...(config ?? {}),
    };
}
