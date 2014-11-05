'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*','del']
});

// dev static file src that will write into index.html
var devSrc = {
  appjs: '',
  appcss: '',
  libjs: '',
  libcss: ''
}

// bower lib js src with no mini
var bowerJsArray = [
  '/bower_components/jquery/dist/jquery.js',
  '/bower_components/angular/angular.js',
  '/bower_components/angular-route/angular-route.js'
]

// bower lib css src
var bowerCssArray = [
  '/bower_components/bootstrap/dist/css/bootstrap.css'
]

// error handle
function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

// build appjs
gulp.task('getAppFileNames',function(){
  if($.filenames.get("appjs").length>0){
    return 'get appjs filenames complete';
  }
  return gulp.src(['./src/**/*.js','!./src/async_load.js']).pipe($.filenames("appjs"));
});
gulp.task('appjs',['getAppFileNames'],function(){
  console.log($.filenames.get("appjs"));
  var loadjs = "<script src='/src/async_load.js'></script>";
  var scriptStr = '"' + $.filenames.get("appjs").join('","') + '"';
  var appjs = "<script>"+
                "$script([" + scriptStr + "],function(){"+
                  "angular.bootstrap(document,['myApp'])"+
                "});"+
              "</script>";
  devSrc.appjs = loadjs + "\r\t\t" + appjs;
});

// build libjs
gulp.task('libjs',function(){
  var bowerjs = [];
  for (var i = 0;i<=bowerJsArray.length - 1; i++) {
    var script = "<script src='" + bowerJsArray[i] + "'></script>";
    if(i>0){
      script = '\t\t' + script;
    }
    bowerjs.push(script);
  };
  devSrc.libjs = bowerjs.join('\r');
});

// build libcss 
gulp.task('libcss',function(){
  var bowercss = [];
  for (var i = 0;i<=bowerCssArray.length - 1; i++) {
    var link = "<link rel='stylesheet' href='" + bowerCssArray[i] + "'>";
    if(i>0){
      link = '\t\t' + link;
    }
    bowercss.push(link);
  };
  devSrc.libcss = bowercss.join('\r');
})

// build less
gulp.task('build:less',  function () {
  return gulp.src('./src/modules/index/index.less')
    .pipe($.less())
    .on('error', handleError)
    .pipe(gulp.dest('./src/'));
});
gulp.task('appcss',['build:less'],function(){
  var link = "<link rel='stylesheet' href='/src/index.css'>\r";
  devSrc.appcss = link;
})

// gulp dev mode
gulp.task('dev',['appjs','libjs','libcss','appcss'],function(){
  gulp.src('./src/modules/index/index.html').pipe($.htmlReplace({
    'load-app-js': devSrc.appjs,
    'load-lib-js': devSrc.libjs,
    'load-lib-css': devSrc.libcss,
    'load-app-css': devSrc.appcss
  })).pipe(gulp.dest('./src'));
  gulp.watch('./src/**/*.js',['dev']);
  gulp.watch('./src/modules/**/*.less',['build:less']);
});

// build real index.html by modules/index/index.html
gulp.task('default',function(){
  gulp.start('dev');
})