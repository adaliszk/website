import { webConfig } from "@adaliszk/web-compiler";
import { qwikVite } from "@builder.io/qwik/optimizer";
import pkg from "./package.json";

const makeRegex = (dep: string) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: object) => Object.keys(obj).map(makeRegex);

// noinspection JSUnusedGlobalSymbols
export default webConfig({
    https: false,
    tsconfig: "tsconfig.build.json",
    plugins: [qwikVite()],
    publicDir: "../resources",
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
