import { type AnyEntryMap, reference, z } from "astro:content";

// region: Shared Types

export const HoloceneContent = z.object({
    title: z.string(),
    year: z.number().int(),
});

export const TagSchema = z.object({
    name: z.string(),
    icon: z.string().describe("SVG path or use reference"),
    slug: z.string(),
});

export type TagId = keyof AnyEntryMap["tags"];
export type TagReference = { id: TagId; collection: "tags" };
export type TagData = z.infer<typeof TagSchema>;
export type Tag = TagReference & { data: TagData };

// endregion

// region: Blog Content

export const ArticleSchema = HoloceneContent.extend({
    description: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    tags: z.array(reference("tags")).optional(),
});

export type ArticleId = keyof AnyEntryMap["articles"];
export type ArticleReference = { id: ArticleId; collection: "articles" };
export type ArticleData = z.infer<typeof ArticleSchema>;
export type Article = ArticleReference & { data: ArticleData };

// endregion

// region: Project Content

export const ProjectSchema = HoloceneContent.extend({
    stage: z.enum([
        "idea",
        "prototyping",
        "in-development",
        "in-maintenance",
        "archived",
    ]),
    description: z.string().optional(),
    sourceLink: z.string().url().optional(),
    licenseLink: z.string().optional(),
    docsLink: z.string().url().optional(),
    tags: z.array(reference("tags")).optional(),
});

export type ProjectId = keyof AnyEntryMap["projects"];
export type ProjectReference = { id: ProjectId; collection: "projects" };
export type ProjectData = z.infer<typeof ProjectSchema>;
export type Project = ProjectReference & { data: ProjectData };

// endregion
