
var 
  mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    name:  String
  }),
  userModel = mongoose.model('user', userSchema);

module.exports = userModel;
