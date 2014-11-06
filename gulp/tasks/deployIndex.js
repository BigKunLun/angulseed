var gulp = require('gulp'),
    htmlReplace = require('gulp-html-replace'),
    config = require('../config');

gulp.task('deploy:index',['deploy:filehash','deploy:html'],function(){
    var cssFileNames = require('../../dist/css/rev-manifest.json');
    var jsFileNames = require('../../dist/js/rev-manifest.json');
    gulp.src('src/modules/index/index.html').pipe(htmlReplace({
      'load-app-js': '/dist/js/'+jsFileNames['app.min.js'],
      'load-lib-js': '/dist/js/'+jsFileNames['lib.min.js'],
      'load-lib-css': '/dist/css/'+cssFileNames['lib.min.css'],
      'load-app-css': '/dist/css/'+cssFileNames['index.min.css']
    })).pipe(gulp.dest('dist/'));
});