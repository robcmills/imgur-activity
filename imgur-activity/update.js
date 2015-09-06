
var models = require('./models')
var mongoose = require('mongoose');
var https = require('https');
var request = require('request');

mongoose.connect('mongodb://localhost/imgur_activity');

function addActivity (imgur_id) {
  var getOptions = {
    hostname: 'api.imgur.com',
    path: '/3/gallery/image/' + imgur_id,
    headers: {'Authorization': 'Client-ID b37988f15bb617f'}
  };
  https.get(getOptions, function(res) {

    var data = '';
    res.on('data', function(chunk){
      data += chunk.toString();
    });

    res.on('end', function() {
      data = JSON.parse(data).data;

      var postData = {
        activity: {
          comments: data.comment_count,
          datetime: new Date(),
          downs: data.downs,
          imgur_id: imgur_id,
          score: data.score,
          ups: data.ups,
          views: data.views,
        }
      };
      request.post({
        json: true,
        url: 'http://localhost:3000/api/activities',
        body: postData,
      }, function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
          process.exit(1);
        }
        console.log('post complete');
        // process.exit();
      });

    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

function updateActivity () {
  // iterate through existing watches and add activity 
  console.log('updateActivity');
  models.Watch.find(function (err, docs) {
    if(err){ 
      console.log('err finding watches', err);
      process.exit(1);
    } 
    for(i=0, l=docs.length; i<l; i++) {
      var doc = docs[i];
      addActivity(doc.imgur_id);
    }
  });
};

updateActivity();

setInterval(function() {
  updateActivity();
}, 60000);

