'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var request = require('request');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');
var p = require('../package.json');
var download = require('download');
var del = require('del');


gulp.task('package:theme', function(){
	return gulp.src(config.themefolder+'**/*.*')
		.pipe(g.zip(config.themename+'.zip'))
		.pipe(gulp.dest('package'));
});

gulp.task('package:document', function(){
	return gulp.src('./documentation/**/*.*')
		.pipe(g.zip('documentation.zip'))
		.pipe(gulp.dest('package'));
});

gulp.task('package:main', function(){
	return gulp.src(['./package/documentation.zip', './package/'+config.themename+'.zip'])
		.pipe(g.zip('main.zip'))
		.pipe(gulp.dest('package'));
});


gulp.task('package:plugins', function() {
	var itemLength = Object.keys(p.own_plugins).length;
	var pluginLocation = './wp-content/plugins/';
	for (var i=0; i<itemLength; i++) {
		var currentItem = Object.keys(p.own_plugins)[i];
		console.log(currentItem+' Zip process strated.');
		if (i===itemLength) {
			return gulp.src(pluginLocation+currentItem+'/**/*.*')
			.pipe(g.zip(currentItem+'.zip'))
			.pipe(gulp.dest(config.themefolder+'inc/plugins'));
		}else {
			gulp.src(pluginLocation+currentItem+'/**/*.*')
			.pipe(g.zip(currentItem+'.zip'))
			.pipe(gulp.dest(config.themefolder+'inc/plugins'));
		}
	}
});

gulp.task('package:msg',  function(){
	console.log('Voila package is ready!');
	console.log('Manually verify your package before upload.');
});

gulp.task('package', function(){
	runSequence(
	'package:document',
	'package:plugins',
	'package:theme',
	'package:main',
	'package:msg'
	);
});
