import { component$ } from "@builder.io/qwik";
import {
    QwikCityProvider,
    RouterOutlet,
    ServiceWorkerRegister,
    useDocumentHead,
    useLocation,
} from "@builder.io/qwik-city";
import "./global.css";

/**
 * The root of a QwikCity site always start with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 *
 * Don't remove the `<head>` and `<body>` elements.
 */
export default component$(() => {
    const head = useDocumentHead();
    const loc = useLocation();
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <title>{head.title}</title>

                <link rel="canonical" href={loc.url.href} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

                {head.meta.map((m) => (
                    <meta key={m.key} {...m} />
                ))}

                {head.links.map((l) => (
                    <link key={l.key} {...l} />
                ))}

                {head.styles.map((s) => (
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: We want to allow setting styles from the server.
                    <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
                ))}
            </head>
            <body lang="en" class={"flex flex-column h-full"}>
                <RouterOutlet />
                <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});
