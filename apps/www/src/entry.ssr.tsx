/**
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 */
import { renderToStream, RenderToStreamOptions } from '@builder.io/qwik/server'
import { manifest } from '@qwik-client-manifest'
import Root from './root'

export default function (opts: RenderToStreamOptions)
{
    return renderToStream(<Root />, {
        prefetchStrategy: {
            implementation: {
                linkInsert: null,
                workerFetchInsert: null,
                prefetchEvent: 'always',
            },
        },
        manifest,
        ...opts,
    })
}
