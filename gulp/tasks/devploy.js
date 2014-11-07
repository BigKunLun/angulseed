var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    es = require('event-stream'),
    rev = require('gulp-rev'),
    rename = require('gulp-rename'),
    htmlReplace = require('gulp-html-replace'),
    config = require('../config');

// get concat and min css file
gulp.task('deploy:css',['deploy:less'],function(){
  return es.merge(
    gulp.src([
      'dist/css/index.css'
    ]).pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css')),
    gulp.src(config.devLibCss).pipe(concatCss('lib.min.css'))
      .pipe(gulp.dest('dist/css/'))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css/'))
  );
});

// get concat and min js file
gulp.task('deploy:js',function(){
  return es.merge(
    gulp.src([
      'src/**/*.js',
      '!src/async_load.js'
    ]).pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js/'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js')),
    gulp.src(config.devLibJs).pipe(concat('lib.min.js'))
      .pipe(gulp.dest('dist/js/'))
      // .pipe(uglify())
      // .pipe(gulp.dest('dist/js/'))
  );
});

gulp.task('deploy:filehash',['deploy:css','deploy:js'],function(){
  return es.merge(
    gulp.src([
      'dist/js/app.min.js',
      'dist/js/lib.min.js'
    ]).pipe(rev())
      .pipe(gulp.dest('dist/js/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('dist/js/')),
    gulp.src([
      'dist/css/index.min.css',
      'dist/css/lib.min.css'
    ]).pipe(rev())
      .pipe(gulp.dest('dist/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('dist/css'))
  );
});

gulp.task('deploy:html',function(){
  gulp.src('src/modules/**/*.html').pipe(gulp.dest('dist/modules/'));
});

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