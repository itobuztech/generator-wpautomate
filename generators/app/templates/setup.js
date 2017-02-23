'use strict';
/* global console, ls */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var p = require('../package.json');
var shell = require('shelljs');
require('shelljs/global');
var del = require('del');
var themerepo = '<%=themerepo%>';

// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
gulp.task('themeinstall', function() {

  shell.exec('git clone --depth=1 '+themerepo+' ./wp-content/themes/wpautomate');

  if (ls('wp-content/themes/wpautomate/').code !==2) {
     shell.exec('gulp wp-rp');
     shell.exec('echo "Please setup env. env-example.json located in /gulp-tasks."');
  }else {
    console.log('project rename stoped, due to clone error.');
  }

});


gulp.task('clean', function(){
  return del(['wp-admin', 'wp-includes', '*.php', '!wp-config.php'])
  .then(function(){
    console.log('wordpres core clean completed.');
  });
});

gulp.task('clean:temp', function(){
  return del(['temp'])
  .then(function(){
    console.log('temp cleaned.');
  });
});



gulp.task('wpSetup', function() {
  runSequence(
    'wpcli:install-core',
    'ua:setup'
    );
});



gulp.task('destroy', function(){
  return del([
    'wp-content', 'wp-admin', 'wp-includes', 'sh', 'package', 'main', 'db', 'deploy',
    'documentation', 'gulp-tasks', '.*', '*.*',
    '!.git', '!node_modules', '!bower_components'
    ])
  .then(function(){
    console.log('All files removed.');
  });
});
