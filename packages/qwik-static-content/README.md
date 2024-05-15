# Static-Content Manager

Helper package that is inspired by Astro to manage Markdown files for any Vite projects. It exposes
a collection manager solution where you can define the content sources and their types. With that you
can retrieve the content by its name within your components.

1. Add the package to your project:
   ```bash
   pnpm add --save-dev @adaliszk/vite-static-content
   ```
2. Configure Vite
   ```typescript
   /// vite.config.ts
   import { qwikConfig } from "@adaliszk/qwik" // Handy meta-package
   import { staticContent } from "@adaliszk/vite-static-content"

   export default qwikConfig({
       plugins: [
           qwikVite(),
           qwikCity(),
           staticContent({
               mode: "import",
               imports: [
                   "file:../../content/config.ts", // 🡠 Local files to declare content collections
                   "github:adaliszk/journal/config.ts", // 🡠 Pulls data from a repository
               ]
           })
       ]
   })
   ```
3. Configure the content collections
   ```typescript
   /// ../../content/config.ts
   import { defineCollection, z } from "@adaliszk/vite-static-content"
   
   export const pages = defineCollection({
       format: "markdown",
       content: "./pages/*.{md,mdx}",
       schema: z.object({
           title: z.string(),
           summary: z.string().optional(),
           status: z.enum(["draft", "live", "archived"])
       }),
       indexes: {
          status: ({ status }) => status,
       }
   })
   
   export const tags = defineCollection({
       format: "json",
       content: "./tags/*.{json,yaml}",
       schema: z.object({
           label: z.string(),
           icon: z.string(),  
       })
   })
   ```
4. Use the collections in your project:
   ```typescript jsx
   /// src/routes/index.tsx
   import { component$ } from "@builder.io/qwik"
   import { pages } from "virtual:static-content"

   export default component$(() => {
       const livePages = pages.entriesBy('status').get('live')
     
       return (
           <section class={"flex flex-col"}>
               {livePages.map(({ id, data, Content }) => (
                   <article key={id} class={"m-4"}>
                       <h3>{data.title}</h3>
                       <Content />
                   </article>
               ))}
           </section>
       )
   })
   ```