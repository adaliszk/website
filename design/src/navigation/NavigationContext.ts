import type { Signal } from "@builder.io/qwik";
import { createContextId, useContext, useContextProvider } from "@builder.io/qwik";

export type NavigationContextSchema = {
    container: Signal<HTMLElement | undefined>;
    highlightOffset: number;
    highlightWidth: number;
    updateHighlight: (self: NavigationContextSchema) => Promise<void>;
};

export function updateHighlight(self: NavigationContextSchema) {
    console.log("NavigationContext::updateHighlight", self);
    const menu = self.container.value;
    if (!menu) return;
    let link = menu.querySelector<HTMLAnchorElement>("a:hover");
    link ??= menu.querySelector<HTMLAnchorElement>("a.active, a:first-of-type");
    if (!link) return;
    self.highlightOffset = link.offsetLeft;
    self.highlightWidth = link.offsetWidth;
    console.log("NavigationContext::updateHighlight:", self);
}

export const NavigationContext = createContextId<NavigationContextSchema>("adaliszk.navigation");

export const setNavigationContext = (context: NavigationContextSchema) =>
    useContextProvider(NavigationContext, context);
export const useNavigationContext = () => useContext(NavigationContext);
