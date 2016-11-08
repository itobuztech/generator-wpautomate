'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');
var p = require('../package.json');
var del = require('del');

var inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'version',
    message: 'Change project version?',
    default: function () {
      // var curVersion  = p.version;
      // curVersion = curVersion.split('.');
      // var nextVersion = parseInt(curVersion[2]);
      // curVersion[2] = nextVersion+1;
      // nextVersion = curVersion.join('.');
      // return nextVersion;
      return p.version;
    }
  }
];
var latestVersion = p.version;

gulp.task('ver', function() {
  inquirer.prompt(questions).then(function (answers) {
    latestVersion = answers.version;
    runSequence(
      'ver:package',
      'ver:theme'
      );
  });
});

gulp.task('ver:package', function() {
  return gulp.src('./package.json')
    .pipe(g.replace('"version": "'+p.version, '"version": "'+latestVersion))
    .pipe(gulp.dest('./'));
});
gulp.task('ver:theme', function() {
  return gulp.src(config.themefolder+'style.css')
    .pipe(g.replace('Version: '+p.version, 'Version: '+latestVersion))
    .pipe(gulp.dest(config.themefolder));
});

gulp.task('ver:package', function() {
  return gulp.src('./main.zip')
        .pipe(gulp.dest('./package/pack-'+latestVersion));
});
