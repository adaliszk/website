import { defineConfig } from '@adaliszk/website-preset'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'

export default defineConfig({
    plugins: [
        qwikCity(),
        qwikVite(),
    ],
})
