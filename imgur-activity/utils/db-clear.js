
// DANGER! this script is shiva, destroyer of worlds...

var models = require('../models')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imgur_activity');

models.Watch.remove({}, function(err) {
  console.log((err ? 'failure' : 'success') + ' removing watches');
});
models.Activity.remove({}, function(err) {
  console.log((err ? 'failure' : 'success') + ' removing activities');
});
