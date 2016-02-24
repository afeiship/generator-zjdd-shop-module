'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-zjdd-shop-module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'module_name',
      message: 'Your module name?'
    }, {
      type: 'input',
      name: 'wiki_url',
      message: 'Your wiki url?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this._rewriteProps();
    this._writingHandler();
    this._writingJade();
    this._writingJs();
    this._writingLess();
  },
  install: function () {
    //this.installDependencies();
  },
  end: function () {
    this.log('Well done! Start your work! :)');
  },
  _rewriteProps: function () {
    var props = this.props;
    this._module_name = props['module_name'];
    _.each(props, function (prop, key) {
      this.props[this._camelCase(key)] = this._camelCase(prop);
    }, this);
  },
  _writingHandler: function () {
    this.fs.copyTpl(
      this.templatePath('./site/handler/template.js'),
      this.destinationPath('./site/handler/' + this._module_name + '.js'),
      this.props
    );
  },
  _writingJade: function () {
    this.fs.copyTpl(
      this.templatePath('./src/template.jade'),
      this.destinationPath('./src/' + this._module_name + '.jade'),
      this.props
    );
  },
  _writingJs: function () {
    this.fs.copyTpl(
      this.templatePath('./src/js/template.js'),
      this.destinationPath('./src/js/' + this._module_name + '.js'),
      this.props
    );
  },
  _writingLess: function () {
    this.fs.copyTpl(
      this.templatePath('./src/less/template.less'),
      this.destinationPath('./src/less/' + this._module_name + '.less'),
      this.props
    );
  },
  _camelCase: function (inString) {
    return inString.replace(/[_-]\D/g, function (match) {
      return match.charAt(1).toUpperCase();
    });
  }
});
