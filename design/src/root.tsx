import { component$ } from "@builder.io/qwik";
import { NavigationLink, NavigationMenu, SiteContent, SiteFooter, SiteHeader } from "./components";

export default component$(() => {
    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <title>AdaLiszk.io Design System</title>
            </head>
            <body>
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

                <SiteContent>CONTENT</SiteContent>

                <SiteFooter />
            </body>
        </>
    );
});
