
'use strict';

ia.controller('AppCtrl', function AppCtrl($scope, $http) {
  $scope.tab = 2;
  $scope.isSet = function(checkTab) {
    return $scope.tab === checkTab;
  };
  $scope.setTab = function(activeTab) {
    $scope.tab = activeTab;
  };

  $http.defaults.headers.common.Authorization = 'Client-ID b37988f15bb617f';

  var watches = $scope.watches = [];
  $http.get('/api/watches')
    .success(function (data, status, headers, config) {
      $scope.watches = data;
    });
  $scope.addWatchID = '';
  $scope.showMsg = false;
  $scope.msg = '';

  $scope.addWatch = function() {
    var addWatchID = $scope.addWatchID.trim();
    // validate
    if(addWatchID.length < 1) { 
      $scope.showMsg = true;
      $scope.msg = 'INVALID ID';
      return; 
    }
    var watch_exists = false;
    $http.get('api/watches/' + addWatchID)
      .success(function (data, status, headers, config) {
        console.log('get watch data', data);
        watch_exists = data;
      });
    if(watch_exists) {
      $scope.showMsg = true;
      $scope.msg = 'ID EXISTS';
      return;
    }
    $http.get('https://api.imgur.com/3/gallery/image/' + addWatchID)
      .success(function (data, status, headers, config) {
        $scope.showMsg = false;
        data = data.data;
        var now = Date.now();
        var newWatch = {
          started: now,
          img_id:  data.id,
          uploaded: data.datetime * 1000,
          activity: [{
            datetime: now,
            views: data.views,
            comments: data.comment_count,
            downs: data.downs,
            ups: data.ups,
            score: data.score
          }]
        };
        $scope.watches.push(newWatch);
        $http.post('/api/watches/add', newWatch)
          .then(function success(resp) {
            console.log('saved');
            // todo.id = resp.data.id;
            // store.todos.push(todo);
            // return store.todos;
          }, function error() {
            console.log('not saved');
            // angular.copy(originalTodos, store.todos);
            // return store.todos;
          });
        $scope.addWatchID = '';
      })
      .error(function (data, status, headers, config) {
        $scope.showMsg = true;
        $scope.msg = 'INVALID ID';
      });

  };

  $scope.deleteWatch = function(watch) {
    console.log('deleteWatch', watch);
    $scope.watches = $scope.watches.filter(function(w) {
      return w.img_id !== watch.img_id;
    });
    $http.delete('/api/watches/' + watch._id)
      .then(function success(resp) {
        console.log('deleted');
      }, function error() {
        console.log('not deleted');
      });
  };
});
