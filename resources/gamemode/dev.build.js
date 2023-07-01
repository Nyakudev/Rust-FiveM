const {resolve} = require('path')
const buildPath = resolve(__dirname, 'build')

const {build} = require('esbuild')

const addonPaths = [
    './addons/framework/client/main.ts',
    './addons/framework/client/function.ts',
    './addons/framework/server/main.ts',
    
]


build({
    entryPoints: addonPaths,
    outdir: resolve(buildPath, 'js'),
    bundle: true,
    minify: true,
    platform: 'browser',
    target: 'es2020',
    logLevel: 'info',
    watch: true
}).catch(() => process.exit(1))