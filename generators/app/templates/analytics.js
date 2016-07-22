var gulp = require('gulp');
var ua = require('universal-analytics');
var visitor = ua('UA-60956992-1');
var p = require('../package.json');

gulp.task('ua:setup', function(){
	visitor.event("wpautomate setup", "setup", p.name).send();
});
gulp.task('ua:serve', function(){
	visitor.event("wpautomate serve", "serve", p.name).send();
});