
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

// /watches 

router.options('/watches', function(req, res) {
  res.status(200);
  res.set('Allow', 'HEAD,GET,POST,PUT,DELETE,OPTIONS');
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(); 
});

router.get('/watches', function(req, res, next) {
  models.Watch.find(req.query, function (err, docs) {
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

router.post('/watches', function(req, res) {
  console.log('req.body', req.body);
  var newWatch = new models.Watch({ 
    imgur_id:  req.body.watch.imgur_id,
    started: req.body.watch.started,
    uploaded: req.body.watch.uploaded,
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


// /watches/:id 

router.options('/watches/:id', function(req, res) {
  res.status(200);
  res.set('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,OPTIONS,POST,PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(); 
});

router.get('/watches/:id', function(req, res) {
  console.log('get watches/:id req.params', req.params);
  models.Watch.findById(req.params.id, function (err, watch) {
    if(err) {
      res.send(err);
    } else if(!watch) {
      res.status(404).send('Not found');
    } else {
      watch = watch.toObject();
      var root = rootify('watch', watch);
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(root, null, 2)); 

      // sideload activities
      // models.Activity.find({imgur_id: watch.imgur_id}, 
      //     function(err, activities) {
      //   if(err) {
      //     res.send(err);
      //   } else {
      //     activities.map(function(activity, i, activities) {
      //       activities[i] = activity.toObject();
      //     });
      //     root['activities'] = activities;
      //     res.set('Access-Control-Allow-Origin', '*');
      //     res.type('application/json');
      //     res.send(JSON.stringify(root, null, 2)); 
      //   }
      // });

    }
  });
});

// router.put('/watches/:id', function(req, res) {
//   console.log('put watches/:id req.body', req.body);
//   models.Watch.findByIdAndUpdate(req.params.id, req.body.watch,
//       function (err, doc) {
//       console.log('err', err, 'doc', doc);
//     if(err) {
//       res.send(err);
//     } else if(!doc) {
//       res.status(404).send('Not found');
//     } else {
//       doc = doc.toObject();
//       console.log('updated doc', doc);
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

      // delete all related activities
      models.Activity.remove({imgur_id: doc.imgur_id}, function(err, docs) {
        if(err) {
          console.log('err removing docs', err);
        } else {
          console.log('success removing activities');
        }
      });
    }
  });
});


// /activities 

router.options('/activities', function(req, res) {
  res.status(200);
  res.set('Allow', 'HEAD,GET,POST,PUT,DELETE,OPTIONS');
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(); 
});

router.get('/activities', function(req, res, next) {
  console.log('request.query', req.query);
  models.Activity.find(req.query, function (err, docs) {
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
      res.send(JSON.stringify(rootify('activities', docs), null, 2)); 
    }
  });
});

router.get('/activities/:id', function(req, res) {
  console.log('get activities/:id req.params', req.params);
  models.Activity.findById(req.params.id, function (err, doc) {
    if(err) {
      res.send(err);
    } else if(!doc) {
      res.status(404).send('Not found');
    } else {
      doc = doc.toObject();
      console.log('found Activity', doc);
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(rootify('activity', doc), null, 2)); 
    }
  });
});

router.post('/activities', function(req, res) {
  console.log('req.body', req.body);

  var newActivity = new models.Activity({ 
    comments: req.body.activity.comments,
    datetime: req.body.activity.datetime, 
    downs: req.body.activity.downs,
    imgur_id: req.body.activity.imgur_id,
    score: req.body.activity.score,
    ups: req.body.activity.ups,
    views: req.body.activity.views,
  });

  newActivity.save(function (err, newActivity) {
    if(err){
      console.log('err saving', err, newActivity);
      res.send(err);
    } else {
      console.log('saved activity', newActivity);
      newActivity = newActivity.toObject();
      res.set('Access-Control-Allow-Origin', '*');
      res.type('application/json');
      res.send(JSON.stringify(rootify('activity', newActivity), null, 2)); 
    }
  }); 

});

module.exports = router;
