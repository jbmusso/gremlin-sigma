var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var size = require('gulp-size');

gulp.task('build', function() {
  gulp.src('index.js')
      .pipe(browserify({
        debug: true,
        standalone: 'GremlinSigma'
      }))
      .pipe(rename('gremlin-sigma.js'))
      .pipe(gulp.dest('./build'))
      .pipe(size({ showFiles: true }))
      // Minified version
      .pipe(uglify())
      .pipe(rename('gremlin-sigma.min.js'))
      .pipe(gulp.dest('./build'))
      .pipe(size({ showFiles: true }));
});
