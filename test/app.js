'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wpautomate:app', function () {
  before all(function () {
    return helpers.run(path.join(__dirname, '../generators/app/templates'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'styles.js'
    ]);
  });
});
