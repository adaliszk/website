import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import type { JSXChildren } from '@builder.io/qwik'


export interface CardSharedProps
{
    children?: JSXChildren
}

export interface CardHeaderProps extends CardSharedProps
{
    /**
     *
     * @default 'vertical'
     */
    mode?: 'vertical' | 'horizontal'
}

/**
 * Header area of the Card Component
 */
export function CardHeader (props?: CardHeaderProps)
{
    // language=css
    useStylesScoped$(`
        .card-header {
            padding: calc(var(--card-box-spacing) - var(--card-text-spacting)) var(--card-box-spacing);
        }
        .card-header > :global(*) {
            padding: var(--card-text-spacting) 0;
            margin: 0;
        }
    `)

    return <header class={'card-header'}>
        <Slot name={'title'}/>
        <Slot name={'subtitle'}/>
        {props?.children}
    </header>
}

export function CardMedia ()
{
    // language=css
    useStylesScoped$(`
        .card-media {
            margin: 0 -1px;
        }

        .outlined .card-media {
            margin: 0;
        }
        
        .card-media > :global(img) {
            width: 100%;
        }
    `)

    return <section class={'card-media'}>
        <Slot name={'media'}/>
    </section>
}

export function CardContent ()
{
    // language=css
    useStylesScoped$(`
        .card-content > :global(*) {
            padding: var(--card-text-spacting) var(--card-box-spacing);
            margin: 0;
        }
    `)

    return <section class={'card-content'}>
        <Slot/>
    </section>
}

export function CardActions ()
{
    return <footer class={'card-actions'}>
        <Slot name={'action'}/>
    </footer>
}


export interface CardProps extends CardHeaderProps, CardSharedProps
{
    /**
     *
     */
    elevated?: number

    /**
     *
     */
    outlined?: boolean

    /**
     *
     */
    filled?: boolean
}


/**
 * Surface that display content and actions on a single topic.
 *
 * They should be easy to scan for relevant and actionable information. Elements, like text and images,
 * should be placed on them in a way that clearly indicates hierarchy.
 *
 * @slot header
 * @slot content
 * @slot media
 * @slot actions
 */
export const Card = component$((props?: CardProps) =>
{
    // language=css
    useStylesScoped$(`
        .card-container {
            margin: var(--card-spacing);
            border: 1px solid var(--card-border-color);
            border-radius: var(--card-border-radius);
            background: var(--elevation-background);
            box-shadow: var(--elevation-shadow);
        }
        .card-container.outlined {
            border: 1px solid var(--card-border-outlined);
        }
    `)

    const elevatedCls = props?.elevated ? `elevated-${props.elevated}` : undefined
    const outlinedCls = props?.outlined ? 'outlined' : undefined

    return <>
        <article class={['card-container', elevatedCls, outlinedCls].join(' ')}>
            {CardHeader()}
            {CardMedia()}
            {CardContent()}
            {props?.children}
            {CardActions()}
        </article>
    </>
})
