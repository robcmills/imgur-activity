
App = Ember.Application.create
  rootElement: '#emberApp'

App.Router.map () ->
  this.resource 'root', path: '/', () ->
    this.resource 'activity', path: '/activity/:imgur_id'
    this.resource 'watches', path: '/watches'
    this.resource 'about', path: '/about'


App.ActivityRoute = Ember.Route.extend
  model: (params) ->
    console.log 'model', params
    this.store.find 'watch', imgur_id: params.imgur_id

  afterModel: (model, transition) ->
    console.log 'afterModel', model.get 'firstObject.imgurId'
    imgurId = model.get 'firstObject.imgurId'
    filter = this.store.filter('activity', imgur_id: imgurId,
      (activity) -> activity.get('imgurId') == imgurId)
    this.controllerFor('activities').set 'model', filter
    filter

  serialize: (model) ->
    imgur_id: model.get 'firstObject.imgurId'

  setupController: (controller, model) ->
    this._super controller, model
    this.controller.set 'model', model.get 'firstObject'
    this.generateController 'socket'


App.WatchesRoute = Ember.Route.extend
  model: () ->
    this.store.find 'watch'

App.AboutRoute = Ember.Route.extend {}


App.ApplicationAdapter = DS.ActiveModelAdapter.extend 
  host: 'http://localhost:3000'
  namespace: 'api'


inflector = Ember.Inflector.inflector
inflector.irregular 'activity', 'activities'
