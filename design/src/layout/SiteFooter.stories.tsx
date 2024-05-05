import type { Meta } from "storybook-framework-qwik"
import type { SiteFooterProps } from "./SiteFooter.jsx"
import { SiteFooter } from "./SiteFooter.jsx"

export default {
    title: "Layout/SiteFooter",
    component: SiteFooter,
    argTypes: {
        class: {
            description: "Classes to apply to the outer container",
            type: "string",
        },
    },
} satisfies Meta<SiteFooterProps>;

export const ShowcaseHidden = () => (
    <>
        <SiteFooter>
            <h1 class={"text-xl p-4"}>Lorem ipsum dolor sit amet...</h1>
        </SiteFooter>
    </>
);
