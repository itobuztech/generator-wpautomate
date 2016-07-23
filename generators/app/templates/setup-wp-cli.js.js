'use strict';
/* global console */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var p = require('../package.json');
var exec = require('child_process').exec;

gulp.task('wpcli:install-core', function(){
	exec('wp core download',function (err, stdout, stderr) {
    if (stderr) {
    	console.log(stderr)
    }else {
    	console.log('Wordpress installed.');
    }
  });
});