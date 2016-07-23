'use strict';
/* global console */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var p = require('../package.json');
var exec = require('child_process').exec;
var shell = require('shelljs');

gulp.task('wpcli:install-core', function(){
	if(shell.exec('wp core download')) {
		  shell.exec('wp core install --url="http://localhost/wpautomate" --title="Wpautomate" --admin_user="prosenjit" --admin_password="pass" --admin_email="prosenjit@itobuz.com" --skip-email');
		  shell.exec('wp theme activate wpautomate');
		  shell.exec('wp plugin delete hello');
			shell.exec('wp plugin delete akismet');
			shell.exec('wp theme delete twentyfifteen');
			shell.exec('wp theme delete twentyfourteen');
			shell.exec('wp theme delete twentysixteen');
	}
});
