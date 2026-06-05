import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['./index.ts'],
    clean: false, // Avoid erasing the files
    outDir: "./",
    // format: {
    //     esm: {
    //         target: ['es2015'],
    //     },
    //     cjs: {
    //         target: ['node20'],
    //     },
    // },
    platform: 'browser',
})