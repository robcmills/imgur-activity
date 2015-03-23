
App = Ember.Application.create
  rootElement: '#emberApp'

App.Router.map () ->
  this.resource 'root', path: '/', () ->
    this.resource 'activity', path: '/activity/:imgur_id'
    this.resource 'watches', path: '/watches'
    this.resource 'about', path: '/about'


App.ActivityRoute = Ember.Route.extend
  model: (params) ->
    # this.store.find 'watch', imgur_id: params.imgur_id
    promises = []
    promises.push this.store.find 'watch', imgur_id: params.imgur_id
    promises.push this.store.find 'activity', imgur_id: params.imgur_id
    Ember.RSVP.all promises

  serialize: (model) ->
    imgur_id: model.get 'imgurId'

  setupController: (controller, model) ->
    this._super controller, model
    this.controller.set 'model', model.get 'firstObject'
    this.controllerFor('activities').set 'model', model.get 'lastObject'


App.WatchesRoute = Ember.Route.extend
  model: () ->
    this.store.find 'watch'

App.AboutRoute = Ember.Route.extend {}


App.ApplicationAdapter = DS.ActiveModelAdapter.extend 
  host: 'http://localhost:3000'
  namespace: 'api'
  ajax: (url, type, hash) ->
    hash = hash || {}
    hash.cache = false
    this._super url, type, hash

inflector = Ember.Inflector.inflector
inflector.irregular 'activity', 'activities'
