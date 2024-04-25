import { defineCollection, z } from "astro:content";
import { ArticleSchema, ProjectSchema, TagSchema } from "./types.ts";

const messages = defineCollection({
    type: "content",
    schema: z.object({
        avatar: z.string().url().optional(),
        link: z.string().url().optional(),
    }),
});

const pages = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

export const collections = {
    tags: defineCollection({ type: "data", schema: TagSchema }),
    articles: defineCollection({ type: "content", schema: ArticleSchema }),
    projects: defineCollection({ type: "content", schema: ProjectSchema }),
    messages,
    pages,
};
