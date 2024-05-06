import type { JSXOutput } from "@builder.io/qwik";

declare module "*.mdx" {
    export const frontmatter: Record<string, unknown>;
    export = () => JSXOutput;
}

declare module "*.md" {
    export const frontmatter: Record<string, unknown>;
    export = () => JSXOutput;
}
