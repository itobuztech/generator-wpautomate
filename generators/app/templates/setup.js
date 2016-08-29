'use strict';
/* global console */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var request = require('request');
var g = require('gulp-load-plugins')();
var config = require('./config.json');
var p = require('../package.json');
var download = require('download');
var del = require('del');
var themerepoLocation = 'https://github.com/developer-prosenjit/wpautomate.git';
var themerepo = <%=themerepo%>;
if (themerepo=='private') {
  themerepoLocation = 'git@bitbucket.org:itobuztech/wpautomate.git';
}

// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
gulp.task('themeinstall', function() {
  return g.git.clone(themerepoLocation, {args: './wp-content/themes/wpautomate'}, function(err) {
    console.log('Please setup env. env-example.json located in /gulp-tasks.');
    runSequence('wp-rp');
  });
});


gulp.task('clean', function(){
  return del(['wp-admin', 'wp-includes', '*.php', '!wp-config.php'])
  .then(function(){
    console.log('wordpres core clean completed.');
  });
});

gulp.task('clean:temp', function(){
  return del(['temp'])
  .then(function(){
    console.log('temp cleaned.');
  });
});



gulp.task('wpSetup', function() {
  runSequence(
    'wpcli:install-core',
    'ua:setup'
    );
});


gulp.task('plugin:uninstall', function(){
  var wporg = Object.keys(p.wporg_plugins).length;
  var own = Object.keys(p.own_plugins).length;
  var paid = Object.keys(env.paid_plugins).length;
  var pluginDir = './wp-content/plugins/';

  var list = [];

  var cw;
  for (var i=0; i<wporg; i++) {
    cw = pluginDir+Object.keys(p.wporg_plugins)[i];
    list.push(cw);
  }

  var co;
  for (var i=0; i<own; i++) {
    cw = pluginDir+Object.keys(p.own_plugins)[i];
    list.push(cw);
  }

  var cp;
  for (var i=0; i<paid; i++) {
    cw = pluginDir+Object.keys(env.paid_plugins)[i];
    list.push(cw);
  }

  return del(list)
  .then(function(){
    console.log(list + ' Plugins sucessfully uninstalled.');
  });

});

gulp.task('plugin:install', function(){
  var wporgrepo = 'https://downloads.wordpress.org/plugin/';
  var item_length = Object.keys(p.wporg_plugins).length;
  var temp = [];
  var url = [];
  var reqtest = [];
  for (var i=0; i<item_length; i++) {
    temp[i] = Object.keys(p.wporg_plugins)[i];
    url[i] = wporgrepo+temp[i]+'.zip';
    try {
      requireDir('../wp-content/plugins/'+temp[i]);
      console.log('Skip '+temp[i]+' plugin.')
    }catch(err) {
      console.log(temp[i]+' downloading...');
      new download({mode: '755', extract: true})
      .get(url[i])
      .dest('./wp-content/plugins')
      .run(function (err, files) {
        if (err) {
          console.log(err);
        }else {
          console.log('One of plugin download completed.')
        }
      });
    }
  }
});

function installPluginEnvato(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var downloadUrl = info.wordpress_plugin;

    // download js composer
    var isJscomposer = downloadUrl.search('js_composer');
    if (isJscomposer>1) {
      console.log('js_composer downloading...');
      new download({mode: '755'})
      .get(downloadUrl)
      .rename('js_composer.zip')
      .dest(config.themefolder+'inc/plugins/')
      .run(function  (err) {
        if (err) {
          console.log(err);
        }else {
         console.log('Js composer download completed.');
        }
      });
    }

    // download rev slider
    var isRevSlider = downloadUrl.search('slider-revolution');
    if (isRevSlider>1) {
      console.log('slider-revolution downloading...');
      new download({mode: '755'})
      .get(downloadUrl)
      .rename('rev_slider.zip')
      .dest(config.themefolder+'inc/plugins/')
      .run(function  (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('Rev slider download completed.');
        }
      });
    }

    // ultimate vc addon
    var isRevSlider = downloadUrl.search('ultimate-addons-for-visual-composer');
    if (isRevSlider>1) {
      console.log('ultimate vc addon downloading...');
      new download({mode: '755'})
      .get(downloadUrl)
      .rename('ultimate_vc.zip')
      .dest(config.themefolder+'inc/plugins/')
      .run(function  (err) {
        if (err) {
          console.log(err);
        }else {
          console.log('ultimate vc addon completed.');
        }
      });
    }

  }else {
    console.log('purchase_code error.');
  }
}

