var gulp = require('gulp'),
    config = require('../config'),
    less = require('gulp-less'),
    handleError = require('../handleError');

// build less to css
gulp.task('dev:less',function () {
  return gulp.src('src/modules/index/index.less')
    .pipe(less())
    .on('error', handleError)
    .pipe(gulp.dest('src/'));
});

gulp.task('deploy:less',function(){
  return gulp.src('src/modules/index/index.less')
    .pipe(less())
    .on('error', handleError)
    .pipe(gulp.dest('dist/css/'));
})