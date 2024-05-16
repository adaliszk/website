import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export function defineConfig(config?: Partial<Config>): Config {
    return {
        jit: true,
        content: ["./src/**/*.{html,css,tsx,ts}", "./src/*.{html,css,tsx,ts}"],
        plugins: [typography],
        theme: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                light: "#e0e0e0",
                black: "#000000",
                dark: "#1e1e1e",
                primary: "#add037",
                secondary: "#3056a9",
                accent: "#9cbd2c",
                neutral: "#242424",
                glass: {
                    10: "rgba(224, 224, 224, 0.1)",
                    20: "rgba(224, 224, 224, 0.2)",
                    30: "rgba(224, 224, 224, 0.3)",
                    40: "rgba(224, 224, 224, 0.4)",
                    50: "rgba(224, 224, 224, 0.5)",
                },
                pane: {
                    10: "rgba(54, 54, 54, 0.1)",
                    20: "rgba(54, 54, 54, 0.2)",
                    30: "rgba(54, 54, 54, 0.3)",
                    40: "rgba(54, 54, 54, 0.4)",
                    50: "rgba(54, 54, 54, 0.4)",
                },
            },
            fontFamily: {
                display: ["Raleway", "sans-serif"],
                body: ["Exo", "sans-serif"],
                sans: ["Exo", "sans-serif"],
                serif: ["Raleway", "serif"],
                mono: ["Jetbrains Mono", "monospace"],
                exo: ["Exo", "sans-serif"],
                jetbrains: ["Jetbrains Mono", "monospace"],
                raleway: ["Raleway", "sans-serif"],
            },
            extend: {
                transitionProperty: {
                    horizontal: "transform, width",
                    vertical: "transform, height",
                    spacing: "margin, padding",
                },
            },
        },
        ...(config ?? {}),
    };
}
