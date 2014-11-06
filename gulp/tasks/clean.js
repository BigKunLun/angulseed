var gulp = require('gulp'),
    del = require('del');

gulp.task('clean:devIndex', function (cb) {
  del([
    'src/index.html',
    'src/index.css'
  ], cb);
});

gulp.task('clean:dist',function(cb){
  del([
    'dist/*'
  ], cb);
});