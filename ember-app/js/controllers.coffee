
App.ImgurApiController = Ember.Controller.extend
  get: (id) ->
    $.ajax 
      url: 'https://api.imgur.com/3/gallery/image/' + id
      headers: Authorization: 'Client-ID b37988f15bb617f'


App.WatchesController = Ember.ArrayController.extend
  needs: ['imgurApi']
  errMsg: null
  val: null

  store: ( ->
    this.container.lookup 'store:main'
  ).property()

  _add: (imgurObj) ->
    console.log '_add', imgurObj

  checkImgur: (id) ->
    console.log 'checkImgur', id
    this.get 'controllers.imgurApi' 
      .get id
        .done (response) =>
          console.log 'done', response
          if response.success
            this._add response.data
        .fail (jqXHR, textStatus) =>
          console.log 'fail', jqXHR, textStatus
          this.set 'errMsg', 'Invalid ID'

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

    showActivity: (watch) ->
      console.log 'showActivity', watch
      this.transitionToRoute 'activity', watch

