
fs = require 'fs'
path = require 'path'
# u = require 'underscore'
compiler = require './js/libs/ember-template-compiler-1.10.0'


compileTemplates = () -> 
  console.log 'compiling templates...'

  output = ''
  filenames = fs.readdirSync 'hbs'
    .filter (filename) -> /hbs/.test filename

  for filename in filenames
    template = fs.readFileSync('hbs/'+ filename).toString()
    input = compiler.precompile(template).toString()
    name = path.parse(filename).name
    output += "Ember.TEMPLATES['" + name + "'] = Ember.Handlebars.template(" + 
      input + ");"

  fs.writeFileSync 'templates.js', output, { encoding: 'utf8' }


fs.watch 'hbs', (event, filename) ->
  console.log 'event', event, 'filename', filename
  console.log /hbs/.test filename
  if event == 'change' and /hbs/.test filename
    compileTemplates()
