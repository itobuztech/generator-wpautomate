'use strict';
var gulp = require('gulp');
var config = require('./config.json');
var ftp = require('vinyl-ftp');
var argv = require('yargs').argv;
var g = require('gulp-load-plugins')();

var upload = argv.upload;




gulp.task('mail', function() {
	try {
		 var env = require('./env.json');
		 var api_key = env.mailgun.apikey;
		 var domain = env.mailgun.domain;
		 var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

		 var subject, text;

		 if (upload) {
		 	subject = 'Theme Upload';
		 	text = 'Hello World';
		 }

		 if(upload) {
		 	var data = {
		 	  from: env.authorName+'<me@samples.mailgun.org>',
		 	  to: env.mailgun.to,
		 	  subject: subject,
		 	  text: text
		 	};
		 	mailgun.messages().send(data, function (error, body) {
		 	  if(error) {
		 	  	console.log(error);
		 	  }else {
		 	  	console.log('mail send to '+env.mailgun.to);
		 	  }
		 	});
		 }else {
		 	console.log('You are trying to mail send without arugument.');
		 }


	}catch(e) {
		console.log('setup env env-example.json located gulp-tasks/  in root. Rename to env.json and set your env details');
	}




});
