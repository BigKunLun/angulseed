'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*','del']
});

// dev static file src that will write into index.html
var devLoadSrc = {};

// bower lib js src with no mini
var bowerJsArray = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js'
];

// bower lib css src
var bowerCssArray = [
  'bower_components/bootstrap/dist/css/bootstrap.css'
];

// js file change flag
var appJsArrayFlag;

// error handle
function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

// build appjs
gulp.task('getAppFileNames',function(){
  appJsArrayFlag = Date.parse(new Date());
  return gulp.src(['src/**/*.js','!src/async_load.js']).pipe($.filenames(appJsArrayFlag.toString()));
});
gulp.task('appjs',['getAppFileNames'],function(){
  var arr = $.filenames.get(appJsArrayFlag.toString());
  var loadjs = "<script src='/src/async_load.js'></script>";
  var scriptStr = '"' + arr .join('","') + '"';
  var appjs = "<script>"+
                "$script([" + scriptStr + "],function(){"+
                  "angular.bootstrap(document,['myApp'])"+
                "});"+
              "</script>";
  devLoadSrc.appjs = loadjs + "\r\t\t" + appjs;
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
  devLoadSrc.libjs = bowerjs.join('\r');
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
  devLoadSrc.libcss = bowercss.join('\r');
})

// build less
gulp.task('build:less',  function () {
  return gulp.src('src/modules/index/index.less')
    .pipe($.less())
    .on('error', handleError)
    .pipe(gulp.dest('./src/'));
});
gulp.task('appcss',['build:less'],function(){
  var link = "<link rel='stylesheet' href='/src/index.css'>\r";
  devLoadSrc.appcss = link;
})

// del index.html
gulp.task('clean:dev-index', function (cb) {
  $.del([
    'src/index.html',
    'src/index.css'
  ], cb);
});

// gulp dev mode
gulp.task('dev',['clean:dev-index','appjs','libjs','libcss','appcss'],function(){
  gulp.src('src/modules/index/index.html').pipe($.htmlReplace({
    'load-app-js': devLoadSrc.appjs,
    'load-lib-js': devLoadSrc.libjs,
    'load-lib-css': devLoadSrc.libcss,
    'load-app-css': devLoadSrc.appcss
  })).pipe(gulp.dest('src/'));
  gulp.watch(['src/**/*.js','src/modules/**/*.less'],['dev']);
});

// dev mode
gulp.task('default',function(){
  gulp.start('dev');
})