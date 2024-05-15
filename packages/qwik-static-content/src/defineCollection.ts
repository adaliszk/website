import type { Result } from "@adaliszk/std";
import { createErr, createOk } from "@adaliszk/std";
import type { JSXOutput } from "@builder.io/qwik";
import type { ZodSchema, z } from "zod";

import { MarkdownParser } from "./formats/Markdown.js";

import { resolve } from "node:path";
import chokidar from "chokidar";

export type CollectionDefinition<SCHEMA extends ZodSchema, NAME extends string = string> = {
    name: NAME;
    format: "markdown" | "json";
    schema: ZodSchema;
};

export type CollectionEntry<SCHEMA extends ZodSchema> = {
    Content: () => JSXOutput;
    data: z.infer<SCHEMA>;
};

export type CollectionParser<SCHEMA extends ZodSchema, NAME extends string = string> = {
    parse(
        context: CollectionDefinition<SCHEMA, NAME>,
        baseUrl: string,
    ): Promise<Result<boolean, Error>>;
};

/**
 * Create a collection definition and parse the contents on-the-fly
 *
 * By default, it will use an internal parser to read directory contents on the same level where the definition
 * is declared, and it will generate an index file where all contents are pre-parsed for use.
 */
export async function defineCollection<SCHEMA extends ZodSchema, NAME extends string = string>(
    importPath: string,
    definition: CollectionDefinition<SCHEMA, NAME>,
): Promise<Result<CollectionDefinition<SCHEMA, NAME>, Error>> {
    const contentDir = resolve(new URL(`../${definition.name}`, importPath).pathname);
    const rootDir = resolve(new URL("../../..", import.meta.url).pathname);
    const contentPattern = [`${contentDir}/*.mdx`, `${contentDir}/*.md`];
    const watcher = chokidar.watch(contentPattern);

    const parseCollection = async (): Promise<
        Result<CollectionDefinition<SCHEMA, NAME>, Error>
    > => {
        console.log("\nParsing collection in:", contentDir.replace(rootDir, ""));
        switch (definition.format) {
            case "markdown":
                await new MarkdownParser<SCHEMA, NAME>().parse(definition, contentDir);
                return createOk(definition);
            case "json":
                return createErr(new Error("Not Implemented!"));
        }
    };

    watcher.on("change", async () => {
        await parseCollection();
        import.meta.hot?.invalidate();
    });

    return await parseCollection();
}
