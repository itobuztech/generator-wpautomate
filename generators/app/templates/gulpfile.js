'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var tasks = requireDir('gulp-tasks');
var config = require('./gulp-tasks/config.json');
var p = require('./package.json');

// Add a task to render the output
gulp.task('help', g.taskListing);
