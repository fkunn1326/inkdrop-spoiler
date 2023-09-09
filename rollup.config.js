import { nodeResolve } from '@rollup/plugin-node-resolve'
import packageJson from './package.json'
const deps = Object.keys(packageJson.dependencies || {})

export default [
  {
    input: 'src/index.js',
    output: {
      dir: 'lib',
      format: 'cjs',
      strict: true,
      sourcemap: true,
      exports: 'auto'
    },
    external: ['react', 'codemirror', 'inkdrop'],
    plugins: [
      nodeResolve(),
    ]
  }
]
