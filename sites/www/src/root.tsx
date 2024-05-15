import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { disable as disableDarkReader, isEnabled as isDarkReaderEnabled } from "darkreader";

import { HeadOutlet } from "components";
import { useFeatureFlagContextProvider, useMenuContextProvider } from "contexts";

import "./global.css";

/**
 * The root of a QwikCity site always start with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 */
export default component$(() => {
    useFeatureFlagContextProvider();
    useMenuContextProvider();

    useVisibleTask$(() => {
        disableDarkReader();
        console.log("Root::useVisibleTask$()", {
            isDarkReaderEnabled: isDarkReaderEnabled(),
        });
    });

    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <HeadOutlet />
            </head>
            <body data-theme={"dark"} class={"flex flex-col-reverse md:flex-col h-full font-exo"}>
                <RouterOutlet />
                <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});
