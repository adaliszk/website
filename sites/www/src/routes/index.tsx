import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { SiteContent } from "@adaliszk.io/design";

// noinspection JSUnusedGlobalSymbols
export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};

export default component$(() => {
    return (
        <SiteContent class={"col-span-12 row-start-1 row-end-2"}>
            <h1>Hi 👋</h1>
        </SiteContent>
    );
});
