import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";

import { NavigationLink, NavigationMenu, SiteFooter, SiteHeader } from "@adaliszk.io/design";
import { useMenuContext } from "contexts";

// noinspection JSUnusedGlobalSymbols
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
    const menu = useMenuContext();
    return (
        <>
            <SiteHeader class={"relative z-20"}>
                <NavigationMenu activeLabel={menu.at(0)?.label ?? "Updates"}>
                    {menu.map((item) => (
                        <NavigationLink
                            label={item.label}
                            href={item.href}
                            isActive={url.href.match(item.activePattern) !== null}
                            key={item.label.toLowerCase()}
                        />
                    ))}
                </NavigationMenu>
            </SiteHeader>
            <div class={"w-full h-full  overflow-y-scroll relative z-0"}>
                <section
                    class={
                        "w-full max-w-screen-lg h-full mx-auto flex-grow grid grid-cols-12 auto-rows-max gap-3"
                    }>
                    <Slot />
                </section>
            </div>
        </>
    );
});
