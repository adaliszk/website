import type { PropsOf } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

export type SiteContentProps = PropsOf<"main"> & {};

export const SiteContent = component$<SiteContentProps>(({ class: classList, ...props }) => {
    return (
        <main
            class={twMerge("w-full h-full mx-auto px-2 py-6 flex-grow", classList?.toString())}
            id={"content"}
            {...props}>
            <Slot />
        </main>
    );
});
