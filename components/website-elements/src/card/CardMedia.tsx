import { Slot, useStylesScoped$ } from '@builder.io/qwik'

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
