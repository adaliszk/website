import { component$, Slot } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

export type SiteFooterProps = {
    class?: string;
};

export const SiteFooter = component$<SiteFooterProps>((props) => {
    return (
        <section class={twMerge("w-full bg-base-200 justify-self-end", props.class)}>
            <Slot />
            <footer class={"w-full max-w-screen-lg mx-auto p-2 text-center"}>
                <p>Copyright &copy; 2024 - Ádám Liszkai</p>
            </footer>
        </section>
    );
});
