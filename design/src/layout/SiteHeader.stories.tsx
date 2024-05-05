import type { Meta } from "storybook-framework-qwik"
import type { SiteHeaderProps } from "./SiteHeader.jsx"
import { SiteHeader } from "./SiteHeader.jsx"

export default {
    title: "Layout/SiteHeader",
    component: SiteHeader,
    argTypes: {
        class: {
            description: "Classes to apply to the outer container",
            type: "string",
        },
    },
} satisfies Meta<SiteHeaderProps>;

export const ShowcaseHidden = () => (
    <>
        <SiteHeader>
            <h1 class={"text-xl p-4"}>Lorem ipsum dolor sit amet...</h1>
        </SiteHeader>
    </>
);
