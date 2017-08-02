/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 9 Février
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const path = require('path');

const dist = 'gulp-pigalle-alpha.dist.js';

const paths = {
  es6: ['./src/index.js'],
  es5: './dist/',
  sourceRoot: path.join(__dirname, './src'),
};

gulp.task('compile', () => {
  return rollup({
    entry: paths.es6[0],
    sourceMap: true,
  })
    .pipe(source('index.js', './src'))
    .pipe(buffer())
    .pipe(g.sourcemaps.init({loadMaps: true}))
    .pipe(g.babel({
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-decorators-legacy', 'transform-export-extensions', 'add-module-exports',]
    }))
    //.pipe(g.uglify())
    .pipe(g.rename(dist))
    .pipe(g.sourcemaps.write('.', {
      sourceRoot: (file) => {
        return path.relative(file.relative, path.join(file.cwd, 'src'));
      }
    }))
    .pipe(gulp.dest(paths.es5));
});

gulp.task('watch', ['compile'], function () { // (D)
  gulp.watch('./src/**/*.js', ['compile']);
});
gulp.task('default', ['watch']); // (E)
