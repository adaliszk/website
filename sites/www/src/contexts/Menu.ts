import { matchByKey } from "@adaliszk/std";
import { createContextId, useContext, useContextProvider } from "@builder.io/qwik";

import { type FeatureFlagType, useFeatureFlagContext } from "./FeatureFlags";

export type MenuItem = {
    href: string;
    label: string;
    activePattern: RegExp;
};

export const MenuContext = createContextId<MenuItem[]>("io.adaliszk.www.menu");

export const MenuItemOrder: Array<keyof FeatureFlagType> = [
    "updates",
    "projects",
    "snippets",
    "tools",
    "biography",
    "blog",
];

export function useMenuContextProvider() {
    const featureFlags = useFeatureFlagContext();

    const menuItems: MenuItem[] = MenuItemOrder.map((flag) => ({
        enabled: featureFlags[flag],
        flag,
    }))
        .map((feature) =>
            matchByKey(feature, "flag", {
                _: () => undefined, // Drop items that are not defined
                updates: ({ enabled }) =>
                    enabled && {
                        label: "Updates",
                        activePattern: /^\/?updates/i,
                        href: "/updates",
                    },
                projects: ({ enabled }) =>
                    enabled && {
                        label: "Projects",
                        activePattern: /^\/?projects?.*|^\/?p\/.*/i,
                        href: "/projects",
                    },
                snippets: ({ enabled }) =>
                    enabled && {
                        label: "Snippets",
                        activePattern: /^\/?snippets|^\/?s\/.*/i,
                        href: "/snippets",
                    },
                tools: ({ enabled }) =>
                    enabled && {
                        label: "Tools",
                        activePattern: /^\/tools|^\/?t\/.*/i,
                        href: "/tools",
                    },
                biography: ({ enabled }) =>
                    enabled && {
                        label: "Biography",
                        activePattern: /^\/biography/i,
                        href: "/biography",
                    },
                blog: ({ enabled }) =>
                    enabled && {
                        label: "Blog",
                        activePattern: /^\/?blog|^\/?article\/.*|^\/?a\/.*/,
                    },
            }),
        )
        .map((result) => result.unwrapOr(undefined))
        .filter(Boolean);

    return useContextProvider(MenuContext, menuItems);
}

export function useMenuContext() {
    return useContext(MenuContext);
}
