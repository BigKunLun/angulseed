var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
var config = require('../config');

gulp.task('dev:index',['clean:devIndex','dev:libjs','dev:appjs','dev:libcss','dev:appcss'],function(){
  gulp.src('src/modules/index/index.html').pipe(htmlReplace({
    'load-app-js': config.devLoadSrc.appjs,
    'load-lib-js': config.devLoadSrc.libjs,
    'load-lib-css': config.devLoadSrc.libcss,
    'load-app-css': config.devLoadSrc.appcss
  })).pipe(gulp.dest('src/'));
});