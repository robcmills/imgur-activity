
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

  checkImgur: (id) ->
    console.log 'checkImgur'

  checkStore: (id) ->
    this.get 'store' 
      .find 'watch', img_id: id
        .then (records) => 
          if records.length
            this.set 'errMsg', 'ID already exists'
          else
            this.checkImgur id

  validate: () ->
    id = this.get 'val'
    if not id or not id.length 
      this.set 'errMsg', 'Please enter a valid imgur ID'
      return false
    this.checkStore id

  actions:
    add: () ->
      console.log this.validate()

