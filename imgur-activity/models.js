
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var idTransform = function (doc, ret, options) {
  ret['id'] = doc._id;
  delete ret._id; 
};

var watchSchema = new Schema({
  started: { type: Date, default: Date.now },
  img_id:  String,
  uploaded: Date,
  activities: [Schema.Types.ObjectId]
});
watchSchema.set('toObject', {transform: idTransform});

var activitySchema = new Schema({
  watch: Schema.Types.ObjectId,
  now: Date, 
  views: Number,
  comments: Number,
  downs: Number,
  ups: Number,
  score: Number,

  delta_since: Date,
  delta_views: { type: Number, default: 0 },
  delta_comments: { type: Number, default: 0 },
  delta_downs: { type: Number, default: 0 },
  delta_ups: { type: Number, default: 0 },
  delta_score: { type: Number, default: 0 }
});
activitySchema.set('toObject', {transform: idTransform});


module.exports = {
  Watch: mongoose.model('watch', watchSchema),
  Activity: mongoose.model('activity', activitySchema)
};