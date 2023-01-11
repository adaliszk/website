import { component$ } from '@builder.io/qwik'
import { DocumentHead } from '@builder.io/qwik-city'

export const head: DocumentHead = {
    title: 'Under Construction!',
    meta: [
        {
            name: 'description',
            content: 'Website is under construction!',
        },
    ],
}

export default component$(() =>
{
    return <>
        <h1>Woah there...</h1>
        <p>This site is under construction, please come back later!</p>
    </>
})
