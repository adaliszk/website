import { webConfig } from '@adaliszk/web-compiler'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'


export default webConfig({
    plugins: [
        qwikCity(),
        qwikVite(),
    ],
})
