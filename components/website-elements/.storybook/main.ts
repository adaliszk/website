import type { StorybookConfig } from 'storybook-framework-qwik'
import type { QwikConfig } from '@adaliszk/qwik-compiler'
import { compileQwik } from '@adaliszk/qwik-compiler'


const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.@(ts|tsx|mdx)',
        '../*.mdx',
    ],
    core: {
        builder: {
            name: '@storybook/builder-vite',
            options: {},
        },
    },
    framework: {
        name: 'storybook-framework-qwik',
        options: {},
    },
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-storysource',
        '@storybook/addon-a11y',
    ],
    docs: {
        defaultName: 'Overview',
        autodocs: true,
    },
    async viteFinal (config: QwikConfig)
    {
        config.plugins?.unshift(compileQwik())
        config.server = config?.server ?? {}
        config.server.port = 6006
        config.server.watch = {
            usePolling: true,
            interval: 3000,
        }

        return config
    },
}


export default config
