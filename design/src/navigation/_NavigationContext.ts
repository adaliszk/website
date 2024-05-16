import type { Signal } from "@builder.io/qwik";
import { createContextId, useContext, useContextProvider } from "@builder.io/qwik";

export type NavigationContextSchema = {
    container: Signal<HTMLElement | undefined>;
    highlightOffset: number;
    highlightWidth: number;
    updateHighlight: typeof updateHighlight;
};

export function updateHighlight(self: NavigationContextSchema) {
    const menu = self.container.value;
    if (!menu) return;
    let link = menu.querySelector<HTMLAnchorElement>("a:hover");
    link ??= menu.querySelector<HTMLAnchorElement>("a.active, a:first-of-type");
    if (!link) return;
    self.highlightOffset = link.offsetLeft;
    self.highlightWidth = link.offsetWidth;
}

// TODO: Turn this into an ML Model with Canvas
export function calculateLabelWidth(label: string) {
    const wideCharacters = (label.match(/[wmtropsce]/gi) ?? []).length;
    const narrowCharacters = label.length - wideCharacters;
    // shortCharacters * 6.5 -> simulating narrow characters
    // wideCharacters * 8 -> simulating wide characters
    // 32 -> p-4 padding assuming 16px font size
    return narrowCharacters * 6.5 + wideCharacters * 8 + 32;
}

export const _NavigationContext = createContextId<NavigationContextSchema>(
    "io.adaliszk.ui.navigation",
);

export const useNavigationContext = () => useContext(_NavigationContext);
export const setNavigationContext = (context: NavigationContextSchema) =>
    useContextProvider(_NavigationContext, context);
