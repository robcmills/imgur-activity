
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

router.get('/watches/:img_id', function(req, res) {
  console.log('req.params', req.params);
  models.Watch.findOne({'img_id': req.params.img_id}, function (err, doc) {
    if(doc) { 
      console.log('found doc', doc);
      res.json(doc); 
    }
  });
  models.Watch.findById(req.params.img_id, function (err, doc) {
    if(err){ 
      console.log('err finding', err, doc);
      res.send(err); 
    } else {
      console.log('found doc', doc);
      res.json(doc); 
    }
  });
});

router.post('/watches/add', function(req, res) {
  console.log('req.body', req.body);
  var newWatch = new models.Watch({ 
    started: req.body.started,
    img_id:  req.body.img_id,
    uploaded: req.body.uploaded,
    activity: [{
      datetime: req.body.started, 
      views: req.body.activity[0].views,
      comments: req.body.activity[0].comments,
      downs: req.body.activity[0].downs,
      ups: req.body.activity[0].ups,
      score: req.body.activity[0].score
    }]
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
