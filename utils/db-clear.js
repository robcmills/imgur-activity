
// danger! this script is shiva, destroyer of worlds...

db = connect("localhost:27017/imgur_activity");
db.watches.remove({});
db.activities.remove({});

// var models = require('../imgur-activity/models')

// models.Watch.remove({}, function(err) {
//   console.log('err', err);
// });
// models.Activity.remove({}, function(err) {
//   console.log('err', err);
// });
