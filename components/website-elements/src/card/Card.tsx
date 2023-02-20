import { component$, useStylesScoped$, useStyles$ } from '@builder.io/qwik'
import { CardHeader } from './CardHeader'
import { CardMedia } from './CardMedia'
import { CardContent } from './CardContent'
import { CardActions } from './CardActions'
import type { CardProps } from './types'


/**
 * Surface that display content and actions on a single topic.
 *
 * They should be easy to scan for relevant and actionable information. Elements, like text and images,
 * should be placed on them in a way that clearly indicates hierarchy.
 *
 * @slot monogram
 * @property {string} monogram
 *
 * @slot header
 * @property {string} header
 *
 * @slot options
 * @property {CardOption[]} options
 *
 * @slot media
 * @property media
 *
 * @slot title
 * @slot subtitle
 *
 * @slot content
 * @slot actions
 */
export const Card = component$<CardProps>((props) =>
{
    // language=css
    useStyles$(`
        :root {
            --card-background: var(--elevation-background, var(--color-surface));
            --card-background-filled: var(--color-primary-container);
            --card-radius: var(--theme-border-radius);
            --card-text-spacing: var(--theme-item-spacing);
            --card-content-spacing: calc(var(--theme-box-spacing) + var(--theme-item-spacing));
            --card-box-spacing: var(--theme-box-spacing);
            --card-spacing: var(--theme-item-spacing);
            --card-border-color: var(--elevation-border, var(--color-surface));
            --card-border-outlined: var(--color-primary);
            --card-shadow: var(--elevation-shadow, none);
        }
    `)

    // language=css
    useStylesScoped$(`
        .card-container {
            margin: var(--card-spacing);
            border: 1px solid var(--card-border-color);
            border-radius: var(--card-radius);
            background: var(--elevation-background);
            box-shadow: var(--elevation-shadow);
            overflow: hidden;
        }

        .card-container.outlined {
            border: 1px solid var(--card-border-outlined);
        }

        .card-container.filled {
            background: var(--card-background-filled);
        }
    `)

    const elevatedCls = props?.elevated ? `elevated-${props.elevated}` : undefined
    const outlinedCls = props?.outlined ? 'outlined' : undefined
    const filledCls = props?.filled ? 'filled' : undefined

    return <>
        <article class={['card-container', elevatedCls, outlinedCls, filledCls].join(' ')}>
            {CardHeader(props)}
            {CardMedia()}
            {CardContent(props)}
            {CardActions()}
        </article>
    </>
})
