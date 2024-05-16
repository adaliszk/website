import { type PropsOf, useVisibleTask$ } from "@builder.io/qwik";
import { $, Slot, component$, useSignal, useStore } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import {
    type NavigationContextSchema,
    calculateLabelWidth,
    setNavigationContext,
    updateHighlight,
} from "./_NavigationContext";

export type NavigationMenuProps = PropsOf<"nav"> & {
    activeLabel?: string;
};

export const NavigationMenu = component$<NavigationMenuProps>(
    ({ activeLabel, class: classList, ...props }) => {
        const container = useSignal<HTMLElement | undefined>();
        const context = useStore<NavigationContextSchema>({
            updateHighlight: $(updateHighlight),
            highlightWidth: calculateLabelWidth(activeLabel ?? ""),
            highlightOffset: 0,
            container,
        });
        setNavigationContext(context);
        useVisibleTask$(() => updateHighlight(context));
        return (
            <nav
                class={twMerge("flex flex-row relative z-10", classList?.toString())}
                onMouseLeave$={$(() => updateHighlight(context))}
                ref={container}
                {...props}>
                <div
                    style={`width: ${context.highlightWidth}px; transform: translateX(${context.highlightOffset}px);`}
                    class={
                        context.highlightWidth > 0 &&
                        twMerge(
                            "absolute z-20 top-0 bottom-0 transition-horizontal duration-500 ease-in-out",
                            "rounded-md bg-accent mix-blend-overlay select-none",
                        )
                    }
                />
                <Slot />
            </nav>
        );
    },
);
