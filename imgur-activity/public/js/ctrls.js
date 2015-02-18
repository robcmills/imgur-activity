
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
  $scope.invalidID = false;

  $scope.addWatch = function() {
    var addWatchID = $scope.addWatchID.trim();
    // validate
    if(addWatchID.length === 0) { return; }
    $http.get('https://api.imgur.com/3/gallery/image/' + addWatchID)
      .success(function (data, status, headers, config) {
        $scope.invalidID = false;
        console.log('valid id');
        data = data.data;
        var newWatch = {
          started: Date.now(),
          img_id:  data.id,
          uploaded: data.datetime * 1000
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
        $scope.invalidID = true;
        console.log('invalid id');
        console.log(data, status, headers, config);
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
