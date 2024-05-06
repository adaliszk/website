import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
// @ts-expect-error - This is a valid import but TS doesn't see the type
import baseConfig from "./vite.config";

export default extendConfig(baseConfig, () => {
    return {
        build: {
            ssr: true,
            rollupOptions: {
                input: ["@qwik-city-plan"],
            },
        },
        plugins: [
            staticAdapter({
                origin: "https://www.adaliszk.io",
            }),
        ],
    };
});
