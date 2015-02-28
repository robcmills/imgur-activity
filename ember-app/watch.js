
var fs = require('fs');
var compiler = require('./js/libs/ember-template-compiler-1.10.0');

var template = fs.readFileSync('hbs/index.hbs').toString();
var input = compiler.precompile(template).toString();
var output = "Ember.TEMPLATES['index'] = Ember.Handlebars.template(" + 
  input + ");";

fs.writeFileSync('templates.js', output, { encoding: 'utf8' });
