'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLibrary = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _rollupStream = require('rollup-stream');

var _rollupStream2 = _interopRequireDefault(_rollupStream);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PluginError = _gulpUtil2.default.PluginError;
var PLUGIN_NAME = 'gulp-pigalle-builder';
var g = (0, _gulpLoadPlugins2.default)({ lazy: true });

function buildLibrary() {
  var entryFilename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index.js';
  var entryPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './src';
  var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : './dist';
  var outFilename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'index.js';

  if (!entryFilename) {
    throw new PluginError(PLUGIN_NAME, 'Missing entry file');
  }
  var entry = _path2.default.join(entryPath, entryFilename);

  var stream = (0, _rollupStream2.default)({
    entry: entry,
    sourceMap: true }).pipe((0, _vinylSourceStream2.default)(entryFilename, entryPath)).pipe((0, _vinylBuffer2.default)()).pipe(g.sourcemaps.init({ loadMaps: true })).pipe(g.babel({
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-decorators-legacy', 'transform-export-extensions', 'add-module-exports']
  })).pipe(g.uglify()).pipe(g.rename(outFilename)).pipe(g.sourcemaps.write('.', {
    sourceRoot: function sourceRoot(file) {
      return _path2.default.relative(file.relative, _path2.default.join(file.cwd, 'src'));
    }
  })).pipe(_gulp2.default.dest(destination));
  return stream;
}

exports.buildLibrary = buildLibrary;
//# sourceMappingURL=gulp-pigalle-alpha.dist.js.map
