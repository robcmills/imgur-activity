
App = Ember.Application.create
  rootElement: '#emberApp'

App.Router.map () ->
  this.resource 'root', path: '/', () ->
    this.resource 'activity', path: '/activity/:watch_id'
    this.resource 'watches', path: '/watches'
    this.resource 'about', path: '/about'


App.ActivityRoute = Ember.Route.extend {}

App.WatchesRoute = Ember.Route.extend
  model: () ->
    this.store.find 'watch'

App.AboutRoute = Ember.Route.extend {}


App.ApplicationAdapter = DS.RESTAdapter.extend 
  host: 'http://localhost:3000'
  namespace: 'api'
