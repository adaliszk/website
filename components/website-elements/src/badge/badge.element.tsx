import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import type { JSXChildren } from '@builder.io/qwik'


export interface BadgeContainerProps
{
    children?: JSXChildren
}

/**
 * Badge helper to position a badge superscript correctly with a text node
 *
 * @docs https://m3.material.io/components/badges/overview
 */
export const BadgeContainer = component$<BadgeContainerProps>((props) =>
{
    // language=css
    useStylesScoped$(`
        .badge-container {
            position: relative;
            display: inline-block;
        }
        .badge-container [name="badge"] {
            transform: translateX(50%) translateY(-50%);
            right: 0;
            top: 0;
        }
    `)

    return <span class={'badge-container'}>
        {props?.children}
        <Slot/>
        <Slot name={'badge'} />
    </span>
})


export interface BadgeProps
{
    text?: string
}


/**
 * Badges are used to convey dynamic information, such as a count or status.
 * A badge can include text, labels, or numbers.
 *
 * @docs https://m3.material.io/components/badges/overview
 */
export const Badge = component$<BadgeProps>((props) =>
{
    // language=css
    useStylesScoped$(`
        .badge {
            display: inline-block;

            border-radius: var(--badge-radius);
            min-height: var(--badge-min-size);
            min-width: var(--badge-min-size);

            text-align: center;
            background: var(--badge-background);
            color: var(--badge-ink);
            
            font-size: var(--badge-text-size);
            line-height: var(--badge-radius);
            
            position: relative;
            right: var(--badge-overflow);
        }

        .badge > span:not(:empty) {
            padding: var(--badge-padding);            
            min-height: var(--badge-size);
            min-width: var(--badge-size);
        }
    `)

    return <sup class={'badge'}>
        <span>{props?.text}</span>
    </sup>
})
