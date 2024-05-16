import { $, type Signal, Slot, component$, useSignal, useStore } from "@builder.io/qwik";
import { createContextId, useContext, useContextProvider } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { ContentIndexProps } from "./ContentIndex";

export type ContentLayout = "left" | "right";
export type ContentContextSchema = {
    highlightContainer: Signal<Element | undefined>;
    highlightOffset: number;
    highlightHeight: number;
    updateHighlight: typeof updateHighlight;
    activeSection: Signal<number>;
    sectionReference: string[];
    sectionOffset: number[];
    indexOffset: number[];
    side: ContentLayout;
};

export function updateHighlight(self: ContentContextSchema) {
    const container = self.highlightContainer.value;
    if (!container) return;
    let current = container.querySelector<HTMLAnchorElement>("a:hover");
    current ??= container.querySelector<HTMLAnchorElement>("a.active, a:first-of-type");
    if (!current) return;
    self.highlightHeight = current.offsetHeight;
    self.highlightOffset = current.offsetTop;
}

export const _ContentContext = createContextId<ContentContextSchema>("io.adaliszk.ui.content");

export const useContentContext = () => useContext(_ContentContext);
export const setContentContext = (context: ContentContextSchema) =>
    useContextProvider(_ContentContext, context);
