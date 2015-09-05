
fs = require 'fs'
path = require 'path'
cp = require 'child_process'
# u = require 'underscore'
compiler = require './js/libs/ember-template-compiler-1.10.0'


errBell = (data) ->
  console.log data.toString(), '\u0007'


compileCoffee = (filename) -> 
  console.log 'compileCoffee', filename
  ps = cp.spawn 'coffee', ['-cb', filename]
  ps.stderr.on 'data', (data) -> 
    errBell data

compileJade = (filename) -> 
  console.log 'compileJade', filename
  ext = if /index/.test filename then 'html' else 'hbs'
  ps = cp.spawn 'jade', ['-E', ext, '-P', filename]
  ps.stderr.on 'data', (data) -> 
    errBell data

compileCss = (filename) -> 
  console.log 'compileCss', filename
  ps = cp.spawn 'stylus', ['css']
  ps.stderr.on 'data', (data) -> 
    errBell data
  

compileTemplates = (filename) -> 
  console.log 'compileTemplates', filename
  return if /index/.test filename

  output = ''
  templates = []

  hbs = fs.readdirSync 'hbs'
    .filter (filename) -> /hbs/.test filename
  for filename in hbs
    templates.push 
      path: 'hbs/' + filename
      name: path.parse(filename).name

  components = fs.readdirSync 'hbs/components'
    .filter (filename) -> /hbs/.test filename
  for filename in components
    templates.push 
      path: 'hbs/components/' + filename
      name: 'components/' + path.parse(filename).name

  for t in templates
    fstr = fs.readFileSync(t.path).toString()
    cstr = compiler.precompile(fstr).toString()
    output += "\n\nEmber.TEMPLATES['" + t.name + "'] = Ember.Handlebars.template(" + cstr + ");"

  fs.writeFileSync 'templates.js', output, { encoding: 'utf8' }


fs.watch './', recursive: true, (event, filename) ->
  if event == 'change' 
    switch path.parse(filename).ext
      when '.coffee' then compileCoffee filename
      when '.jade' then compileJade filename
      when '.hbs' then compileTemplates filename
      when '.styl' then compileCss filename
