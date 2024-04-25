/**
 * Theme Switcher Feature
 * Supporting two themes: dark and light
 *
 * This feature is controlled by a feature flag `FEATURE_FLAGS.themeSwitcher` and controls the tailwind palette with
 * a simple data attribute on the body element. The theme is stored in localStorage to persist the user's preference.
 * Additionally, the preferred initial theme is resolved from the browser's media query.
 *
 * By default, the theme is set to dark mode.
 *
 * The feature hooks into the application at the initial render by calling `restoreThemeSwitcher` at the end of
 * the body in the HTML so that the already chosen or default theme is applied before the first render.
 *
 * Once the `ThemeSwitcher´ component is mounted, it will initialize the theme state and update the body's data-theme
 * attribute using an effect hook that calls `initThemeSwitcher`. This effect executes when the ThemeSwitcher component
 * is mounted to the DOM, only on the client-side. Essentially right after - but sometimes before - the first render.
 */
import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

import { Icon } from "components";
import { FEATURE_FLAGS } from "config";

export type ThemeValue = "dark" | "light" | undefined;
export type ThemeSwitcherProps = {
    class?: string;
};

/**
 * Restore ThemeSwitcher state from localStorage
 * This one meant to be used as an injected source on the client-side
 * to force the first-render to be correctly themed
 */
export function restoreThemeSwitcher() {
    if (!FEATURE_FLAGS.siteThemeSwitcher) return;

    const theme = localStorage.getItem("theme") ?? "dark";
    console.log("ThemeSwitcher::initThemeSwitcher: theme:", theme);
    document.body.dataset.theme = theme;
}

/**
 * Initialize ThemeSwitcher state using multiple sources
 */
export function initThemeSwitcher() {
    if (!FEATURE_FLAGS.siteThemeSwitcher) return;

    const domTheme = document.body.dataset.theme as ThemeValue;
    const storeTheme = localStorage.getItem("theme") as ThemeValue;
    const mediaIsDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    // Restore state from the available sources
    const darkMode =
        domTheme === undefined
            ? mediaIsDarkMode || storeTheme === "dark"
            : domTheme === "dark";

    document.body.dataset.theme = darkMode ? "dark" : "light";
}

/**
 * Theme Switcher component that allows the user to toggle between dark and light themes
 */
export const ThemeSwitcher = component$<ThemeSwitcherProps>((props) => {
    if (!FEATURE_FLAGS.siteThemeSwitcher) return;

    const darkMode = useSignal(true);
    const setDarkMode = $(() => {
        const darkModeValue = darkMode.value ? "dark" : "light";
        localStorage.setItem("theme", darkModeValue);
        document.body.dataset.theme = darkModeValue;
    });

    useVisibleTask$(() => {
        // Avoid re-initializing the theme switcher on eagerly visible events
        if (document.body.dataset.theme) return;

        initThemeSwitcher();
        setDarkMode();
    });

    return (
        <label
            class={twMerge("swap swap-rotate", props.class)}
            aria-label={"Change Theme"}>
            <input
                type={"checkbox"}
                class={"theme-switcher"}
                checked={darkMode.value}
                onChange$={() => {
                    darkMode.value = !darkMode.value;
                    setDarkMode();
                }}
            />
            <Icon name={"light"} class={"swap-off h-6 w-6"} />
            <Icon name={"dark"} class={"swap-on h-6 w-6"} />
        </label>
    );
});
