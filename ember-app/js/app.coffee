
App = Ember.Application.create
  rootElement: '#emberApp'

App.Router.map () ->
  this.resource 'root', path: '/', () ->
    this.resource 'activity', path: '/activity'
    this.resource 'watches', path: '/watches'
    this.resource 'about', path: '/about'


App.ActivityRoute = Ember.Route.extend {}

App.WatchesRoute = Ember.Route.extend {}

App.AboutRoute = Ember.Route.extend {}
