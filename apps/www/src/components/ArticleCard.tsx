import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik'
import articleCardStyles from './ArticleCard.css?inline'


export default component$(() =>
{
    useStylesScoped$(articleCardStyles)

    return <>
        <article>
            <header>
                <Slot name={'header'} />
            </header>
            <Slot />
        </article>
    </>
})