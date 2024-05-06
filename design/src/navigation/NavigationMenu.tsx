import type { Signal } from "@builder.io/qwik"
import { $, component$, useSignal, useStore } from "@builder.io/qwik"
import { twMerge } from "tailwind-merge"
import { createCanvas } from "canvas"

export type NavigationMenuItem = {
    label: string;
    match?: RegExp;
    href: string;
};

type HighlightTransform = { width: number; left: number; }
type UpdateHighlightArgs = {
    menuReference: Signal<HTMLElement | undefined>;
    highlight: HighlightTransform;
}

export type NavigationMenuProps = {
    currentUrl: string;
    items: NavigationMenuItem[];
    class?: string;
};

// region Interaction and Animation

export const calculateTextBoundaries = (label: string) => {
    const canvas = createCanvas(256, 32)
    const context = canvas.getContext("2d")
    context.font = "12.5px Oswald"
    const text = context.measureText(label.toUpperCase())
    return {
        // text.width -> width of the text
        // label.length * 0.3333 -> simulating letter spacing
        // 32px -> p-4 padding assuming 16px font size
        width: Number(text.width) + label.length * 0.3333 + 32,
    }
}

export const updateHighlight = ({ menuReference, highlight }: UpdateHighlightArgs) => $(() => {
    if (!menuReference.value) return
    const menu = menuReference.value
    let link = menu.querySelector<HTMLAnchorElement>("a:hover")
    link ??= menu.querySelector<HTMLAnchorElement>("a.active, a:first-of-type")
    if (!link) return
    highlight.width = link.clientWidth
    highlight.left = link.offsetLeft
})

// endregion

export const NavigationMenu = component$<NavigationMenuProps>((props) => {
    const menuReference = useSignal<HTMLElement | undefined>()
    const activeLink = props.items.find((item) => item.match?.test(props.currentUrl))
        ?? props.items.at(0)
    const activeText = calculateTextBoundaries(activeLink?.label ?? "")
    const highlight = useStore<HighlightTransform>({
        width: activeText.width,
        left: 0,
    })

    return (
        <nav
            class={twMerge("flex flex-row relative", props.class)}
            onMouseLeave$={updateHighlight({ menuReference, highlight })}
            ref={menuReference}>
            <div
                style={`width: ${highlight.width}px; transform: translateX(${highlight.left}px);`}
                class={twMerge(
                    "absolute z-10 top-0 bottom-0 transition-all duration-500 ease-in-out",
                    "rounded-md border border-black/5 bg-accent/30 select-none",
                )}
            />
            {props.items.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    class={twMerge(
                        "relative z-30 py-2 px-4 font-[Oswald] font-normal uppercase tracking-wide select-none",
                        activeLink === item && "active underline underline-offset-2",
                    )}
                    onMouseEnter$={updateHighlight({ menuReference, highlight })}>
                    {item.label}
                </a>
            ))}
        </nav>
    )
})
