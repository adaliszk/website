import { component$, useStyles$ } from '@builder.io/qwik'
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city'
import HeadOutlet from './components/areas/HeadOutlet'
import globalStyles from './global.css?inline'


export default component$(() =>
{
    useStyles$(globalStyles)

    return <>
        <QwikCityProvider>
            <head lang={'en'}>
                <meta charSet="utf-8"/>
                <link rel="manifest" href="/manifest.json"/>
                <HeadOutlet />
            </head>
            <body>
                <RouterOutlet/>
                <ServiceWorkerRegister/>
            </body>
        </QwikCityProvider>
    </>
})
