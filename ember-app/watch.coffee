
fs = require 'fs'
path = require 'path'
cp = require 'child_process'
# u = require 'underscore'
compiler = require './js/libs/ember-template-compiler-1.10.0'


compileCoffee = (filename) -> 
  console.log 'compileCoffee', filename
  cp.spawn 'coffee', ['-cb', filename]

compileJade = (filename) -> 
  console.log 'compileJade', filename
  ext = if /index/.test filename then 'html' else 'hbs'
  cp.spawn 'jade', ['-E', ext, '-P', filename]


compileTemplates = (filename) -> 
  console.log 'compileTemplates', filename
  return if /index/.test filename

  output = ''
  filenames = fs.readdirSync 'hbs'
    .filter (filename) -> /hbs/.test filename
    .map (filename) -> 'hbs/' + filename

  for filename in filenames
    template = fs.readFileSync(filename).toString()
    input = compiler.precompile(template).toString()
    name = path.parse(filename).name
    output += "Ember.TEMPLATES['" + name + "'] = Ember.Handlebars.template(" + 
      input + ");"

  fs.writeFileSync 'templates.js', output, { encoding: 'utf8' }


fs.watch './', recursive: true, (event, filename) ->
  if event == 'change' 
    switch path.parse(filename).ext
      when '.coffee' then compileCoffee filename
      when '.jade' then compileJade filename
      when '.hbs' then compileTemplates filename
