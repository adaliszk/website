import type { Meta } from "storybook-framework-qwik";
import type { SiteContentProps } from "./SiteContent.jsx";
import { SiteContent } from "./SiteContent.jsx";

export default {
    title: "Layout/SiteContent",
    component: SiteContent,
    argTypes: {
        class: {
            description: "Classes to apply to the outer container",
            type: "string",
        },
    },
} satisfies Meta<SiteContentProps>;

export const ShowcaseHidden = () => (
    <>
        <SiteContent>
            <h1 class={"text-xl p-4"}>Lorem ipsum dolor sit amet...</h1>
        </SiteContent>
    </>
);
