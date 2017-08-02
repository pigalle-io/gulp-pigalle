import path from 'path';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gutil from 'gulp-util';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-pigalle-builder';
const g = gulpLoadPlugins({lazy: true});

export function buildLibrary(entryFilename = 'index.js', entryPath = './src', destination = './dist', outFilename='index.js') {
  if (!entryFilename) {
    throw new PluginError(PLUGIN_NAME, 'Missing entry file');
  }
  const entry = path.join(entryPath, entryFilename);

  const stream = rollup({
    entry: entry,
    sourceMap: true,})
    .pipe(source(entryFilename, entryPath))
    .pipe(buffer())
    .pipe(g.sourcemaps.init({loadMaps: true}))
    .pipe(g.babel({
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-decorators-legacy', 'transform-export-extensions', 'add-module-exports',]
    }))
    .pipe(g.uglify())
    .pipe(g.rename(outFilename))
    .pipe(g.sourcemaps.write('.', {
      sourceRoot: (file) => {
        return path.relative(file.relative, path.join(file.cwd, 'src'));
      }
    }))
    .pipe(gulp.dest(destination));
  return stream;
}
