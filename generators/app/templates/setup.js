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
var themerepoLocation = 'https://github.com/developer-prosenjit/wpautomate.git';
var themerepo = '<%=themerepo%>';
if (themerepo==='bitbucket') {
  themerepoLocation = 'git@bitbucket.org:itobuztech/wp-automate.git';
}

// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
gulp.task('themeinstall', function() {

  shell.exec('git clone --depth=1 '+themerepoLocation+' ./wp-content/themes/wpautomate');

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



// rename project
// replace string from gulp task
gulp.task('rp:tasks', function(){
  if (p.name!==config.themename) {
    return gulp.src(['./gulp-tasks/*.*'])
      .pipe(g.replace(config.themename, p.name))
      .pipe(g.replace(config.packageName, p.name))
      .pipe(gulp.dest('./gulp-tasks'));
  }else {
    console.log('change package name.');
  }

});
// replace string from shell script
gulp.task('rp:sh', function(){
  if (p.name!==config.themename) {
    return gulp.src(['./sh/*.*'])
      .pipe(g.replace(config.themename, p.name))
      .pipe(g.replace(config.packageName, p.name))
      .pipe(gulp.dest('./sh'));
  }else {
    console.log('change package name.');
  }

});
// replace theme string
gulp.task('rp:textdomain', function(){
  if (p.name!==config.themename) {
    return gulp.src([config.themefolder+'**/*.php', config.themefolder+'**/*.css'])
      .pipe(g.replace(config.textdomain, p.name))
      .pipe(g.replace(config.packageName, p.name))
      .pipe(gulp.dest(config.themefolder));
   }else {
      console.log('change package name.');
    }
});
// copy theme
gulp.task('rp:copy', function(){
  if (p.name!==config.themename) {
  return gulp.src(config.themefolder+'**/*.*')
  .pipe(gulp.dest('./wp-content/themes/'+p.name));
  }else {
      console.log('change package name.');
  }
});

gulp.task('rp:gitignore', function(){
  if (p.name!==config.themename) {
  return gulp.src('.gitignore')
  .pipe(g.replace(config.textdomain, p.name))
  .pipe(gulp.dest(''));
  }else {
    console.log('change package name.');
  }
});

// old theme delete
gulp.task('rp:del', function(){
  if (p.name!==config.themename) {
    return del([config.themefolder])
    .then(function(){
      console.log(config.themename+' removed from theme folder.');
    });
  }else {
      console.log('change package name.');
    }
});

// rename project main task
gulp.task('wp-rp', function(){
  if (p.name!==config.themename) {
    runSequence(
      'rp:textdomain',
      'rp:copy',
      'rp:del',
      'rp:gitignore',
      'rp:tasks',
      'rp:sh'
    );
  }else {
    console.log('If you want to change project name, change package name in package.json');
  }
});


gulp.task('destroy', function(){
  return del([
    'wp-content', 'wp-admin', 'wp-includes', 'sh',
    'documentation', 'gulp-tasks', '.*', '*.*',
    '!.git', '!node_modules', '!bower_components'
    ])
  .then(function(){
    console.log('All files removed.');
  });
});
