import { defineConfig } from "./src/bundle";

export default defineConfig({
    content: ["./src/**/*.{html,css,tsx,ts}", "./src/*.{html,css,tsx,ts}"],
});
