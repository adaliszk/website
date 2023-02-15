import { QWIK_LOADER } from '@builder.io/qwik/loader'
import '../src/global.css'

eval(QWIK_LOADER)

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /color|background/i,
            date: /date/i,
        },
    },
}