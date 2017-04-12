
'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');
var p = require('../package.json');

gulp.task('serve', ['styles:dev'], function () {
  g.livereload.listen();
  gulp.watch(config.themefolder+'**/*.php').on('change', function(file) {
    g.livereload.changed(file.path);
  });
  gulp.watch(config.themefolder+'/**/*.scss', ['styles:dev']);
  gulp.watch(config.themefolder+'/assets/icons/*.svg', ['iconfont']);
});
