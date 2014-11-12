var gulp = require('gulp'),
    config = require('../config'),
    less = require('gulp-less'),
    handleError = require('../handleError');

gulp.task('build:less',function () {
  var dest = config.isDeploy?'app/css/':'app/';
  return gulp.src('src/modules/index/index.less')
    .pipe(less())
    .on('error', handleError)
    .pipe(gulp.dest(dest));
});