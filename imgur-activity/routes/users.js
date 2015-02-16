
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  var users = [];
  // var users = User.find(function (err, users) {
  //   if(err){ return console.error(err); }
  //   console.log(users);
  // });
  res.render('users', {'users': users});
});

module.exports = router;
