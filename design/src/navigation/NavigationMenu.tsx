import { $, component$, useSignal, useStore } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { twMerge } from "tailwind-merge"
import { createCanvas } from "canvas"

export type NavigationMenuItem = {
    label: string;
    match?: RegExp;
    href: string;
};

export type NavigationMenuProps = {
    items: NavigationMenuItem[];
    class?: string;
};

export const calculateTextBoundaries = (label: string) => {
    const canvas = createCanvas(256, 32)
    const context = canvas.getContext("2d")
    context.font = "16px Oswald"
    const text = context.measureText(label)
    return {
        width: Number(text.width) + 32, // p-4 padding assuming 16px font size
    }
}

export const NavigationMenu = component$<NavigationMenuProps>((props) => {
    const menuReference = useSignal<HTMLElement | undefined>()
    const { url } = useLocation()

    const activeLink = props.items.find((item) => item.match?.test(url.href)) ?? props.items.at(0)
    const activeText = calculateTextBoundaries(activeLink?.label ?? "")

    const highlight = useStore({
        width: activeText.width,
        left: 0,
    })

    const updateHighlight = $(() => {
        if (!menuReference.value) return
        const menu = menuReference.value
        let link = menu.querySelector<HTMLAnchorElement>("a:hover")
        link ??= menu.querySelector<HTMLAnchorElement>("a.active, a:first-of-type")
        if (!link) return
        highlight.width = link.clientWidth
        highlight.left = link.offsetLeft
    })

    return (
        <nav
            class={twMerge("flex flex-row relative", props.class)}
            onMouseLeave$={() => updateHighlight()}
            ref={menuReference}>
            <div
                style={`width: ${highlight.width}px; transform: translateX(${highlight.left}px);`}
                class={twMerge(
                    "absolute z-10 top-0 bottom-0 transition-all duration-500 ease-in-out",
                    "rounded-md border border-black/5 bg-accent/30 select-none",
                )}
            />
            {props.items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    class={twMerge(
                        "relative z-30 py-2 px-4 font-[Oswald] font-normal uppercase tracking-wide select-none",
                        activeLink === item && "active underline underline-offset-2",
                    )}
                    onMouseEnter$={() => updateHighlight()}>
                    {item.label}
                </Link>
            ))}
        </nav>
    )
})
