import { defineConfig as viteConfig } from 'vite'
import type { UserConfigExport, UserConfig } from 'vite'
import * as builtin from './plugins'

export function defineConfig (config?: UserConfig): UserConfigExport
{
    return viteConfig({
        ...(config ?? {}),
        server: {
            https: true,
            hmr: { protocol: 'wss' },
            watch: { usePolling: true }, // needed for WSL
            port: 3000
        },
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },
        },
        plugins: [
            ...(config?.plugins ?? []),
            builtin.tsconfigPaths(),
            builtin.mkcert(),
            builtin.react()
        ],
        css: {
            postcss: {
                plugins: [
                    //builtin.cssPresetEnv(),
                    //builtin.cssNesting(),
                    builtin.cssImport(),
                ]
            }
        }
    })
}
