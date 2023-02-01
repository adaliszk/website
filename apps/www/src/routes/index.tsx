import { RequestHandler } from '@builder.io/qwik-city'

// noinspection JSUnusedGlobalSymbols
export const onGet: RequestHandler = ({send, headers}) =>
{
    headers.set('Location', '/projects/')
    send(307, 'Redirecting to /projects/')
}