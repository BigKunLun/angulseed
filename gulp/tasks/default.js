'use strict';

var gulp = require('gulp');
var config = require('../config');

// dev mode
gulp.task('default',function(){
  gulp.start('dev:index');
  gulp.watch(['src/**/*.js','src/modules/**/*.less'],['dev:index']);
});