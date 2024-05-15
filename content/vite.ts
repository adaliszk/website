// noinspection JSUnusedGlobalSymbols
export async function qwikContent() {
    // noinspection JSUnusedGlobalSymbols
    return {
        name: "qwik-content-manager",
        async buildStart() {
            await import("./config.ts");
        },
    };
}
