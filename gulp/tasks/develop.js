var gulp = require('gulp'),
    config = require('../config'),
    htmlReplace = require('gulp-html-replace'),
    filenames = require('gulp-filenames');

// build lib js
gulp.task('dev:libjs',function(){
  var bowerjs = [];
  for (var i = 0;i<=config.devLibJs.length - 1; i++) {
    var script = "<script src='/" + config.devLibJs[i] + "'></script>";
    if(i>0){
      script = '\t\t' + script;
    }
    bowerjs.push(script);
  };
  config.devLoadSrc.libjs = bowerjs.join('\r');
});

// build app js
gulp.task('jsfilenames',function(){
  config.devAppJsFlag = Date.parse(new Date());
  return gulp.src(['src/**/*.js','!src/async_load.js']).pipe(filenames(config.devAppJsFlag.toString()));
});
gulp.task('dev:appjs',['jsfilenames'],function(){
  var jsArr = filenames.get(config.devAppJsFlag.toString());
  var jsStr = "<script src='" + jsArr.join("'></script><script src='") + "'></script>";
  console.log(jsStr);
  // var loadjs = "<script src='/src/async_load.js'></script>";
  // var scriptStr = '"' + arr .join('","') + '"';
  // var appjs = "<script>"+
  //               "$script([" + scriptStr + "],function(){"+
  //                 "angular.bootstrap(document,['"+config.angularAppName+"'])"+
  //               "});"+
  //             "</script>";
  // config.devLoadSrc.appjs = loadjs + "\r\t\t" + appjs;
  config.devLoadSrc.appjs = jsStr;
});

// build lib css 
gulp.task('dev:libcss',function(){
  var bowercss = [];
  for (var i = 0;i<=config.devLibCss.length - 1; i++) {
    var link = "<link rel='stylesheet' href='/" + config.devLibCss[i] + "'>";
    if(i>0){
      link = '\t\t' + link;
    }
    bowercss.push(link);
  };
  config.devLoadSrc.libcss = bowercss.join('\r');
});

// build app css
gulp.task('dev:appcss',['dev:less'],function(){
  var link = "<link rel='stylesheet' href='/src/index.css'>\r";
  config.devLoadSrc.appcss = link;
});

gulp.task('dev:index',['clean:devIndex','dev:libjs','dev:appjs','dev:libcss','dev:appcss'],function(){
  gulp.src('src/modules/index/index.html').pipe(htmlReplace({
    'load-app-js': config.devLoadSrc.appjs,
    'load-lib-js': config.devLoadSrc.libjs,
    'load-lib-css': config.devLoadSrc.libcss,
    'load-app-css': config.devLoadSrc.appcss
  })).pipe(gulp.dest('src/'));
});