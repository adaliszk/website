import type { RequestHandler } from "@builder.io/qwik-city"
import { useLocation } from "@builder.io/qwik-city"
import { component$, Slot } from "@builder.io/qwik"

import type { NavigationMenuItem } from "@adaliszk.io/design/compents"
import { NavigationMenu, SiteContent, SiteFooter, SiteHeader } from "@adaliszk.io/design/components"

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
    const navLinks: NavigationMenuItem[] = [
        {
            label: "Projects",
            match: /\/?|\/projects/i,
            href: "/projects",
        },
        {
            label: "Biography",
            match: /\/biography/i,
            href: "/biography",
        },
        // {
        //     label: "Articles",
        //     match: /\/blog/i,
        //     href: "/blog",
        // },
    ]

    return (
        <>
            <SiteHeader>
                <NavigationMenu currentUrl={url.href} items={navLinks} />
            </SiteHeader>

            <SiteContent>
                <Slot />
            </SiteContent>

            <SiteFooter />
        </>
    );
});
