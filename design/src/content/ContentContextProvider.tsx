import { $, Slot, component$, useOnDocument, useSignal, useStore } from "@builder.io/qwik";
import {
    type ContentContextSchema,
    type ContentLayout,
    setContentContext,
    updateHighlight,
} from "./_ContentContext";

export type ContentContextProviderProps = {
    defaultHeight?: number;
    defaultOffset?: number;
    side: ContentLayout;
};

export const ContentContextProvider = component$<ContentContextProviderProps>(
    ({ side, defaultOffset, defaultHeight }) => {
        const DEBUG_MODE = process.env.DEBUG_CONTENT_CONTEXT === "true";

        const highlightContainer = useSignal<Element | undefined>();
        const activeSection = useSignal<number>(0);
        const context = useStore<ContentContextSchema>({
            updateHighlight: $(updateHighlight),
            highlightHeight: defaultHeight ?? 0,
            highlightOffset: defaultOffset ?? 0,
            highlightContainer,
            activeSection,
            sectionReference: [],
            sectionOffset: [],
            indexOffset: [],
            side,
        });
        setContentContext(context);

        useOnDocument(
            "scroll",
            $((ev) => {
                // TODO: Cast the argument instead of the property
                const scrollTop = (ev.target as HTMLElement).scrollTop;
                const scanRange = Object.entries(context.sectionOffset).slice(
                    Math.max(0, context.activeSection.value - 2),
                    Math.min(context.sectionOffset.length, context.activeSection.value + 2),
                );

                DEBUG_MODE &&
                    console.debug("ContentContextProvider::onScroll$:", {
                        sectionReference: context.sectionReference,
                        sectionOffset: context.sectionOffset,
                        indexOffset: context.indexOffset,
                        scanRange,
                        scrollTop,
                    });

                let currentIndex = context.activeSection.value;
                for (const [key, offset] of scanRange) {
                    const index = Number(key);
                    const indexOffset = context.indexOffset[index];
                    if (scrollTop >= offset - indexOffset) {
                        currentIndex = index;
                    }
                }
                context.activeSection.value = currentIndex;
                const container = context.highlightContainer.value;
                if (!container) return;
                const reference = context.sectionReference[currentIndex];
                const currentHeading = container.querySelector<HTMLElement>(
                    `a[href="#${reference}"]`,
                );
                if (!currentHeading) return;
                context.highlightHeight = currentHeading.clientHeight;
                context.highlightOffset = currentHeading.offsetTop;
            }),
        );

        return <Slot />;
    },
);
