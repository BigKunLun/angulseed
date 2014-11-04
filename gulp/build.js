// build real index.html by modules/index/index.html

var gulp = require('gulp'),
    filenames = require("gulp-filenames"),
    htmlreplace = require("gulp-html-replace");

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

var bowerCssArray = [
  '/bower_components/bootstrap/dist/css/bootstrap.css'
]

// appjs build
gulp.task('getAppFileNames',function(){
  return gulp.src(['./src/**/*.js','!./src/async_load.js']).pipe(filenames("appjs"));
});
gulp.task('appjs',['getAppFileNames'],function(){
  var loadjs = "<script src='/src/async_load.js'></script>";
  var scriptStr = '"' + filenames.get("appjs").join('","') + '"';
  var appjs = "<script>"+
                "$script([" + scriptStr + "],function(){"+
                  "angular.bootstrap(document,['myApp'])"+
                "});"+
              "</script>";
  devSrc.appjs = loadjs + "\r\t\t" + appjs;
});

// libjs build
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

gulp.task('libcss',function(){
  var bowercss = [];
  for (var i = 0;i<=bowerCssArray.length - 1; i++) {
    var script = "<link rel='stylesheet' href='" + bowerCssArray[i] + "'>";
    if(i>0){
      script = '\t\t' + script;
    }
    bowercss.push(script);
  };
  devSrc.libcss = bowercss.join('\r');
})

gulp.task('build',['appjs','libjs','libcss'],function(){
  gulp.src('./src/modules/index/index.html').pipe(htmlreplace({
    'load-app-js': devSrc.appjs,
    'load-lib-js': devSrc.libjs,
    'load-lib-css': devSrc.libcss
  })).pipe(gulp.dest('./src'));
});