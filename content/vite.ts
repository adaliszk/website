// @ts-ignore

import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import caseParser from "camelcase";

const toPascalCase = (text: string) => caseParser(text, { pascalCase: true });

// noinspection JSUnusedGlobalSymbols
export async function qwikContent() {
    const vPrefix = "virtual:content";
    const rPrefix = `\0${vPrefix}`;

    // noinspection JSUnusedGlobalSymbols
    return {
        name: "qwik-content-manager",
        enforce: "pre",
        async buildStart() {
            await import("./config.ts");
        },
        resolveId(id: string) {
            if (!id.startsWith(vPrefix)) return;
            return rPrefix + id.replace(vPrefix, "");
        },
        load(id: string) {
            if (!id.startsWith(rPrefix)) return;
            const contentUri = id.replace(rPrefix, "");
            const rootPath = resolve(new URL("..", import.meta.url).pathname);
            const contentPath = resolve(`${rootPath}${contentUri}`);

            const files = readdirSync(contentPath);
            const fileList = files.filter((e) => e.match(/\.mdx?$/i));

            const index = fileList.map((entry) => {
                const fileName = entry.replace(/\.mdx?$/i, "");
                const pascalName = toPascalCase(fileName);
                const exportName = pascalName.replace(/^\d+/, "");
                return {
                    iky: fileName,
                    imp: `import imp${pascalName}Component, { frontmatter as imp${pascalName}Data } from "${contentPath}/${entry}";`,
                    eky: exportName,
                    exp: `export const ${exportName} = { frontmatter: imp${pascalName}Data, Content: imp${pascalName}Component };`,
                    map: `["${fileName}", ${exportName}],`,
                };
            });

            const script = ["// Automatically Generated!"];
            for (const { imp } of index) script.push(imp);
            for (const { exp } of index) script.push(exp);
            script.push("export const collection = new Map([");
            for (const { map } of index) script.push(`    ${map}`);
            script.push("])");

            return script.join("\n");
        },
    };
}
