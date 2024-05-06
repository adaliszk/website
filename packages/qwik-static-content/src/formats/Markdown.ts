import type { CollectionDefinition, CollectionParser } from "../defineCollection.js"
import type { ZodSchema } from "zod"

import type { Result } from "@adaliszk/std"
import { createOk } from "@adaliszk/std"

import { readdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import caseParser from "camelcase"

const toPascalCase = (text: string) => caseParser(text, { pascalCase: true });

export class MarkdownParser<SCHEMA extends ZodSchema, NAME extends string = string>
    implements CollectionParser<SCHEMA, NAME>
{
    public async parse(
        context: CollectionDefinition<SCHEMA, NAME>,
        contentDir: string,
    ): Promise<Result<boolean, Error>> {
        await this.writeIndex(contentDir, context.name);
        return createOk(true);
    }

    private async writeIndex(contentDir: string, name: string) {
        const files = await readdir(contentDir);
        const content = files.filter((e) => e.match(/\.mdx?$/i));
        const index = content.map((entry) => {
            const name = entry.replace(/\.mdx?$/i, "");
            const pascalName = toPascalCase(name);
            const exportName = pascalName.replace(/^\d+/, "");
            return {
                iky: name,
                imp: `import imp${pascalName}Component, { frontmatter as imp${pascalName}Data } from "./${entry}";`,
                eky: exportName,
                exp: `export const ${exportName} = { frontmatter: imp${pascalName}Data, Content: imp${pascalName}Component };`,
                map: `["${name}", ${exportName}],`,
            };
        });

        const indexContent = [
            "// Do not modify this file manually!",
            `// File generated: ${new Date().toISOString()}`,
        ];
        for (const { imp } of index) indexContent.push(imp);
        for (const { exp } of index) indexContent.push(exp);
        const collectionKey = index.map(({ iky }) => `"${iky}"`).join(" | ");
        indexContent.push(
            `export type MarkdownImport = typeof ${index[0].eky};`,
            `export type CollectionKey = ${collectionKey};`,
            'declare module "@adaliszk/qwik-markdown-manager" {',
            "    interface CollectionKeysByName {",
            `        ${name}: ${collectionKey}`,
            "    }",
            "}",
            "export const collection = new Map<CollectionKey, MarkdownImport>([",
        );
        for (const { map } of index) indexContent.push(`    ${map}`);
        indexContent.push("])");

        await writeFile(resolve(contentDir, "index.ts"), `${indexContent.join("\n")}\n`, {
            encoding: "utf-8",
            flag: "w+",
        });
    }
}
