
var express = require('express');
var models = require('../models')
var router = express.Router();

router.get('/watches', function(req, res, next) {
  models.Watch.find(function (err, docs) {
    if(err){ 
      res.send(err); 
    } else {
      console.log(docs);
      res.json(docs);
    }
  });
});

// router.post('/watches/add', function(req, res) {
//   var img_id = req.body.img_id;
//   var newUser = new models.User({ name: name });

//   newUser.save(function (err, doc) {
//     if(err){
//       res.send(err);
//     } else {
//       console.log(doc);
//       res.json(doc);
//       // todo: respond with all users ?
//     }
//   }); 
// });

module.exports = router;
