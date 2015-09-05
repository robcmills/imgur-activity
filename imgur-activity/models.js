
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idTransform = function (doc, ret, options) {
  ret['id'] = doc._id;
  delete ret._id; 
};

var activitySchema = new Schema({
  comments: Number,
  downs: Number,
  datetime: Date, 
  imgur_id: String,
  score: Number,
  ups: Number,
  views: Number,
  // watch: Schema.Types.ObjectId,
});
activitySchema.set('toObject', {transform: idTransform});

var watchSchema = new Schema({
  // activities: [activitySchema],
  // activities: [Schema.Types.ObjectId],
  imgur_id:  String,
  started: Date,
  uploaded: Date,
});
watchSchema.set('toObject', {transform: idTransform});


module.exports = {
  Activity: mongoose.model('activity', activitySchema),
  Watch: mongoose.model('watch', watchSchema),
};