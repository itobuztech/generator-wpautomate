'use strict';
/* global console, ls*/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var p = require('../package.json');
var exec = require('child_process').exec;
var shell = require('shelljs');
require('shelljs/global');

gulp.task('wpcli:install-core', function(){
	shell.exec('gulp themeinstall');
  if (ls('wp-content/themes/<%=projectName%>/').code !==2) {
    shell.exec('chmod 775 ./sh/setup.sh');
    shell.exec('chmod 775 ./sh/package.sh');
    shell.exec('chmod 775 ./sh/reset.sh');
    shell.exec('chmod 775 ./sh/sidebar-export.php');
    shell.exec('./sh/setup.sh');
  }else {
    console.log('Project build stoped due to clone error.');
  }

});
