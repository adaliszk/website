import type { Config } from "tailwindcss";

import themes from "daisyui/src/theming/themes";
import daisyui from "daisyui";

const shared = {
    primary: "#add037",
    secondary: "#3056a9",

    "--rounded-box": "0.25rem",
    "--rounded-btn": "0.25rem",
    "--rounded-badge": "1.9rem",
    "--animation-btn": "0",
    "--animation-input": "0",
    "--btn-text-case": "uppercase",
    "--btn-focus-scale": "1.0",
    "--border-btn": "1px",
    "--tab-border": "1px",
    "--tab-radius": "0.5rem",
};

// noinspection JSUnusedGlobalSymbols
export default {
    jit: true,
    content: ["../content/**/*.mdx", "./**/*.astro", "./**/*.tsx"],
    plugins: [daisyui],
    daisyui: {
        logs: false,
        themes: [
            {
                light: {
                    // @ts-expect-error - This does exist, it just not typed
                    ...themes["[data-theme=light]"],
                    ...shared,
                    accent: "#586b1a",
                    neutral: "#eeeeee",
                    "base-100": "#f2f2f2",
                    "base-200": "#f9fafb",
                    "base-300": "#f0f0f0",
                    "--base-400": "#e0e0e0",
                    "--glass-opacity": "45%",
                    "--glass-reflex-opacity": "5%",
                    "--glass-blur": "20px",
                },
            },
            {
                dark: {
                    // @ts-expect-error - This does exist, it just not typed
                    ...themes["[data-theme=dark]"],
                    ...shared,
                    accent: "#819a24",
                    neutral: "#101010",
                    "base-100": "#0a0a0a",
                    "base-200": "#111111",
                    "base-300": "#1e1e1e",
                    "--base-400": "#2a2a2a",
                    "--glass-opacity": "3%",
                    "--glass-reflex-opacity": "1%",
                    "--glass-blur": "20px",
                },
            },
        ],
    },
} satisfies Config;
