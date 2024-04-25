import { defineConfig } from "astro/config";
import { withPreset } from "@adaliszk/astro-sdk";

// import cloudflare from '@astrojs/cloudflare'
import qwik from "@qwikdev/astro";

// https://astro.build/config
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    site: "https://adaliszk.io",
    output: "static",
    // adapter: cloudflare(),
    integrations: withPreset([qwik()]),
    experimental: {
        contentCollectionCache: true,
        contentCollectionJsonSchema: true,
        globalRoutePriority: true,
    },
    devToolbar: {
        enabled: true,
    },
    prefetch: true,
    vite: {
        resolve: { preserveSymlinks: true },
        build: {
            target: "esnext",
        },
    },
});
