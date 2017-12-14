(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('path'), require('gulp'), require('gulp-load-plugins'), require('rollup-stream'), require('vinyl-source-stream'), require('vinyl-buffer')) :
	typeof define === 'function' && define.amd ? define(['exports', 'path', 'gulp', 'gulp-load-plugins', 'rollup-stream', 'vinyl-source-stream', 'vinyl-buffer'], factory) :
	(factory((global.gulpPigalle = {}),global.path,global.gulp,global.gulpLoadPlugins,global.rollup,global.source,global.buffer));
}(this, (function (exports,path,gulp,gulpLoadPlugins,rollup,source,buffer) { 'use strict';

path = path && path.hasOwnProperty('default') ? path['default'] : path;
gulp = gulp && gulp.hasOwnProperty('default') ? gulp['default'] : gulp;
gulpLoadPlugins = gulpLoadPlugins && gulpLoadPlugins.hasOwnProperty('default') ? gulpLoadPlugins['default'] : gulpLoadPlugins;
rollup = rollup && rollup.hasOwnProperty('default') ? rollup['default'] : rollup;
source = source && source.hasOwnProperty('default') ? source['default'] : source;
buffer = buffer && buffer.hasOwnProperty('default') ? buffer['default'] : buffer;

/*
 * This file is part of gulp-pigalle.
 *
 * (c) 2017 Deepnox & pigalle.io
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var g = gulpLoadPlugins({ lazy: true });
var PluginError = g.util.PluginError;
var PLUGIN_NAME = 'gulp-pigalle';

function build() {
  var entryFilename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index.js';
  var entryPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './src';
  var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : './dist';
  var outFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'index.js';

  if (!entryFilename) {
    throw new PluginError(PLUGIN_NAME, 'Missing entry file');
  }
  var entry = path.join(entryPath, entryFilename);

  var stream = rollup({
    entry: entry,
    sourceMap: true }).pipe(source(entryFilename, entryPath)).pipe(buffer()).pipe(g.sourcemaps.init({ loadMaps: true })).pipe(g.babel({
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-decorators-legacy', 'transform-export-extensions', 'add-module-exports']
  })).pipe(g.uglify()).pipe(g.rename(outFilename)).pipe(g.sourcemaps.write('.', {
    sourceRoot: function sourceRoot(file) {
      return path.relative(file.relative, path.join(file.cwd, 'src'));
    }
  })).pipe(gulp.dest(destination));
  return stream;
}

exports.build = build;

Object.defineProperty(exports, '__esModule', { value: true });

})));
