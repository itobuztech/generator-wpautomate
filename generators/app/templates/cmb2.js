'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');
var del = require('del');

var cmb2 = {"dir": config.themefolder+'inc/plugins/cmb2/'};
cmb2.dotFiles = cmb2.dir + '.*';
cmb2.md = cmb2.dir + '*.md';
cmb2.clover = cmb2.dir + '*.clover';
cmb2.json = cmb2.dir + '*.json';
cmb2.js = cmb2.dir + '*.js';
cmb2.test = cmb2.dir + 'tests/';
cmb2.dist = cmb2.dir + '*.dist';
cmb2.txt = cmb2.dir + '*.txt';
cmb2.php = cmb2.dir + 'example-functions.php';

gulp.task('clean:cmb2', function() {
	return del([cmb2.dotFiles, cmb2.md, cmb2.clover, cmb2.json, cmb2.js, cmb2.test, cmb2.dist, cmb2.txt, cmb2.php])
	.then(function(){
		console.log('cmb2 cleaned.');
	});
});

gulp.task('textdomain:cmb2', function(){
  gulp.src([cmb2.dir+'/**/*.php', cmb2.dir+'/**/*.mo', cmb2.dir+'/**/*.po'])
    .pipe(g.replace('cmb2', 'test'))
    .pipe(gulp.dest(cmb2.dir));
});