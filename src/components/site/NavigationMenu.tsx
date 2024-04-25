import type { QRL } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

type NavigationPath = "" | "articles" | "biography" | "projects" | "videos";
type NavigationLinkProps = {
    updateIndicator: QRL<(event: PointerEvent) => void>;
    isActive?: boolean;
    href: string;
    text: string;
};

export type NavigationLinkData = {
    width: number;
    label: string;
    path: NavigationPath[] | NavigationPath;
    href: string;
};

const NavigationLink = component$<NavigationLinkProps>(
    ({ isActive, href, text, updateIndicator }) => {
        return (
            <li
                onMouseEnter$={updateIndicator}
                onClick$={(event) =>
                    (event.target as HTMLLIElement)?.classList.add("active")
                }
                class={twMerge(
                    "menu-clear mr-2 p-0 rounded transition-colors ease-in-out",
                    isActive ? "active underline underline-offset-2" : "",
                )}>
                <a class={"m-0 px-4 py-1.5 rounded"} href={href}>
                    {text}
                </a>
            </li>
        );
    },
);

export type NavigationMenuProps = {
    links: NavigationLinkData[];
    pathname: string;
};

export const NavigationMenu = component$<NavigationMenuProps>(
    ({ pathname, links }) => {
        const pathGroup = pathname.match(/\/(\w+)/);
        const path = pathGroup?.[1] ?? "";

        const MENU_POSITIONS: Record<string, { left: number; width: number }> =
            {
                "": { width: 0, left: 0 },
                articles: { width: 0, left: 0 },
                biography: { width: 0, left: 0 },
                projects: { width: 0, left: 0 },
                videos: { width: 0, left: 0 },
            };

        for (const [index, link] of links.entries()) {
            const prevPath = [index > 0 ? links[index - 1].path : ""]
                .flat()
                .at(0);
            const prev = MENU_POSITIONS[prevPath ?? ""] ?? {
                left: 0,
                width: 0,
            };
            for (const path of [link.path].flat()) {
                MENU_POSITIONS[path] = {
                    left: prev.left + prev.width + 8,
                    width: link.width,
                };
            }
        }

        const indicatorWidth = useSignal(MENU_POSITIONS[path].width);
        const indicatorLeft = useSignal(MENU_POSITIONS[path].left);
        const menuRef = useSignal<HTMLElement>();

        // TODO: Simplify this logic to use less BoundingClientRect calls
        const updateIndicator = $((event: PointerEvent) => {
            const menuRect = menuRef.value?.getBoundingClientRect();
            if (!menuRect) return;

            if (event.target instanceof HTMLUListElement) {
                const activeLink = menuRef.value?.querySelector("li.active");
                if (!activeLink) return;

                const activePos = activeLink.getBoundingClientRect();
                indicatorLeft.value = activePos.left - menuRect.left;
                indicatorWidth.value = activePos.width;
                return;
            }

            const pos = (event.target as Element)?.getBoundingClientRect();
            if (!pos) return;

            indicatorLeft.value = pos.left - menuRect.left;
            indicatorWidth.value = pos.width;
        });

        return (
            <ul
                class={
                    "menu menu-horizontal w-full capitalize tracking-wide font-bold relative"
                }
                onMouseLeave$={updateIndicator}
                ref={menuRef}>
                <div
                    class={
                        "menu-indicator absolute top-0 left-0 h-full bg-base-300 opacity-20 rounded transition-all ease-in-out duration-300"
                    }
                    style={{
                        transform: `translateX(${indicatorLeft.value}px)`,
                        width: `${indicatorWidth.value}px`,
                    }}
                />

                {links.map((link) => (
                    <NavigationLink
                        key={link.href}
                        href={link.href}
                        updateIndicator={updateIndicator}
                        isActive={[link.path].flat().includes(path)}
                        text={link.label}
                    />
                ))}
            </ul>
        );
    },
);
