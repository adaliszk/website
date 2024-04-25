import { component$, Slot } from "@builder.io/qwik";

export const MainContent = component$(() => {
    return (
        <main class="max-w-screen-lg mx-auto p-5 flex-grow w-full">
            <Slot />
        </main>
    );
});
