// Generated by CoffeeScript 1.9.0
var compileCoffee, compileCss, compileJade, compileTemplates, compiler, cp, errBell, fs, path;

fs = require('fs');

path = require('path');

cp = require('child_process');

compiler = require('./js/libs/ember-template-compiler-1.10.0');

errBell = function(data) {
  return console.log(data.toString(), '\u0007');
};

compileCoffee = function(filename) {
  var ps;
  console.log('compileCoffee', filename);
  ps = cp.spawn('coffee', ['-cb', filename]);
  return ps.stderr.on('data', function(data) {
    return errBell(data);
  });
};

compileJade = function(filename) {
  var ext, ps;
  console.log('compileJade', filename);
  ext = /index/.test(filename) ? 'html' : 'hbs';
  ps = cp.spawn('jade', ['-E', ext, '-P', filename]);
  return ps.stderr.on('data', function(data) {
    return errBell(data);
  });
};

compileCss = function(filename) {
  var ps;
  console.log('compileCss', filename);
  ps = cp.spawn('stylus', ['css']);
  return ps.stderr.on('data', function(data) {
    return errBell(data);
  });
};

compileTemplates = function(filename) {
  var components, cstr, fstr, hbs, output, t, templates, _i, _j, _k, _len, _len1, _len2;
  console.log('compileTemplates', filename);
  if (/index/.test(filename)) {
    return;
  }
  output = '';
  templates = [];
  hbs = fs.readdirSync('hbs').filter(function(filename) {
    return /hbs/.test(filename);
  });
  for (_i = 0, _len = hbs.length; _i < _len; _i++) {
    filename = hbs[_i];
    templates.push({
      path: 'hbs/' + filename,
      name: path.parse(filename).name
    });
  }
  components = fs.readdirSync('hbs/components').filter(function(filename) {
    return /hbs/.test(filename);
  });
  for (_j = 0, _len1 = components.length; _j < _len1; _j++) {
    filename = components[_j];
    templates.push({
      path: 'hbs/components/' + filename,
      name: 'components/' + path.parse(filename).name
    });
  }
  for (_k = 0, _len2 = templates.length; _k < _len2; _k++) {
    t = templates[_k];
    fstr = fs.readFileSync(t.path).toString();
    cstr = compiler.precompile(fstr).toString();
    output += "\n\nEmber.TEMPLATES['" + t.name + "'] = Ember.Handlebars.template(" + cstr + ");";
  }
  return fs.writeFileSync('templates.js', output, {
    encoding: 'utf8'
  });
};

fs.watch('./', {
  recursive: true
}, function(event, filename) {
  if (event === 'change') {
    switch (path.parse(filename).ext) {
      case '.coffee':
        return compileCoffee(filename);
      case '.jade':
        return compileJade(filename);
      case '.hbs':
        return compileTemplates(filename);
      case '.styl':
        return compileCss(filename);
    }
  }
});
