import type { JSXOutput } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { IconName } from "components";
import { Icon } from "components";

import { match } from "@adaliszk/std";
import { twMerge } from "tailwind-merge";

export type NavigationIconLinkProps = {
    class?: string;
    icon: JSXOutput | IconName;
    label: string;
    link: string;
};

type IconOrName =
    | { type: "string"; value: IconName }
    | { type: "jsx"; value: JSXOutput };

export const NavigationIconLink = component$<NavigationIconLinkProps>(
    (props) => {
        const icon = {
            type: typeof props.icon === "string" ? "string" : "jsx",
            value: props.icon,
        } as IconOrName;

        return (
            <a
                href={props.link}
                target={"_blank"}
                class={twMerge("btn btn-ghost btn-square", props.class)}
                aria-label={props.label}
                rel={"noreferrer"}>
                {match(icon, "type", {
                    string: ({ value }) => <Icon name={value} />,
                    jsx: ({ value }) => value,
                })}
            </a>
        );
    },
);
