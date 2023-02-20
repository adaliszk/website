import { Slot, useStyles$, useStylesScoped$ } from '@builder.io/qwik'
import { CardContentProps } from './types'


export function CardContent (props?: CardContentProps)
{
    // language=css
    useStyles$(`
        :root {
            --card-title-size: var(--theme-typo-large);
            --card-subtitle-size: var(--theme-typo-medium);
        }
    `)

    // language=css
    useStylesScoped$(`
        .card-content > :global(*) {
            padding: var(--card-content-spacing) var(--card-box-spacing) calc(var(--card-box-spacing) - var(--card-text-spacing)) var(--card-box-spacing);
            margin: 0;
        }

        h2.title, .title > :global(*), h3.subtitle, .subtitle > :global(*) {
            padding: 0;
        }

        h2.title, .title > :global(*) {
            font-size: var(--card-title-size);
            margin: 0 0 calc(var(--card-text-spacing) / 2) 0;
        }

        h3.subtitle, .subtitle > :global(*) {
            font-size: var(--card-subtitle-size);
            margin: calc(var(--card-text-spacing) / 2) 0 0 0;
        }
    `)

    return (
        <section class={'card-content'}>
            <header class={'headline'}>
                {props?.title
                    ? <h2 class={'title'}>{props.title}</h2>
                    : <span class={'title'}><Slot name={'title'}/></span>}
                {props?.subtitle
                    ? <h3 className={'subtitle'}>{props.subtitle}</h3>
                    : <span className={'subtitle'}><Slot name={'subtitle'}/></span>}
            </header>
            {props?.children}
            <Slot/>
        </section>
    )
}
