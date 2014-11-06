var gulp = require('gulp');
var del = require('del');

gulp.task('clean:devIndex', function (cb) {
  del([
    'src/index.html',
    'src/index.css'
  ], cb);
});

gulp.task('clean:dist',function(){
  del([
    'dist/*'
  ], cb);
});