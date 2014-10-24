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

// deploy flag,default develop
var deployFlag = false;

// build less
gulp.task('build-less', function(){
  return es.merge(
    gulp.src([
      'app/app.less'
    ])
      .pipe(less())
      .pipe(gulp.dest('build/css'))
  );
});

// compress,concat,rename css file
gulp.task('build-css',['build-less'], function() {
  return es.merge(
    gulp.src([
      'build/css/app.css'
    ])
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('build/css')),
    gulp.src([
      'build/bower_components/bootstrap/dist/css/bootstrap.min.css',
      'build/bower_components/angular-loading-bar/build/loading-bar.min.css'
    ]).pipe(concatCss('lib.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('build/css'))
  );
});

// compress,concat,rename js file with your App
gulp.task('build-js', function() {
  var concatjs = [
    'app/**/*.js'
  ];

  var onlyminjs = [];
  for (var i = concatjs.length - 1; i >= 0; i--) {
    if(concatjs[i].indexOf('!')>-1){
      onlyminjs.push(concatjs[i].replace('!',''));
    }
  };

  return es.merge(
    gulp.src(concatjs)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build/js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('build/js')),

    gulp.src(onlyminjs)
      .pipe(gulp.dest('build/js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
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
  var angular = deployFlag ? "angular.min.js":"angular.js";
  var concatjs = [
    "build/bower_components/jquery/dist/jquery.min.js",
    "build/bower_components/angular/"+angular,
    "build/bower_components/angular-i18n/angular-locale_zh-cn.js",
    "build/bower_components/angular-bootstrap/ui-bootstrap.min.js",
    "build/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    "build/bower_components/angular-route/angular-route.min.js",
    "build/bower_components/angular-sanitize/angular-sanitize.min.js",
    "build/bower_components/angular-animate/angular-animate.min.js",
    "build/bower_components/angular-resource/angular-resource.min.js",
    "build/bower_components/angular-loading-bar/build/loading-bar.min.js",
    "build/bower_components/angular-bindonce/bindonce.min.js"
  ];
  return gulp.src(concatjs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build-filehash',['build-css','build-libjs'],function(){
  return es.merge(
    gulp.src([
      'build/js/app.min.js',
      'build/js/lib.js'
    ])
      .pipe(rev())
      .pipe(gulp.dest('build/deploy-js'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('build/deploy-js')),
    gulp.src([
      'build/css/app.min.css',
      'build/css/lib.min.css'
    ])
      .pipe(rev())
      .pipe(gulp.dest('build/deploy-css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('build/deploy-css'))
  );
})

// build real index.html by modules/index/index.html
gulp.task('build-index',['build-filehash'],function(){
  if(deployFlag){
    var css_file_name = require('./build/deploy-css/rev-manifest.json');
    var js_file_name = require('./build/deploy-js/rev-manifest.json');
    gulp.src('app/modules/index/index.html')
      .pipe(htmlreplace({
        'libcss': '/build/deploy-css/'+css_file_name['lib.min.css'],
        'css': '/build/deploy-css/'+css_file_name['app.min.css'],
        'libjs': '/build/deploy-js/'+js_file_name['lib.js'],
        'js': '/build/deploy-js/'+js_file_name['app.min.js']
      }))
      .pipe(gulp.dest('./app'));
  }else{
    gulp.src('app/modules/index/index.html')
    .pipe(gulp.dest('app'));
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
  gulp.run('build-index');
});