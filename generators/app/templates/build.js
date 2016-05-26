
'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');
var p = require('../package.json');

gulp.task('build',function(){
  runSequence('styles:b', 'script:vendorjs');
});
