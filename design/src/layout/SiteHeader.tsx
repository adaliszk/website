import { Slot, component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

export type SiteHeaderProps = {
    class?: string;
};

export const SiteHeader = component$<SiteHeaderProps>((props) => {
    return (
        <section
            class={twMerge(
                "w-full bg-primary text-black fixed top-0 left-0 right-0 shadow-lg",
                props.class,
            )}>
            <header class={"w-full max-w-screen-lg p-2 mx-auto"}>
                <Slot />
            </header>
        </section>
    );
});
