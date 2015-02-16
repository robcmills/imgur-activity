
var express = require('express');
var models = require('../models')
var router = express.Router();

router.get('/users', function(req, res, next) {
  models.User.find(function (err, docs) {
    if(err){ 
      res.send(err); 
    } else {
      console.log(docs);
      res.json(docs);
    }
  });
});

router.post('/users/add', function(req, res) {
  var name = req.body.name;
  var newUser = new models.User({ name: name });

  newUser.save(function (err, doc) {
    if(err){
      res.send(err);
    } else {
      console.log(doc);
      res.json(doc);
      // todo: respond with all users ?
    }
  }); 
});

module.exports = router;
