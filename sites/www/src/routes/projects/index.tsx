import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";

import { type CollectionKey, collection } from "@adaliszk.io/content/projects";
import { SiteContent, SiteSidebar } from "@adaliszk.io/design";
import { matchByKey } from "@adaliszk/std";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
    title: "Open-Source Projects",
    meta: [
        {
            name: "description",
            content: "List of my recent public Projects",
        },
    ],
};

export const DEBUG_MODE = process.env.DEBUG_PAGE === "true";

export default component$(() => {
    const activeEntry = useSignal<CollectionKey>("12020-Web-Toolbox");

    // Filter and Order the project pages:
    // By default, it will contain all stages, but I only want to show ones that already has something.
    // TODO: Expose Indexed Map to avoid looping over items
    // The order is determined by the year a project has been started, I want to show the most recent one first.
    type StageType = "idea" | "prototyping" | "development" | "maintenance" | "archived";
    const projects = Array.from(collection.entries())
        .map(([key, data]) => ({ key, ...data }))
        .filter(({ frontmatter }) => {
            // noinspection JSUnusedGlobalSymbols
            const filter = matchByKey(frontmatter as { stage: StageType }, "stage", {
                prototyping: () => false,
                idea: () => false,
                _: () => true,
            });

            const value = filter.unwrapOr(false);
            DEBUG_MODE && console.debug("::component$ ->", { frontmatter, filter, value });
            return value;
        })
        .toReversed();

    return (
        <>
            <SiteSidebar
                mode={"static"}
                side={"left"}
                class={"row-start-1 row-end-2 col-span-4 hidden md:block"}>
                <nav class={"w-full my-3 sticky top-10"}>
                    {projects.map(({ key, frontmatter }) => (
                        <a
                            href={`#${frontmatter.slug}`}
                            key={frontmatter.slug}
                            style={activeEntry.value === key ? "width: calc(100% + 28px)" : ""}
                            class={twMerge(
                                "block my-2 p-2 pl-4",
                                activeEntry.value === key && "bg-accent/10 rounded-l-md",
                            )}>
                            <div class={"text-lg font-raleway font-normal"}>
                                {frontmatter.title}
                            </div>
                            <div class={"text-sm font-exo font-thin italic"}>
                                {frontmatter.description}
                            </div>
                        </a>
                    ))}
                </nav>
            </SiteSidebar>
            <SiteContent
                class={"row-start-1 row-end-2 col-span-12 md:col-span-8 flex flex-row flex-wrap"}>
                {projects.map(({ key, frontmatter, Content }) => (
                    <div class={"w-full scroll-pt-12"} key={frontmatter.slug} id={frontmatter.slug}>
                        <article
                            class={twMerge(
                                "my-3 py-2 px-4 border-l border-glass-20",
                                activeEntry.value === key && "border-accent",
                            )}>
                            <header
                                class={
                                    "flex flex-row justify-between content-end mb-2 border-b border-glass-10 border-dashed"
                                }>
                                <a
                                    class={"text-accent text-md block font-normal"}
                                    href={frontmatter.sourceLink}>
                                    {frontmatter.sourceLink}
                                </a>
                                <div class={"font-thin text-sm relative top-1"}>
                                    last updated: Yesterday
                                </div>
                            </header>
                            <div class={"markdown-content text-md font-thin font-exo text-justify"}>
                                <Content />
                            </div>
                        </article>
                    </div>
                ))}
            </SiteContent>
        </>
    );
});
