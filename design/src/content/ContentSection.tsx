import { matchByValue } from "@adaliszk/std";
import { type PropsOf, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { useContentContext } from "./_ContentContext";

export type ContentSectionProps = PropsOf<"section"> & {};

export const ContentSection = component$<ContentSectionProps>(({ class: classList, ...props }) => {
    const context = useContentContext();
    const section = useSignal<HTMLElement | undefined>();
    const sectionIndex = useSignal<number | undefined>();
    // noinspection JSUnusedGlobalSymbols
    const style = twMerge(
        "w-full scroll-pt-12 my-3 py-2 px-4 transition-border duration-500 ease-in-out",
        twMerge(
            matchByValue(context.side, {
                right: () => "border-l",
                left: () => "border-r",
            }).unwrap(),
            context.activeSection.value + 1 === sectionIndex.value
                ? "border-glass-30"
                : "border-glass-20",
        ),
    );

    useVisibleTask$(
        () => {
            const container = section.value;
            if (!container) return;
            sectionIndex.value = context.sectionReference.push(container.id);
            context.sectionOffset.push(container.offsetTop - 36);
        },
        { strategy: "document-ready" },
    );

    return (
        <section class={twMerge(style, classList?.toString())} ref={section} {...props}>
            <Slot />
        </section>
    );
});