gulp.task('plugin:installEnvato', function(){
  var lists = {};
  try {
    var env = require('./env.json');
    //checkenv();
    if (env.hasOwnProperty('paid_plugins') && env.hasOwnProperty('envatoAuthorApiKey')) {

      if(env.paid_plugins.hasOwnProperty('js_composer')) {
        // js Composer
        lists.js_composer = {
          url: 'https://api.envato.com/v3/market/buyer/download?purchase_code='+env.paid_plugins.js_composer,
          headers: {
            'Authorization': 'Bearer '+env.envatoAuthorApiKey
          }
        };

        request(lists.js_composer, installPluginEnvato);

      }

      if(env.paid_plugins.hasOwnProperty('revolution_slider')) {
        // revolution slider
        lists.rev_slider = {
          url: 'https://api.envato.com/v3/market/buyer/download?purchase_code='+env.paid_plugins.revolution_slider,
          headers: {
            'Authorization': 'Bearer '+env.envatoAuthorApiKey
          }
        };

        request(lists.rev_slider, installPluginEnvato);
      }

      if(env.paid_plugins.hasOwnProperty('ultimate_vc')) {
        // ultimate vc addon
        lists.ultimate_vc = {
          url: 'https://api.envato.com/v3/market/buyer/download?purchase_code='+env.paid_plugins.ultimate_vc,
          headers: {
            'Authorization': 'Bearer '+env.envatoAuthorApiKey
          }
        };

        request(lists.ultimate_vc, installPluginEnvato);
      }


    }else {
      console.log('No Paid plugins or api key is missing.');
    }
  }catch(e){
    console.log('setup env env-example.json located gulp-tasks/  in root. update your current env from env-example.json');
  }

});

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
// replace theme string
gulp.task('rp:textdomain', function(){
  if (p.name!==config.themename) {
    return gulp.src([config.themefolder+'**/*.php', config.themefolder+'**/*.css'])
      .pipe(g.replace(config.textdomain, p.name))
      .pipe(g.replace(config.packageName, p.name))
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
      'rp:tasks'
    );
  }else {
    console.log('If you want to change project name, change package name in package.json');
  }
});

// backup db auto with git commit
gulp.task('backup:git', function(){
  try {
    var env = require('./env.json');
    gulp.src('./gulp-tasks/pre-commit.txt')
    .pipe(g.rename('pre-commit'))
    .pipe(g.replace('db_user', env.db_user))
    .pipe(g.replace('db_name', env.db_name))
    .pipe(gulp.dest('./.git/hooks/'));
  }catch (e) {
    console.log('setup env env-example.json located gulp-tasks/  in root. update your current env from env-example.json');
  }

});

// restore db auto with git pull
gulp.task('restore:git', function(){
  try {
    var env = require('./env.json');
    gulp.src('./gulp-tasks/post-merge.txt')
    .pipe(g.rename('post-merge'))
    .pipe(g.replace('db_user', env.db_user))
    .pipe(g.replace('db_name', env.db_name))
    .pipe(gulp.dest('./.git/hooks/'));
  }catch (e) {
    console.log('setup env env-example.json located gulp-tasks/  in root. update your current env from env-example.json');
  }

});

// backup db manual
gulp.task('backup', function () {
  try {
    var env = require('./env.json');
    return gulp.src('*.js', {read: false})
    .pipe(g.shell([
     'mysqldump -u '+env.db_user+' -p  --skip-extended-insert '+ env.db_name+' > db.txt'
    ]));
   }catch (e) {
      console.log('setup env env-example.json located gulp-tasks/  in root. update your current env from env-example.json');
  }
});
// restore db manual
gulp.task('restore', function () {
  try {
    var env = require('./env.json');
    return gulp.src('*.js', {read: false})
      .pipe(g.shell([
       'mysql -u '+env.db_user+' -p '+ env.db_name +' < db.txt'
      ]));
   }catch (e) {
      console.log('setup env env-example.json located gulp-tasks/  in root. update your current env from env-example.json');
  }
});

gulp.task('wp-config', function() {
  var env = require('./env.json');
  return gulp.src('gulp-tasks/wp-config.tpl')
  .pipe(g.replace('db_name', env.db_name))
  .pipe(g.replace('db_user', env.db_user))
  .pipe(g.replace('wpdbPass', env.wpdbPass))
  .pipe(g.replace('wpdbHost', env.wpdbHost))
  .pipe(g.replace('wpdbChar', env.wpdbChar))
  .pipe(g.replace('authorName', env.authorName))
  .pipe(g.replace('authorEmail', env.authorEmail))
  .pipe(g.rename('wp-config.php'))
  .pipe(gulp.dest('./'));
});

gulp.task('destroy', function(){
  return del([
    'wp-content', 'wp-admin', 'wp-includes', 
    'documentation', 'gulp-tasks', '.*', '*.*',
    '!.git', '!node_modules', '!bower_components'
    ])
  .then(function(){
    console.log('All files removed.');
  });
});