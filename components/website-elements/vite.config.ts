import { webConfig } from '@adaliszk/web-compiler'


export default webConfig({
    server: {
        watch: { usePolling: true },
    },
    build: {
        lib: {
            entry: 'src/website-elements.ts',
            formats: ['es'],
        },
    },
})
