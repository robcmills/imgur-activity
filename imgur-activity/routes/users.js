
var express = require('express');
var models = require('../models')
var router = express.Router();

router.get('/', function(req, res, next) {
  var users = [];
  models.User.find(function (err, docs) {
    if(err){ 
      return console.error(err); 
    } else {
      console.log(docs);
      res.render('users', {'users': docs});
    }
  });
});

router.post('/add', function(req, res) {
  var name = req.body.name;
  var newUser = new models.User({ name: name });

  newUser.save(function (err, doc) {
    if(err){
      res.send("There was a problem adding the information to the database.");
      return console.error(err); 
    } else {
      res.location("/users");
      res.redirect("/users");
    }
  }); 
});

module.exports = router;
