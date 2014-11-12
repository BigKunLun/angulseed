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

gulp.task('deploy:css',['build:less'],function(){
  for (var i = config.cssLib.length - 1; i >= 0; i--) {
    config.cssLib[i] = "src/" + config.cssLib[i];
  };
  return es.merge(
    gulp.src([
      'app/css/index.css'
    ]).pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('app/css/')),
    gulp.src(config.cssLib).pipe(concatCss('lib.min.css'))
      .pipe(gulp.dest('app/css/'))
      .pipe(minifycss())
      .pipe(gulp.dest('app/css/'))
  );
});

gulp.task('deploy:js',function(){
  for (var i = config.jsLib.length - 1; i >= 0; i--) {
    config.jsLib[i] = "src/" + config.jsLib[i];
  };
  return es.merge(
    gulp.src([
      'src/**/*.js',
      '!src/bower_components/**/*.*'
    ]).pipe(concat('app.js'))
      .pipe(gulp.dest('app/js/'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('app/js')),
    gulp.src(config.jsLib).pipe(concat('lib.min.js'))
      .pipe(gulp.dest('app/js/'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js/'))
  );
});

gulp.task('deploy:filehash',['deploy:css','deploy:js'],function(){
  return es.merge(
    gulp.src([
      'app/js/app.min.js',
      'app/js/lib.min.js'
    ]).pipe(rev())
      .pipe(gulp.dest('app/js/'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('app/js/')),
    gulp.src([
      'app/css/index.min.css',
      'app/css/lib.min.css'
    ]).pipe(rev())
      .pipe(gulp.dest('app/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('app/css'))
  );
});

gulp.task('deploy:files',function(){
  return gulp.src(['src/modules/**/*.html']).pipe(gulp.dest('app/modules/'));
});

gulp.task('deploy:app',['deploy:filehash','deploy:files'],function(){
    var cssFileNames = require('../../app/css/rev-manifest.json');
    var jsFileNames = require('../../app/js/rev-manifest.json');
    gulp.src('app/modules/index/index.html').pipe(htmlReplace({
      'cssLib': '/app/css/'+cssFileNames['lib.min.css'],
      'cssApp': '/app/css/'+cssFileNames['index.min.css'],
      'jsLib':  '/app/js/'+jsFileNames['lib.min.js'],
      'jsApp': '/app/js/'+jsFileNames['app.min.js']
    })).pipe(gulp.dest('app/'));
});