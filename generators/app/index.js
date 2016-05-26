'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kickass ' + chalk.red('generator-wpautomate') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // root files
    this.fs.copy(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json ')
    );
    this.fs.copy(
      this.templatePath('_gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    // under gulp-tasks
    this.fs.copy(
      this.templatePath('build.js'),
      this.destinationPath('gulp-tasks/build.js')
    );

    this.fs.copy(
      this.templatePath('cmb2.js'),
      this.destinationPath('gulp-tasks/cmb2.js')
    );
    this.fs.copy(
      this.templatePath('config.json'),
      this.destinationPath('gulp-tasks/config.json')
    );
    this.fs.copy(
      this.templatePath('deploy.js'),
      this.destinationPath('gulp-tasks/deploy.js')
    );
    this.fs.copy(
      this.templatePath('document.md'),
      this.destinationPath('documentation/document.md')
    );
    this.fs.copy(
      this.templatePath('env-example.json'),
      this.destinationPath('gulp-tasks/env-example.json')
    );
    this.fs.copy(
      this.templatePath('image.js'),
      this.destinationPath('gulp-tasks/image.js')
    );
    this.fs.copy(
      this.templatePath('mail.js'),
      this.destinationPath('gulp-tasks/mail.js')
    );
    this.fs.copy(
      this.templatePath('package.js'),
      this.destinationPath('gulp-tasks/package.js')
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('gulp-tasks/package.json')
    );
    this.fs.copy(
      this.templatePath('post-merge.txt'),
      this.destinationPath('gulp-tasks/post-merge.txt')
    );
    this.fs.copy(
      this.templatePath('pot.js'),
      this.destinationPath('gulp-tasks/pot.js')
    );
    this.fs.copy(
      this.templatePath('pre-commit.txt'),
      this.destinationPath('gulp-tasks/pre-commit.txt')
    );
    this.fs.copy(
      this.templatePath('script.js'),
      this.destinationPath('gulp-tasks/script.js')
    );
    this.fs.copy(
      this.templatePath('serve.js'),
      this.destinationPath('gulp-tasks/serve.js')
    );
    this.fs.copy(
      this.templatePath('setup.js'),
      this.destinationPath('gulp-tasks/setup.js')
    );
    this.fs.copy(
      this.templatePath('styles.js'),
      this.destinationPath('gulp-tasks/styles.js')
    );
   
  },

  install: function () {
    this.installDependencies();
  }
});