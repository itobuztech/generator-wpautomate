var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');


// Main script js
gulp.task('script:mainjs', function(){
  return gulp.src([config.scripts+config.mainScript+'.js'])
    .pipe(g.jshint())
    .pipe(g.jshint.reporter('jshint-stylish'))
    .pipe(g.rename(config.mainScript+'.min.js'))
    .pipe(g.uglify())
    .pipe(gulp.dest(config.scripts));
});

gulp.task('script:lint', function() {
  return gulp.src([config.scripts+config.mainScript+'.js'])
    .pipe(g.jshint())
    .pipe(g.jshint.reporter('jshint-stylish'));
});


// Vendor js
gulp.task('script:vendorjs', function(){
  return gulp.src(config.scripts+'vendor/*.js')    
    .pipe(g.concat(config.vendorScript+'.min.js'))
    .pipe(g.uglify())
    .pipe(gulp.dest(config.scripts+'vendor/'));
});