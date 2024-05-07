import { defineConfig } from "@adaliszk.io/design";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    content: [
        "../../node_modules/@adaliszk.io/design/**/*.js",
        "./node_modules/@adaliszk.io/design/**/*.js",
        "./src/**/*.{html,css,tsx,ts}",
        "./src/*.{html,css,tsx,ts}",
    ],
});
