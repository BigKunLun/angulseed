var gulp = require('gulp');
var config = require('../config');
var less = require('gulp-less');
var handleError = require('../handleError');

// build less to css
gulp.task('dev:less',function () {
  return gulp.src('src/modules/index/index.less')
    .pipe(less())
    .on('error', handleError)
    .pipe(gulp.dest('src/'));
});