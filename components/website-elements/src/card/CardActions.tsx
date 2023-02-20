import { Slot, useStylesScoped$ } from '@builder.io/qwik'

export function CardActions ()
{
    // language=css
    useStylesScoped$(`
        .card-actions {
            display: flex;
            justify-content: flex-end;

            padding: calc(var(--card-box-spacing) - var(--card-text-spacing)) var(--card-box-spacing);
        }

        .card-actions > :global(*) {
            margin: var(--theme-item-spacing);
        }
    `)

    return <footer class={'card-actions'}>
        <Slot name={'action'}/>
    </footer>
}
