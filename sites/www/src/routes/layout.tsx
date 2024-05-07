import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

import {
    NavigationLink,
    NavigationMenu,
    SiteContent,
    SiteFooter,
    SiteHeader,
} from "@adaliszk.io/design";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.dev/docs/caching
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    const { url } = useLocation();
    return (
        <>
            <SiteHeader>
                <NavigationMenu>
                    <NavigationLink label={"Updates"} href={"/"} isActive={true} />
                    <NavigationLink label={"Projects"} href={"/projects"} />
                    <NavigationLink label={"Snippets"} href={"/snippets"} />
                    <NavigationLink label={"Tools"} href={"/tools"} />
                    <NavigationLink label={"Biography"} href={"/biography"} />
                    <NavigationLink label={"Blog"} href={"/blog"} />
                </NavigationMenu>
            </SiteHeader>

            <SiteContent>
                <Slot />
            </SiteContent>

            <SiteFooter />
        </>
    );
});
