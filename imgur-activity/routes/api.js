
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

router.post('/watches/add', function(req, res) {
  var newWatch = new models.Watch({ 
    started: req.body.started,
    img_id:  req.body.img_id,
    uploaded: req.body.uploaded,
    activity: []
  });

  newWatch.save(function (err, doc) {
    if(err){
      console.log('err saving', err, doc);
      res.send(err);
    } else {
      console.log('saved', doc);
      res.send('success');
      // res.json(doc);
      // todo: respond with all users ?
    }
  }); 
});

router.delete('/watches/:id', function(req, res) {
  console.log('req.params', req.params);
  models.Watch.findByIdAndRemove(req.params.id, function (err, doc) {
    if(err){ 
      console.log('err saving', err, doc);
      res.send(err); 
    } else {
      console.log('deleted', doc);
      res.send('deleted'); 
    }
  });
});


module.exports = router;
