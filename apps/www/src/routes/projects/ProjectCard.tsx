import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import projectCardStyles from './ProjectCard.css?inline'


export default component$(() =>
{
    useStylesScoped$(projectCardStyles)

    return <article>
        <header>
            <Slot name={'header'} />
        </header>
        <Slot />
    </article>
})
