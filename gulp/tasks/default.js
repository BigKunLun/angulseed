'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('../config');

// dev mode
gulp.task('default',['clean:app'],function(){
  gulp.start('dev:app');
  watch(['src/**/*.*'],function(ev,cb){
    gulp.start('default');
    cb();
  });
});

// deploy mode
gulp.task('deploy',['clean:app'],function(){
  config.isDeploy = true;
  gulp.start('deploy:app');
});