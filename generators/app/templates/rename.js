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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
      <% if (themerepo==='twentyseventeen')  { %>
        .pipe(g.replace('Twenty Seventeen', capitalizeFirstLetter(p.name)))
        .pipe(g.replace('@subpackage Twenty_Seventeen', '@subpackage '+capitalizeFirstLetter(p.name)))
      <% } %>
      .pipe(g.replace(config.textdomain, p.name))
      .pipe(g.replace('@package '+config.packageName, '@package '+capitalizeFirstLetter(p.name)))
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
