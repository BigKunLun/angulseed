'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('../config');

// dev mode
gulp.task('default',function(){
  gulp.start('dev:index');
  // watch(['./src/**/*.js','./src/modules/**/*.less','./src/modules/index/index.html'], function (files, cb) {
  //   console.log('hello');
  //   gulp.start('dev:index');
  // });
    // gulp.src(['./src/**/*.js','./src/modules/**/*.less','./src/modules/index/index.html'])
    //     .pipe(watch(['./src/**/*.js','./src/modules/**/*.less','./src/modules/index/index.html'], function(files) {
    //         //return files.pipe(gulp.dest('./one/'));
    //         console.log('hello');
    //     }))
        //.pipe(gulp.dest('./two/'));
  //gulp.watch(['./src/**/*.js','./src/modules/**/*.less','./src/modules/index/index.html'],['dev:index']);
    // watch({glob:'./src/**/*.js'}, function (files, cb) {
    //     gulp.start('dev:index', cb);
    // });
    // var deveopWatch = function(){
    //   return gulp.start('dev:index');
    // }
    watch(['src/**/*.js','src/modules/**/*.less','src/modules/index/index.html'],function(ev,cb){
      gulp.start('dev:index');
      console.log('test');
      cb();
    });
});

// deploy mode
gulp.task('deploy',['clean:dist'],function(){
  config.isDeploy = true;
  gulp.start('deploy:index');
});