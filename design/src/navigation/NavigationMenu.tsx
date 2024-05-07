import type { PropsOf } from "@builder.io/qwik";
import { $, Slot, component$, useSignal, useStore } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import {
    type NavigationContextSchema,
    setNavigationContext,
    updateHighlight,
} from "./NavigationContext.ts";

export type NavigationMenuProps = PropsOf<"nav">;

export const NavigationMenu = component$<NavigationMenuProps>(({ class: classList, ...props }) => {
    const container = useSignal<HTMLElement | undefined>();
    const context = useStore<NavigationContextSchema>({
        updateHighlight: $(updateHighlight),
        highlightOffset: 0,
        highlightWidth: 0,
        container,
    });
    setNavigationContext(context);

    return (
        <nav
            class={twMerge("flex flex-row relative z-10", classList?.toString())}
            onMouseLeave$={() => updateHighlight(context)}
            ref={container}
            {...props}>
            <div
                style={`width: ${context.highlightWidth}px; transform: translateX(${context.highlightOffset}px);`}
                class={twMerge(
                    "absolute z-20 top-0 bottom-0 transition-all duration-500 ease-in-out",
                    "rounded-md border border-black/5 bg-accent/30 select-none",
                )}
            />
            <Slot />
        </nav>
    );
});
