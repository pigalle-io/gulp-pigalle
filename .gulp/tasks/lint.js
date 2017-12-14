/*
 * This file is part of gulp-pigalle.
 *
 * (c) 2017 Deepnox & pigalle.io
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});
