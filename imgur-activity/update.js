
var models = require('./models')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/imgur_activity');

function updateActivity () {
  // iterate through existing watches and add activities 
  console.log('update');
  models.Watch.find(function (err, docs) {
    if(err){ 
      console.log('err finding watches', err);
      return;
    } 
    console.log(docs.length);
    for(i=0, l=docs.length; i<l; i++) {
      var doc = docs[i];
      console.log('doc', doc);
    }
  });
};

updateActivity();


//         console.log('doc.activity.length', doc.activity.length);
//         var last_snapshot = doc.activity[doc.activity.length - 1];
//         console.log('last_snapshot', last_snapshot);
//         if(Date.now() - last_snapshot.datetime < 2000) { continue; }
//         console.log('add activity snapshot');
//         var options = {
//           hostname: 'api.imgur.com',
//           path: '/3/gallery/image/' + doc.img_id,
//           headers: {'Authorization': 'Client-ID b37988f15bb617f'}
//         }
//         https.get(options, function(res) {
//           res.on('data', function(data) {
//             data = JSON.parse(data.toString()).data;
//             var snapshot = {
//               datetime: Date.now(),
//               views: data.views,
//               comments: data.comment_count,
//               downs: data.downs,
//               ups: data.ups,
//               score: data.score,

//               delta_views: data.views - last_snapshot.views,
//               delta_comments: data.comment_count - last_snapshot.comments,
//               delta_downs: data.downs - last_snapshot.downs,
//               delta_ups: data.ups - last_snapshot.ups,
//               delta_score: data.score - last_snapshot.score
//             };
//             doc.activity.push(snapshot);
//             doc.save();
//           });
//         }).on('error', function(e) {
//           console.log("Got error: " + e.message);
//         });
//       }
//     }
//   });
//   res.send('watches updated'); 
// });
