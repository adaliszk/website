import { webConfig } from "@adaliszk/web-compiler"
import { qwikVite } from "@builder.io/qwik/optimizer"
import { qwikCity } from "@builder.io/qwik-city/vite"
import pkg from "./package.json"

const makeRegex = (dep: string) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: object) => Object.keys(obj).map(makeRegex);

export default webConfig({
    https: false,
    tsconfig: "tsconfig.build.json",
    plugins: [qwikVite(), qwikCity()],
    server: {
        headers: {
            // Don't cache the server response in dev mode
            "Cache-Control": "public, max-age=0",
        },
    },
    preview: {
        headers: {
            // Do cache the server response in preview (non-adapter production build)
            "Cache-Control": "public, max-age=600",
        },
    },
    build: {
        target: "es2020",
        lib: {
            entry: ["./src/bundle.ts", "./src/components.ts"],
            formats: ["es"],
        },
        rollupOptions: {
            // externalize deps that shouldn't be bundled into the library
            external: [/^node:.*/, ...excludeAll(pkg.dependencies)],
        },
    },
});
