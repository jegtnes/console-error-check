var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src('index.js')
    .pipe(jshint());
});

gulp.task('default', ['jshint']);
