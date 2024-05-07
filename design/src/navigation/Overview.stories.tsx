import type { Meta, StoryObj } from "storybook-framework-qwik";
import { SiteHeader } from "../layout/SiteHeader.tsx";
import { NavigationLink } from "./NavigationLink.tsx";
import type { NavigationMenuProps } from "./NavigationMenu.tsx";
import { NavigationMenu } from "./NavigationMenu.tsx";
type Story = StoryObj<NavigationMenuProps>;

/**
 * The `<NavigationMenu />` component displays a horizontal menu of links with a sliding highlight effect.
 *
 * It is used in cooperation with `<NavigationLink />` components:
 */
export default {
    title: "Navigation/NavigationMenu",
    component: NavigationMenu,
    render: (args) => (
        <NavigationMenu {...args}>
            <NavigationLink label={"Updates"} href={"/"} isActive={true} />
            <NavigationLink label={"Projects"} href={"/projects"} />
            <NavigationLink label={"Snippets"} href={"/snippets"} />
            <NavigationLink label={"Tools"} href={"/tools"} />
            <NavigationLink label={"Biography"} href={"/biography"} />
            <NavigationLink label={"Blog"} href={"/blog"} />
        </NavigationMenu>
    ),
    parameters: {
        layout: "padded",
    },
    argTypes: {
        class: {
            type: "string",
            description: "Classes to apply to the outer container",
            controls: {
                type: "text",
            },
            table: {
                defaultValue: {
                    summary: "(empty)",
                },
            },
        },
    },
} satisfies Meta<NavigationMenuProps>;

// noinspection JSUnusedGlobalSymbols
export const ShowcaseHidden = () => (
    <NavigationMenu>
        <NavigationLink label={"Updates"} href={"/"} isActive={true} />
        <NavigationLink label={"Projects"} href={"/projects"} />
        <NavigationLink label={"Snippets"} href={"/snippets"} />
        <NavigationLink label={"Tools"} href={"/tools"} />
        <NavigationLink label={"Biography"} href={"/biography"} />
        <NavigationLink label={"Blog"} href={"/blog"} />
    </NavigationMenu>
);

// noinspection JSUnusedGlobalSymbols
export const Example = {
    parameters: {
        layout: "fullscreen",
    },
    render: () => (
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
        </>
    ),
};
