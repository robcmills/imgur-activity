
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
        console.log('data:', data);
        console.log('data.data:', data.data);
        data = data.data;
        var newWatch = {
          started: Date.now(),
          img_id:  data.id,
          uploaded: data.datetime
        };
        $scope.watches.push(newWatch);
        // store.addWatch(newWatch);
        $scope.addWatchID = '';
      })
      .error(function (data, status, headers, config) {
        $scope.invalidID = true;
        console.log('invalid id');
        console.log(data, status, headers, config);
      });
  };
});

/*
 - retrieves and persists models via iaStorage service
 - exposes model to template and provides event handlers
*/
// ia.controller('IaCtrl', function IaCtrl($scope, $location, $filter, iaStorage) {

  // var watches = $scope.watches = iaStorage.get();

  // $scope.newTodo = '';
  // $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
  // $scope.editedTodo = null;

  // if ($location.path() === '') {
  //   $location.path('/');
  // }

  // $scope.location = $location;

  // $scope.$watch('location.path()', function (path) {
  //   $scope.statusFilter = { '/active': {completed: false}, '/completed': {completed: true} }[path];
  // });

  // $scope.$watch('remainingCount == 0', function (val) {
  //   $scope.allChecked = val;
  // });

  // $scope.addTodo = function () {
  //   var newTodo = $scope.newTodo.trim();
  //   if (newTodo.length === 0) {
  //     return;
  //   }

  //   todos.push({
  //     title: newTodo,
  //     completed: false
  //   });
  //   todoStorage.put(todos);

  //   $scope.newTodo = '';
  //   $scope.remainingCount++;
  // };

  // $scope.editTodo = function (todo) {
  //   $scope.editedTodo = todo;
  //   // Clone the original todo to restore it on demand.
  //   $scope.originalTodo = angular.extend({}, todo);
  // };

  // $scope.doneEditing = function (todo) {
  //   $scope.editedTodo = null;
  //   todo.title = todo.title.trim();

  //   if (!todo.title) {
  //     $scope.removeTodo(todo);
  //   }

  //   todoStorage.put(todos);
  // };

  // $scope.revertEditing = function (todo) {
  //   todos[todos.indexOf(todo)] = $scope.originalTodo;
  //   $scope.doneEditing($scope.originalTodo);
  // };

  // $scope.removeTodo = function (todo) {
  //   $scope.remainingCount -= todo.completed ? 0 : 1;
  //   todos.splice(todos.indexOf(todo), 1);
  //   todoStorage.put(todos);
  // };

  // $scope.todoCompleted = function (todo) {
  //   $scope.remainingCount += todo.completed ? -1 : 1;
  //   todoStorage.put(todos);
  // };

  // $scope.clearCompletedTodos = function () {
  //   $scope.todos = todos = todos.filter(function (val) {
  //     return !val.completed;
  //   });
  //   todoStorage.put(todos);
  // };

  // $scope.markAll = function (completed) {
  //   todos.forEach(function (todo) {
  //     todo.completed = !completed;
  //   });
  //   $scope.remainingCount = completed ? todos.length : 0;
  //   todoStorage.put(todos);
  // };
// });
