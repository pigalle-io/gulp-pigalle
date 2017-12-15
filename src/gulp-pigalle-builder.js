/*
 * This file is part of gulp-pigalle.
 *
 * (c) 2017 Deepnox & pigalle.io
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


import path from 'path';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

const g = gulpLoadPlugins({lazy: true});
const PluginError = g.util.PluginError;
const PLUGIN_NAME = 'gulp-pigalle';


export function build(moduleName, input = 'src/index.js', output = 'index.js', destination = './dist', options = {}) {
  if (!moduleName) {
    throw new PluginError(PLUGIN_NAME, 'Missing module name');
  }
  if (!input) {
    throw new PluginError(PLUGIN_NAME, 'Missing entry file');
  }
  if (!output) {
    throw new PluginError(PLUGIN_NAME, 'Missing output file');
  }
  if (!destination) {
    throw new PluginError(PLUGIN_NAME, 'Missing output destination directory');
  }

  if (!options.babel) {
    options.babel = {
      presets: [
        ['env', {
          'modules': false
        }
        ]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'add-module-exports',
        'transform-object-rest-spread',
      ],
      babelrc: false,
      exclude: 'node_modules/**'
    }
  }

  if (!options.bundle) {
    options.bundle = {};
  }

  if (!options.bundle.format) {
    options.format = 'umd';
  }

  return rollup({
    input: input,
    sourcemap: true,
    plugins: [
      babel(options.babel)
    ]
  }).then(bundle => {
    return bundle.generate({
      format: options.format,
      moduleName: moduleName,
    })
  });

}
