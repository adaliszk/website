import { defineConfig } from "./src/bundle";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    content: ["./lib/**/*.js", "./src/**/*.{html,css,tsx,ts}", "./src/*.{html,css,tsx,ts}"],
});
