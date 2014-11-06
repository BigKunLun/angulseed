'use strict';

var gulp = require('gulp'),
    config = require('../config');

// dev mode
gulp.task('default',function(){
  gulp.start('dev:index');
  gulp.watch(['src/**/*.js','src/modules/**/*.less'],['dev:index']);
});

// deploy mode
gulp.task('deploy',['clean:dist'],function(){
  config.isDeploy = true;
  gulp.start('deploy:index');
});