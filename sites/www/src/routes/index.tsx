import { type Component, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { SiteContent } from "@adaliszk.io/design";
import { type PageFlagType, useMenuContext } from "contexts";

import Projects from "./projects";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
    title: "Ádám Liszkai",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};

const Page: Record<Capitalize<keyof PageFlagType>, Component> = {
    Projects,
};

export default component$(() => {
    const homePage = useMenuContext().at(0);
    if (!homePage) {
        return (
            <SiteContent class={"col-span-12 row-start-1 row-end-2"}>
                <h1>Will be back shortly...</h1>
                <p>The page is currently in maintenance mode, please come back later!</p>
            </SiteContent>
        );
    }

    const pageName = homePage.key.toCapitalize() as Capitalize<keyof PageFlagType>;
    const Content = Page[pageName];

    return <Content />;
});
