import type { PropsOf } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

export type SiteSidebarProps = PropsOf<"aside"> & {
    mode: "static" | "drawer";
    side: "left" | "right";
};

export const SiteSidebar = component$<SiteSidebarProps>(
    ({ mode, side, class: classList, ...props }) => {
        return (
            <aside class={twMerge("w-full h-full px-2 py-6", classList?.toString())} {...props}>
                <Slot />
            </aside>
        );
    },
);
