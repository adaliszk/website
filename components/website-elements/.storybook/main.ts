import { StorybookConfig } from 'storybook-framework-qwik'
import type { UserConfig } from 'vite'

import { qwikVite } from '@builder.io/qwik/optimizer'


const config: StorybookConfig = {
    stories: [
        '../src/**/*.story.@(ts|tsx|mdx)',
        '../src/**/*.stories.@(ts|tsx|mdx)',
        '../docs/**/*.mdx',
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
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
    ],
    docs: {
        defaultName: 'Overview',
        autodocs: true,
    },
    async viteFinal (config: UserConfig)
    {
        config.plugins?.unshift(qwikVite())
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
