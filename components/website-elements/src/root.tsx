import { component$ } from '@builder.io/qwik'


export default component$(() =>
{
    return <>
        <head>
            <meta charSet="utf-8"/>
            <title>Placeholder</title>
        </head>
        <body>
            <h1>Needed for Qwik even though we never render this page</h1>
        </body>
    </>
})
