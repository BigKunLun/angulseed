var gulp = require('gulp');

// gulp'plugins
var less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    concatCss = require('gulp-concat-css'),
    htmlreplace = require('gulp-html-replace'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev'),
    del = require('del');

// var settings = require('./gulp_settings.json');
var gulpSetting = require('./gulp_settings.json');

var appjs = gulpSetting.js.srcName.replace('.','.min.');
var appcss = gulpSetting.css.srcName.replace('.','.min.');
var libcss = gulpSetting.css.libName.replace('.','.min.');

// build less
gulp.task('build-less', function(){
  return es.merge(
    gulp.src(gulpSetting.css.src)
      .pipe(less())
      .pipe(gulp.dest(gulpSetting.css.dev))
  );
});

// compress,concat,rename css file
gulp.task('build-css',['build-less'], function() {
  return es.merge(
    gulp.src(gulpSetting.css.dev + gulpSetting.css.srcName)
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest(gulpSetting.css.dev)),
    gulp.src(gulpSetting.css.lib).pipe(concatCss(gulpSetting.css.libName))
      .pipe(gulp.dest(gulpSetting.css.dev))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest(gulpSetting.css.dev))
  );
});

// compress,concat,rename js file with your App
gulp.task('build-js', function() {
  var concatjs = gulpSetting.js.src;

  var onlyminjs = [];
  for (var i = concatjs.length - 1; i >= 0; i--) {
    if(concatjs[i].indexOf('!')>-1){
      onlyminjs.push(concatjs[i].replace('!',''));
    }
  };

  return es.merge(
    gulp.src(concatjs)
      .pipe(concat(gulpSetting.js.srcName))
      .pipe(gulp.dest(gulpSetting.js.dev))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(gulpSetting.js.dev)),

    gulp.src(onlyminjs)
      .pipe(gulp.dest(gulpSetting.js.dev))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(gulpSetting.js.dev))
  );
});

// compress lib js which have no min file
gulp.task('uglify-libs',['build-js'],function(){
  // return es.merge(
  //   gulp.src("build/bower_components/lib_a/lib_a.js")
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(uglify())
  //     .pipe(gulp.dest("build/bower_components/lib_a/")),
  //   gulp.src("build/bower_components/lib_b/lib_b.js")
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(uglify())
  //     .pipe(gulp.dest("build/bower_components/lib_b/"))
  // );
});

// concat lib js
gulp.task('build-libjs', ['uglify-libs'], function() {
  var angular = gulpSetting.isDeploy ? "angular.min.js":"angular.js";
  var libjs = gulpSetting.js.lib;
  libjs.unshift("build/bower_components/angular/"+angular);
  return gulp.src(libjs)
    .pipe(concat(gulpSetting.js.libName))
    .pipe(gulp.dest(gulpSetting.js.dev));
});

// make file versions
gulp.task('build-filehash',['build-css','build-libjs'],function(){
  return es.merge(
    gulp.src([
      gulpSetting.css.dev + appcss,
      gulpSetting.css.dev + libcss
    ])
      .pipe(rev())
      .pipe(gulp.dest(gulpSetting.css.deploy))
      .pipe(rev.manifest())
      .pipe(gulp.dest(gulpSetting.css.deploy)),
    gulp.src([
      gulpSetting.js.dev + appjs,
      gulpSetting.js.dev + gulpSetting.js.libName
    ])
      .pipe(rev())
      .pipe(gulp.dest(gulpSetting.js.deploy))
      .pipe(rev.manifest())
      .pipe(gulp.dest(gulpSetting.js.deploy))
  );
})

// build real index.html by modules/index/index.html
gulp.task('build-index',['build-filehash'],function(){
  if(gulpSetting.isDeploy){
    var css_file_name = require('.'+gulpSetting.css.deploy+'rev-manifest.json');
    var js_file_name = require('.'+gulpSetting.js.deploy+'rev-manifest.json');
    gulp.src(gulpSetting.realIndex)
      .pipe(htmlreplace({
        'libcss': gulpSetting.css.deploy + css_file_name[libcss],
        'css': gulpSetting.css.deploy + css_file_name[appcss],
        'libjs': gulpSetting.js.deploy + js_file_name[gulpSetting.js.libName],
        'js': gulpSetting.js.deploy + js_file_name[appjs]
      }))
      .pipe(gulp.dest('./app'));
  }else{
    gulp.src(gulpSetting.realIndex)
    .pipe(gulp.dest('./app'));
  }
});

// clean build folder
gulp.task('clean:build', function (cb) {
  del([
    'build/*',
    '!build/bower_components'
  ], cb);
});

// gulp run
gulp.task('default', ['clean:build'],function(){
  livereload.listen();
  gulp.run('build-index');
  gulp.watch('app/**/*.less', ['build-css']).on('change', function(){
    setTimeout(livereload.changed,1000);
  });
  gulp.watch('app/**/*.js', ['build-js']).on('change', function(){
    setTimeout(livereload.changed,1000);
  });
  gulp.watch(gulpSetting.realIndex, ['build-index']).on('change', function(){
    setTimeout(livereload.changed,1000);
  });
  gulp.watch('app/modules/**/*.html').on('change',livereload.changed);
  gulp.run('build-index');
});