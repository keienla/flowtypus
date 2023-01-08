// vite.config.js
import { copyFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(async ({ mode }) => {
    return {
        build: {
            sourcemap: true,
            mode,
            lib: {
                entry: resolve(__dirname, 'src/flowtypus.ts'),
                name: 'flowtypus',
                fileName: 'flowtypus',
            },
            rollupOptions: {
                external: [],
                output: {
                    globals: {},
                },
            },
            watch: mode === 'production' ? null : {},
        },
        plugins: [dts(), copyToExample()],
    }
})

function copyToExample() {
    return {
        closeBundle: () => {
            const build = resolve(__dirname, 'dist/flowtypus.mjs')
            const example = resolve(__dirname, 'example/flowtypus.mjs')
            copyFileSync(build, example)
            const buildMap = resolve(__dirname, 'dist/flowtypus.mjs.map')
            const exampleMap = resolve(__dirname, 'example/flowtypus.mjs.map')
            copyFileSync(buildMap, exampleMap)
            console.log(`copied flowtypus to example`)
        },
    }
}
