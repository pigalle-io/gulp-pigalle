(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('path'), require('gulp'), require('gulp-load-plugins')) :
	typeof define === 'function' && define.amd ? define(['exports', 'path', 'gulp', 'gulp-load-plugins'], factory) :
	(factory((global.gulpPigalle = {}),global.path,global.gulp,global.gulpLoadPlugins));
}(this, (function (exports,path,gulp,gulpLoadPlugins) { 'use strict';

path = path && path.hasOwnProperty('default') ? path['default'] : path;
gulp = gulp && gulp.hasOwnProperty('default') ? gulp['default'] : gulp;
gulpLoadPlugins = gulpLoadPlugins && gulpLoadPlugins.hasOwnProperty('default') ? gulpLoadPlugins['default'] : gulpLoadPlugins;

/*
 * This file is part of gulp-pigalle.
 *
 * (c) 2017 Deepnox & pigalle.io
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');

var g = gulpLoadPlugins({ lazy: true });
var PluginError = g.util.PluginError;
var PLUGIN_NAME = 'gulp-pigalle';

function build(moduleName) {
  var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'src/index.js';
  var output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'index.js';
  var destination = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : './dist';
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

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
      presets: [['env', {
        'modules': false
      }]],
      plugins: ['transform-decorators-legacy', 'transform-class-properties', 'add-module-exports', 'transform-object-rest-spread'],
      babelrc: false,
      exclude: 'node_modules/**'
    };
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
    plugins: [babel(options.babel)]
  }).then(function (bundle) {
    return bundle.generate({
      format: options.format,
      moduleName: moduleName
    });
  });
}

exports.build = build;

Object.defineProperty(exports, '__esModule', { value: true });

})));
