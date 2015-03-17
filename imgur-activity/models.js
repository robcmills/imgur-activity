
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idTransform = function (doc, ret, options) {
  ret['id'] = doc._id;
  delete ret._id; 
};

var activitySchema = new Schema({
  watch_id: Schema.Types.ObjectId,
  comments: Number,
  downs: Number,
  datetime: Date, 
  score: Number,
  ups: Number,
  views: Number,

  // delta_since: Date,
  // delta_views: { type: Number, default: 0 },
  // delta_comments: { type: Number, default: 0 },
  // delta_downs: { type: Number, default: 0 },
  // delta_ups: { type: Number, default: 0 },
  // delta_score: { type: Number, default: 0 }
});
activitySchema.set('toObject', {transform: idTransform});

var watchSchema = new Schema({
  // activities: [activitySchema],
  // activities: [Schema.Types.ObjectId]
  img_id:  String,
  started: Date,
  uploaded: Date,
});
watchSchema.set('toObject', {transform: idTransform});


module.exports = {
  Activity: mongoose.model('activity', activitySchema),
  Watch: mongoose.model('watch', watchSchema),
};