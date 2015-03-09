

App.WatchesController = Ember.ArrayController.extend
  actions: 
    showActivity: (watch) ->
      console.log 'showActivity', watch
      this.transitionToRoute 'activity', watch


App.AddWatchComponent = Ember.Component.extend
  errMsg: null
  val: null

  validate: () ->
    id = this.get 'val'
    if not id or not id.length 
      this.set 'errMsg', 'Invalid ID'
      return false

  actions:
    add: () ->
      console.log this.validate()
