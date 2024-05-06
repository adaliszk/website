import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

import { HeadOutlet } from "./components/HeadOutlet.jsx";
import "./global.css";

/**
 * The root of a QwikCity site always start with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 *
 * Don't remove the `<head>` and `<body>` elements.
 */
export default component$(() => {
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <HeadOutlet />
            </head>
            <body lang="en" class={"flex flex-column h-full"}>
                <RouterOutlet />
                <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});
