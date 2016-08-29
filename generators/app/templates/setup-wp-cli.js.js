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
			shell.exec('wp core config --dbname=<%=dbName%> --dbuser=<%=dbUser%> --dbpass=<%=dbPass%> --dbhost=<%=dbHost%>');
			shell.exec('wp db create');
		  shell.exec('wp core install --url="<%=siteUrl%>" --title="<%=projectName%>" --admin_user="<%=projectName%>" --admin_password="<%=projectName%>" --admin_email="<%=authorEmail%>"');
		  shell.exec('gulp themeinstall');
		  shell.exec('wp theme activate <%=projectName%>');
		  shell.exec('wp plugin delete hello');
			shell.exec('wp plugin delete akismet');
			shell.exec('wp theme delete twentyfifteen');
			shell.exec('wp theme delete twentyfourteen');
			shell.exec('wp theme delete twentysixteen');
	}
});
