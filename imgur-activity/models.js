
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
      score: Number
    }]
  }),
  watchModel = mongoose.model('watch', watchSchema);

module.exports = {
  Watch: watchModel
};