const esbuild = require('esbuild')
const { execSync } = require('child_process')

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: [
    './src/popup/index.ts',
    './src/contentScript.js',
    './src/background.js',
  ],
  bundle: true,
  watch: !isProduction,
  outdir: './build',
}

execSync('mkdir -p build')
execSync('cp -a public/ build/')
esbuild.build(options)
