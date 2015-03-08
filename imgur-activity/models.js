
var 
  mongoose = require('mongoose'),

  watchSchema = new mongoose.Schema({
    started: { type: Date, default: Date.now },
    // image fields
    img_id:  String, // image id
    uploaded: Date,
    activity: [{
      datetime: Date, 
      views: Number,
      comments: Number,
      downs: Number,
      ups: Number,
      score: Number,

      delta_views: { type: Number, default: 0 },
      delta_comments: { type: Number, default: 0 },
      delta_downs: { type: Number, default: 0 },
      delta_ups: { type: Number, default: 0 },
      delta_score: { type: Number, default: 0 },
      // todo: make virtual computed ?
      delta_average: { type: Number, default: 0 },
    }]
  });

watchSchema.set('toObject', { transform: function (doc, ret, options) {
  ret['id'] = doc._id;
  delete ret._id;
}});

module.exports = {
  Watch: mongoose.model('watch', watchSchema)
};