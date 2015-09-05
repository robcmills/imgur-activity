
// DANGER! this script is shiva, destroyer of worlds...

var models = require('../models')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imgur_activity');

var watchesRemoved = activitiesRemoved = false;

models.Watch.remove({}, function(err) {
  console.log((err ? 'failure' : 'success') + ' removing watches');
  watchesRemoved = true;
});
models.Activity.remove({}, function(err) {
  console.log((err ? 'failure' : 'success') + ' removing activities');
  activitiesRemoved = true;
});

setInterval(function() {
  if(watchesRemoved && activitiesRemoved) { process.exit(); }
}, 200);
