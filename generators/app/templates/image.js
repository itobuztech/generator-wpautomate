var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var imagemin = require('gulp-imagemin');
var imageminJpegoptim = require('imagemin-jpegoptim');
var imageminOptipng = require('imagemin-optipng');
var config = require('./config.json');

gulp.task('imagemin', function () {
    return gulp.src('wp-content/uploads/**/*')
      .pipe(imagemin({
          progressive: true,
          use : [imageminJpegoptim({progressive: true, max: 90}),imageminOptipng({optimizationLevel: 7})]
      }))
     .pipe(gulp.dest('wp-content/uploads-min'));
});
