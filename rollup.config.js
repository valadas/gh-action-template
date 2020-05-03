import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default {
    name: 'index',
    input: 'index.ts',
    output: {
        file: './dist/index.js',
        format: 'umd',
        name: 'index',
        sourcemap: true
    },
    plugins: [
        typescript(),
        resolve({ jsnext: true }),
        commonJS()
  ]
};