'use strict';
var gulp = require('gulp');
var config = require('./config.json');
var ftp = require('vinyl-ftp');
var g = require('gulp-load-plugins')();
var argv = require('yargs').argv;

// pass argument gulp deploy --all for upload all files
var all = argv.all;

gulp.task('deploy', function() {
    try {
        var env = require('./env.json');
        var deployConfig = env.deploy_config;
        deployConfig.log = g.util.log;

        var conn = ftp.create(deployConfig);
        var localpath = env.local_path;

        // using base = '.' will transfer everything to /public_html correctly
        // turn off buffering in gulp.src for best performance



        if (all) {
        	return gulp.src(localpath, {
        		base: '.',
        		buffer: false
        	 })
        	.pipe(conn.dest(env.deploy_path));
        }else {
        	return gulp.src(localpath, {
        		base: '.',
        		buffer: false
        	 })
        	.pipe(conn.newer(env.deploy_path)) // only upload newer files
        	.pipe(conn.dest(env.deploy_path));
        }



    } catch (e) {
        console.log('setup env env-example.json located gulp-tasks/  in root. Rename to env.json and set your env details');
    }
});

gulp.task('deploy:clean', function(){
	var env = require('./env.json');
	var rmpath = env.delete_path;
	var deployConfig = env.deploy_config;
	deployConfig.log = g.util.log;
	var localpath = env.local_path;
	var conn = ftp.create(deployConfig);



	conn.rmdir(rmpath, function(err){
		if(err) {
			console.log(err);
		}else {
			console.log('remote directory deleted');
		}
	});

});
