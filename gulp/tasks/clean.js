var gulp = require('gulp'),
    del = require('del');

gulp.task('clean:app',function(cb){
  del([
    'app/*'
  ], cb);
});