'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');


describe('generator-wpautomate:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
    
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../generators/app');
  });

  it('should add dependencies', function () {
    assert.fileContent('package.json', '"require-dir"');
    assert.fileContent('package.json', '"gulp-plumber"');
  });

  it('creates expected files', function () {
	  assert.file([
	    'bower.json',
      'package.json',
      '.editorconfig',
      '.bowerrc',
      '.gitignore',
      '.gitattributes'
	  ]);
	});

 

  
});
