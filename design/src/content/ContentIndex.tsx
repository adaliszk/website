import { type PropsOf, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { Slot, component$, useSignal } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { useContentContext } from "./_ContentContext";

export type ContentIndexProps = PropsOf<"nav"> & {};

export const ContentIndex = component$<ContentIndexProps>(({ class: classList, ...props }) => {
    const highlightContainer = useSignal<HTMLElement | undefined>();
    const context = useContentContext();

    useTask$(() => {
        context.highlightContainer = highlightContainer;
    });

    useVisibleTask$(() => {
        context.updateHighlight(context);
    });

    return (
        <nav
            class={twMerge("w-full my-3 sticky top-10", classList?.toString())}
            ref={highlightContainer}
            {...props}>
            <div
                style={`width: calc(100% + 28px); height: ${context.highlightHeight}px; transform: translateY(${context.highlightOffset}px);`}
                class={
                    context.highlightHeight > 0 &&
                    twMerge(
                        "absolute z-0 left-0 right-0 transition-vertical duration-500 ease-in-out",
                        "bg-accent/10 rounded-l-md select-none pointer-events-none",
                    )
                }
            />
            <Slot />
        </nav>
    );
});
