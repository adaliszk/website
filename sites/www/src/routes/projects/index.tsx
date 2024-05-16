import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { collection } from "virtual:content/projects";
import {
    ContentContextProvider,
    ContentIndex,
    ContentIndexItem,
    ContentSection,
    SiteContent,
    SiteSidebar,
} from "@adaliszk.io/design";
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

export const DEBUG_MODE = process?.env.DEBUG_PAGE === "true";

export default component$(() => {
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
        <ContentContextProvider side={"right"} defaultHeight={104}>
            <SiteSidebar
                mode={"static"}
                side={"left"}
                class={"row-start-1 row-end-2 col-span-4 hidden md:block"}>
                <ContentIndex>
                    {projects.map(({ key, frontmatter }) => (
                        <ContentIndexItem
                            target={frontmatter.slug}
                            title={frontmatter.title}
                            description={frontmatter.description}
                            key={key}
                        />
                    ))}
                </ContentIndex>
            </SiteSidebar>
            <SiteContent
                class={"row-start-1 row-end-2 col-span-12 md:col-span-8 flex flex-row flex-wrap"}>
                {projects.map(({ key, frontmatter, Content }) => (
                    <ContentSection key={key} id={frontmatter.slug}>
                        <header
                            class={
                                "flex flex-row justify-between mb-2 border-b border-glass-10 border-dashed"
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
                        <div class={"markdown-content text-md font-thin text-justify"}>
                            <Content />
                        </div>
                    </ContentSection>
                ))}
            </SiteContent>
        </ContentContextProvider>
    );
});
