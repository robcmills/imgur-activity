
App.WatchesController = Ember.ArrayController.extend
  actions: 
    showActivity: (watch) ->
      console.log 'showActivity', watch
      this.transitionToRoute 'activity', watch


App.AddWatchComponent = Ember.Component.extend
  errMsg: null
  val: null

  store: ( ->
    this.container.lookup 'store:main'
  ).property()

  validate: () ->
    id = this.get 'val'
    if not id or not id.length 
      this.set 'errMsg', 'Please enter an ID'
      return false

    self = this
    this.get 'store' 
      .find 'watch', img_id: id
        .then (records) -> 
          if records.length
            self.set 'errMsg', 'ID already exists'

  actions:
    add: () ->
      console.log this.validate()

