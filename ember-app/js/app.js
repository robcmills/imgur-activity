// Generated by CoffeeScript 1.9.0
var App;

App = Ember.Application.create({
  rootElement: '#emberApp'
});

App.Router.map(function() {
  return this.resource('root', {
    path: '/'
  }, function() {
    this.resource('activity', {
      path: '/activity'
    });
    this.resource('watches', {
      path: '/watches'
    });
    return this.resource('about', {
      path: '/about'
    });
  });
});

App.ActivityRoute = Ember.Route.extend({});

App.WatchesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('watch');
  }
});

App.AboutRoute = Ember.Route.extend({});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'api'
});
