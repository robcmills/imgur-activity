
var express = require('express');
var models = require('../models')
var router = express.Router();
var https = require('https');

function rootify (name, docs) {
  // adhere to RESTful convention
  var root = {};
  root[name] = docs;
  return root;
};

router.get('/watches', function(req, res, next) {
  models.Watch.find(function (err, docs) {
    if(err){ 
      res.send(err); 
    } else {
      // console.log('docs', docs);
      // force schema transform to convert _id -> id
      docs.map(function(doc, i, docs) {
        docs[i] = doc.toObject();
      });
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(rootify('watches', docs), null, 2)); 
    }
  });
});

router.options('/watches', function(req, res) {
  res.status(200);
  res.set('Allow', 'HEAD,GET,POST,PUT,DELETE,OPTIONS');
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(); 
});

router.post('/watches', function(req, res) {
  console.log('req.body', req.body);
  var newWatch = new models.Watch({ 
    started: req.body.watch.started,
    img_id:  req.body.watch.img_id,
    uploaded: req.body.watch.uploaded,
  //   // activity: [{
  //   //   datetime: req.body.started, 
  //   //   views: req.body.activity[0].views,
  //   //   comments: req.body.activity[0].comments,
  //   //   downs: req.body.activity[0].downs,
  //   //   ups: req.body.activity[0].ups,
  //   //   score: req.body.activity[0].score
  //   // }]
  });

  newWatch.save(function (err, doc) {
    if(err){
      console.log('err saving', err, doc);
      res.send(err);
    } else {
      console.log('saved', doc);
      doc = doc.toObject();
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(rootify('watch', doc), null, 2)); 
    }
  }); 
});

router.put('/watches/update', function(req, res, next) {
  // iterate through existing watches and add activity snapshots
  console.log('update /watches');
  models.Watch.find(function (err, docs) {
    if(err){ 
      res.send(err); 
    } else {
      for(i=0, l=docs.length; i<l; i++) {
        var doc = docs[i];
        console.log('doc.activity.length', doc.activity.length);
        var last_snapshot = doc.activity[doc.activity.length - 1];
        console.log('last_snapshot', last_snapshot);
        if(Date.now() - last_snapshot.datetime < 2000) { continue; }
        console.log('add activity snapshot');
        var options = {
          hostname: 'api.imgur.com',
          path: '/3/gallery/image/' + doc.img_id,
          headers: {'Authorization': 'Client-ID b37988f15bb617f'}
        }
        https.get(options, function(res) {
          res.on('data', function(data) {
            data = JSON.parse(data.toString()).data;
            var snapshot = {
              datetime: Date.now(),
              views: data.views,
              comments: data.comment_count,
              downs: data.downs,
              ups: data.ups,
              score: data.score,

              delta_views: data.views - last_snapshot.views,
              delta_comments: data.comment_count - last_snapshot.comments,
              delta_downs: data.downs - last_snapshot.downs,
              delta_ups: data.ups - last_snapshot.ups,
              delta_score: data.score - last_snapshot.score
            };
            doc.activity.push(snapshot);
            doc.save();
          });
        }).on('error', function(e) {
          console.log("Got error: " + e.message);
        });
      }
    }
  });
  res.send('watches updated'); 
});


router.options('/watches/:watch_id', function(req, res) {
  res.status(200);
  res.set('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,POST,PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(); 
});

// router.get('/watches/:watch_id', function(req, res) {
//   console.log('req.body', req.body);
//   models.Watch.findOne({'img_id': req.params.img_id}, function (err, doc) {
//     if(err) {
//       res.send(err);
//     } else if(!doc) {
//       res.status(404).send('Not found');
//     } else {
//       doc = doc.toObject();
//       console.log('found doc', doc);
//       res.set('Access-Control-Allow-Origin', '*');
//       res.type('application/json');
//       res.send(JSON.stringify(rootify('watch', doc), null, 2)); 
//     }
//   });
// });

router.delete('/watches/:id', function(req, res) {
  console.log('req.params', req.params);
  models.Watch.findByIdAndRemove(req.params.id, function (err, doc) {
    if(err){ 
      console.log('err deleting', err, doc);
      res.send(err); 
    } else {
      console.log('deleted', doc);
      doc = doc.toObject();
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(rootify('watch', doc), null, 2)); 
    }
  });
});


module.exports = router;
