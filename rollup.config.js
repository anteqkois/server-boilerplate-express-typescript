import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

export default {
  bundleConfigAsCjs: true,
  input: './src/app.ts',
  output: {
    file: './dist/app.js',
    format: 'cjs',
  },
  external: [
    'dotenv/config',
    'cors',
    'dayjs',
    'express',
    'cookie-parser',
  ],
  plugins: [
    typescript({
      module: 'ESNext',
      resolveJsonModule: true,
      sourceMap: false,
      compilerOptions: {
        lib: ['es5', 'es6', 'dom'],
        target: 'es6',
      },
      tsconfig: './tsconfig.json',
    }),
    json(),
  ],
}
