'use strict';

import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import progress from 'rollup-plugin-progress';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'Soundwave',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    cleanup(),
    filesize(),
    json(),
    progress(),
    uglify(),
  ],
};
