'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gcmq = require('gulp-group-css-media-queries');
var g = require('gulp-load-plugins')();
var requireDir = require('require-dir');
var config = require('./config.json');


// styles 
gulp.task('styles:dev', function () {

  gulp.src(config.stylesScss)
    .pipe(g.plumber())    
    .pipe(g.sourcemaps.init())
    .pipe(g.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) 
    
    .pipe(g.autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(g.sourcemaps.write())
    .pipe(gulp.dest(config.compileStyles))
    .pipe(g.livereload({ start: true }));
});


gulp.task('styles:b', function () {

  gulp.src(config.stylesScss)
    .pipe(g.plumber())  
    .pipe(g.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],      
    }))
    .on('error',console.log.bind(console, 'Sass error:')) 
    .pipe(g.autoprefixer({
      browsers: [
        'last 2 versions',
        'android 4',
        'opera 12'
      ]
    }))
    .pipe(gcmq())
    .pipe(gulp.dest(config.compileStyles))
    .pipe(g.cssnano({discardComments: {removeAll: true}}))
    .pipe(g.rename({extname: '.css', suffix: ".min"}))
    .pipe(gulp.dest(config.compileStyles));

});
