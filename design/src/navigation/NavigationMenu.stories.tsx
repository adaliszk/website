import type { Meta, StoryObj } from "storybook-framework-qwik"
import type { NavigationMenuProps } from "./NavigationMenu.jsx"
import { NavigationMenu } from "./NavigationMenu.jsx"
import { SiteHeader } from "../layout/SiteHeader.jsx"

const items = [
    { label: "Updates", href: "/" },
    { label: "Resume", href: "/resume" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Tools", href: "/tools" },
    { label: "Snippets", href: "/snippets" },
];

type Story = StoryObj<NavigationMenuProps>

/**
 * The `<NavigationMenu />` component displays a horizontal menu of links with a sliding highlight effect.
 *
 * It requires an array of `NavigationMenuItem` objects to display the menu items:
 */
export default {
    title: "Navigation/NavigationMenu",
    component: NavigationMenu,
    render: (args) => (
        <NavigationMenu {...args} />
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
        items: {
            type: "NavigationMenuItem[]" as "string", // Hack to specify the type here
            description: "Items to display in the menu with their labels, hrefs, and optional regexp matchers",
            controls: {
                type: "object",
            },
            table: {
                defaultValue: {
                    summary: "[]",
                },
            },
        },
    },
} satisfies Meta<NavigationMenuProps>;

export const ShowcaseHidden: Story = {
    args: {
        items,
    },
};

export const Example = {
    parameters: {
        layout: "fullscreen",
    },
    render: () => (
        <>
            <SiteHeader>
                <NavigationMenu items={items} />
            </SiteHeader>
        </>
    )
}
