var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-Sync');
var watch = require('gulp-watch');
var surge = require('gulp-surge');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});

gulp.task('stylus', function() {
  gulp.src('./src/stylesheets/styles.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib(), jeet()]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('build', function() {
  gulp.src('./src/stylesheets/styles.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib(), jeet()]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('deploy', function() {
  return surge({
    project: './dist',
    domain: 'camerontee.product-page.surge.sh'
  })
});

gulp.task('watch', function() {
  watch('./src/stylesheets/**/*.styl', function() {
    return gulp.start('stylus');
  });
});

gulp.task('default', ['browser-sync', 'stylus', 'watch']);