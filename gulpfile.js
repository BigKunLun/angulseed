var gulp = require('gulp');
var del = require('del');

gulp.task('clean:build', function (cb) {
  del([
    'build/*',
    '!build/bower_components'
  ], cb);
});

gulp.task('default', ['clean:build']);