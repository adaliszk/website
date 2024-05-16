import { type PropsOf, useVisibleTask$ } from "@builder.io/qwik";
import { $, Slot, component$, useSignal, useStore } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { useContentContext } from "./_ContentContext";

export type ContentIndexItemSchema = {
    target: string;
    title: string;
    description: string;
};

export type ContentIndexItemProps = PropsOf<"a"> & ContentIndexItemSchema;

export const ContentIndexItem = component$<ContentIndexItemProps>(
    ({ target, title, description, class: classList, ...props }) => {
        const style = twMerge("block my-2 p-2 pl-4 rounded-l-md");
        const item = useSignal<HTMLElement | undefined>();
        const context = useContentContext();

        useVisibleTask$(
            () => {
                const container = item.value;
                if (!container) return;
                context.indexOffset.push(container.offsetTop);
            },
            { strategy: "document-ready" },
        );

        return (
            <a
                href={`#${target}`}
                class={twMerge(style, classList?.toString())}
                onMouseEnter$={() => context.updateHighlight(context)}
                onMouseLeave$={() => context.updateHighlight(context)}
                ref={item}
                {...props}>
                <div class={"text-lg font-raleway font-normal"}>{title}</div>
                <div class={"text-sm font-exo font-thin italic"}>{description}</div>
            </a>
        );
    },
);
