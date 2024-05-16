// noinspection JSUnusedGlobalSymbols

import type { JSXOutput } from "@builder.io/qwik";

export declare module "virtual:content/projects" {
    export type CollectionKey = string;
    export const collection: Map<
        string,
        {
            frontmatter: Record<string, string | number | string[] | number[] | boolean>;
            Content: () => JSXOutput;
        }
    >;
}
