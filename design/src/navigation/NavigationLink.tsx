import type { PropsOf } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { useNavigationContext } from "./NavigationContext.ts";

export type NavigationLinkProps = PropsOf<"a"> & {
    isActive?: boolean;
    label: string;
    href: string;
};

export const NavigationLink = component$<NavigationLinkProps>(
    ({ label, class: className, isActive, ...props }) => {
        const context = useNavigationContext();
        const mainStyle = twMerge(
            "relative z-30 py-2 px-4 font-[Oswald] font-normal uppercase tracking-wide select-none",
            (isActive ?? false) && "active underline underline-offset-2",
        );
        return (
            <a
                class={twMerge(mainStyle, className?.toString())}
                onMouseEnter$={async () => {
                    console.log("NavigationLink::onMouseEnter$", context);
                    await context.updateHighlight(context);
                }}
                {...props}>
                {label}
            </a>
        );
    },
);
