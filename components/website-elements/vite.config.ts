import { qwikConfig } from '@adaliszk/qwik-compiler'


export default qwikConfig({
    city: false,
    server: { port: 6006, watch: { usePolling: true } },
    build: {
        lib: {
            entry: 'src/website-elements.ts',
            formats: ['es'],
        },
    },
})
