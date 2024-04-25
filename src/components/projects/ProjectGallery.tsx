import { component$, Slot } from "@builder.io/qwik";

export const ProjectGallery = component$(() => {
    return (
        <section class="flex flex-row flex-wrap">
            <Slot />
        </section>
    );
});
