/*
 * This file is part of gulp-pigalle.
 *
 * (c) 2017 Deepnox & pigalle.io
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');


const paths = {
  es6: ['./src/index.js'],
  es5: './dist/',
  output: 'gulp-pigalle-builder.dist.js',
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, './src'),
};

gulp.task('build', () => {
  return rollup({
    input: paths.es6[0],
    sourcemap: true,
    plugins: [
      babel({
        presets: [
          ['env',  {
            'modules': false}
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
      })
    ]
  })
    .then(bundle => {
      return bundle.generate({
        format: 'umd',
        moduleName: 'gulpPigalle',
      })
    })
    .then(gen => {
      return g.file(paths.output, gen.code, {src: true})
        .pipe(gulp.dest(paths.es5))
    })
});


gulp.task('watch', ['build'], function () {
  gulp.watch('./src/**/*.js', ['build']);
});
gulp.task('default', ['watch']);
