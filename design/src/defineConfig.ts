import type { Config } from "tailwindcss"

import typography from "@tailwindcss/typography"

import daisyThemes from "daisyui/src/theming/themes"
import daisyui from "daisyui"

import { cwd } from "node:process"

const theme = daisyThemes as Record<"light" | "dark", Record<string, string>>;

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

export function defineConfig(config?: Partial<Config>): Config {
    const rootPath = new URL(".", cwd()).pathname;

    if (config?.content && Array.isArray(config.content)) {
        config.content = config.content.map((file) => {
            if (typeof file === "string") {
                return file.replace(/^\.\//, rootPath);
            }
            return file;
        });
    }
    
    return {
        jit: true,
        content: [
            `${rootPath}node_modules/@adaliszk.io/design/**/*.js`,
            `${rootPath}src/**/*.{html,css,tsx,ts}`,
            `${rootPath}src/*.{html,css,tsx,ts}`
        ],
        plugins: [typography, daisyui],
        theme: {
            fontFamily: {
                display: ["Oswald", "Helvetica", "sans-serif"],
                body: ["Inconsolata", "Helvetica", "sans-serif"],
                sans: ['Inconsolata', 'sans-serif'],
                serif: ['Inconsolata', 'serif'],
            },
        },
        daisyui: {
            logs: false,
            themes: [
                {
                    light: {
                        ...theme.light,
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
                        ...theme.dark,
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
        ...(config ?? {}),
    };
}
