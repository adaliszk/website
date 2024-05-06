import { defineCollection, z } from "@adaliszk/qwik-static-content"

// region: Shared Types

const HoloceneContent = z.object({
    title: z.string(),
    year: z.number().int(),
});

// const TagSchema = z.object({
//     name: z.string(),
//     slug: z.string(),
// });

// endregion

// export const pages = await defineCollection(import.meta.url, {
//     schema: z.object({
//         title: z.string(),
//         headline: z.string().optional(),
//     }),
//     format: "markdown",
//     name: "pages",
// });

export const projects = await defineCollection(import.meta.url, {
    schema: HoloceneContent.extend({
        stage: z.enum(["idea", "prototyping", "development", "maintenance", "archived"]),
        description: z.string().optional(),
        sourceLink: z.string().url().optional(),
        licenseLink: z.string().optional(),
        docsLink: z.string().url().optional(),
        tags: z.array(z.string()).optional(),
    }),
    format: "markdown",
    name: "projects",
});

// export const articles = await defineCollection(import.meta.url, {
//     schema: HoloceneContent.extend({
//         headline: z.string().optional(),
//         publishDate: z.coerce.date().optional(),
//         tags: z.array(z.string()).optional(),
//     }),
//     format: "markdown",
//     name: "articles",
// });
