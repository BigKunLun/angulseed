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

var settings = require('./gulp_settings.json');

// build less
gulp.task('build-less', function(){
  return es.merge(
    gulp.src(settings.lessFiles)
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
    gulp.src(settings.cssLibFiles).pipe(concatCss('lib.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('build/css'))
  );
});

// compress,concat,rename js file with your App
gulp.task('build-js', function() {
  var concatjs = settings.jsFiles;

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

  var angular = settings.deployFlag ? "angular.min.js":"angular.js";
  settings.jsLibFiles.unshift("build/bower_components/angular/"+angular);
  return gulp.src(settings.jsLibFiles)
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
  if(settings.deployFlag){
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
  livereload.listen();
  gulp.run('build-index');
  gulp.watch('app/**/*.less', ['build-css']).on('change', function(){
    setTimeout(livereload.changed,1000);
  });
  gulp.watch('app/**/*.js', ['build-js']).on('change', function(){
    console.log('js change');
    setTimeout(livereload.changed,1000);
  });
  gulp.watch('app/modules/index/index.html', ['build-index']).on('change', function(){
    setTimeout(livereload.changed,1000);
  });
  gulp.watch('app/modules/**/*.html').on('change',livereload.changed);
  gulp.run('build-index');
});