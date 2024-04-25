import { component$, Slot } from "@builder.io/qwik";
import {
    Icon,
    NavigationIconLink,
    type NavigationLinkData,
    NavigationMenu,
} from "components";
import { ThemeSwitcher } from "features";

export type SiteHeaderProps = {
    links: NavigationLinkData[];
    pathname: string;
};

export const SiteHeader = component$<SiteHeaderProps>(({ pathname, links }) => {
    return (
        <section class={"w-full bg-primary text-black"}>
            <header class={"navbar content max-w-screen-lg mx-auto"}>
                <nav class={"navbar-start w-full"}>
                    <NavigationIconLink
                        link={"/"}
                        label={"Back to the Homepage"}
                        class={"ml-2 mr-6"}
                        icon={
                            <Icon
                                name={"adaliszk"}
                                class={"!w-10 !h-10"}
                                size={48}
                            />
                        }
                    />
                    <NavigationMenu pathname={pathname} links={links} />
                </nav>

                <div class={"navbar-end"}>
                    <ThemeSwitcher class={"btn btn-ghost btn-square"} />
                    <NavigationIconLink
                        link={"https://twitter.com/adaliszk"}
                        label={"X Profile"}
                        icon={"twitter"}
                    />
                    <NavigationIconLink
                        link={"https://github.com/adaliszk"}
                        label={"GitHub Profile"}
                        icon={"github"}
                    />
                </div>
            </header>
            <header class={"max-w-screen-lg mx-auto"}>
                <Slot />
            </header>
        </section>
    );
});
