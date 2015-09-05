
'use strict';
/*
 - service that persists and retrieves from api
*/
ia.factory('store', function ($http) {
  return {
    // get: function (url) {
    //   console.log('api get');
    //   return $http.get('/api' + url)
    //     .then(function (resp) {
    //       return resp.data;
    //     });     
    // },
    add: function (doc) {
      console.log('store add');
      return $http.post('/api/watches', doc)
        .then(function success(resp) {
          todo.id = resp.data.id;
          store.todos.push(todo);
          return store.todos;
        }, function error() {
          angular.copy(originalTodos, store.todos);
          return store.todos;
        });
    }
  };
});