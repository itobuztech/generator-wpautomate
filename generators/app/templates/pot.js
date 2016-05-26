var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');


gulp.task('wp:pot', function () {
	return gulp.src(config.themefolder + '**/*.php')
		.pipe(g.sort())
		.pipe(g.wpPot( {
			domain: config.textdomain,
			destFile:config.textdomain + '.pot',
			package: config.themename,
			bugReport: config.suopportUrl,
			lastTranslator: config.authorName + ' <' + config.authorEmail + '>',
			team: config.authorName + ' <' + config.authorEmail + '>'
		} ))
		.pipe(gulp.dest(config.themefolder+'languages/'));
});
