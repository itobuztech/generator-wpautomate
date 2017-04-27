'use strict';
var gulp = require('gulp');
var gcmq = require('gulp-group-css-media-queries');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');


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



var fontName = 'Icons';
gulp.task('icon', function() {
  runSequence('iconfont:variable', 'iconfont', 'iconfont:preview');
});

gulp.task('iconfont', function(){
  console.log('All svg should be placed this location '+config.themefolder +'assets/icons');
  gulp.src([config.themefolder +'assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './sh/_icons.scss',
      targetPath: '../scss/_icons.scss',
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize:true
     }))
    .pipe(gulp.dest(config.themefolder +'fonts/'));
});

gulp.task('iconfont:variable', function(){
  gulp.src([config.themefolder +'assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './sh/_icons-variables.scss',
      targetPath: '../scss/_icons-variables.scss',
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize:true
     }))
    .pipe(gulp.dest(config.themefolder +'fonts/'));
});

gulp.task('iconfont:preview', function(){
  gulp.src([config.themefolder +'assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './sh/icon-preview.html',
      targetPath: '../icon-preview.html',
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize:true
     }))
    .pipe(gulp.dest(config.themefolder + 'temp/fonts'));
});
