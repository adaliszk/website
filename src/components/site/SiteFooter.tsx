import { component$, Slot } from "@builder.io/qwik";

export const SiteFooter = component$(() => {
    return (
        <section class="w-full bg-base-200 justify-self-end">
            <Slot />
            <footer class="w-full max-w-screen-lg mx-auto p-5 text-center">
                <p>Copyright &copy; 2024 - Ádám Liszkai</p>
            </footer>
        </section>
    );
});
