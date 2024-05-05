/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 */
import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root.jsx";

export default function (opts: RenderToStreamOptions) {
    return renderToStream(<Root />, {
        manifest,
        ...opts,
        // Use container attributes to set attributes on the html tag.
        containerAttributes: {
            lang: "en-uk",
            ...opts.containerAttributes,
        },
    });
}
