import { component$, Slot } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

export type SiteContentProps = {
    class?: string;
};

export const SiteContent = component$<SiteContentProps>((props) => {
    return (
        <main
            class={twMerge(
                "w-full max-w-screen-lg h-full mx-auto px-2 py-6 flex-grow",
                props.class,
            )}>
            <Slot />
        </main>
    );
});
