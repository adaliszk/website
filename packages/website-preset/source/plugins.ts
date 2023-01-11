import mkcert from 'vite-plugin-mkcert'
import lint from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

import cssPresetEnv from 'postcss-preset-env'
import cssImport from 'postcss-import'
import cssNesting from 'postcss-nested'

export {
    mkcert,
    lint,
    tsconfigPaths,
    react,
    cssPresetEnv,
    cssImport,
    cssNesting,
}