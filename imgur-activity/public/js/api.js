
'use strict';
/*
 - service that persists and retrieves from api
*/
ia.factory('api', function ($http) {
  return {
    get: function (url) {
      console.log('api get');
      return $http.get('/api' + url)
        .then(function (resp) {
          // angular.copy(resp.data, store.todos);
          // return store.todos;
          return resp.data;
        });     
      // return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    // put: function (docs) {
    //   console.log('api put');
    //   // localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    // }
  };
});