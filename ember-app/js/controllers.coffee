
App.ImgurApiController = Ember.Controller.extend
  get: (id) ->
    $.ajax 
      url: 'https://api.imgur.com/3/gallery/image/' + id
      headers: Authorization: 'Client-ID b37988f15bb617f'


App.WatchesController = Ember.ArrayController.extend
  needs: ['imgurApi']
  errMsg: null
  val: null

  reset: () ->
    this.setProperties errMsg: null, val: null

  _add: (imgurObj) ->
    console.log '_add', imgurObj
    now = new Date()
    newWatch = this.store.createRecord 'watch', 
      imgId: imgurObj.id
      started: now
      uploaded: new Date(imgurObj.datetime * 1000)
    newWatch.save()
    this.reset()

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
    this.store.find 'watch', img_id: id
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

    delete: (watch) ->
      console.log 'delete', watch
      watch.deleteRecord()
      watch.save()


App.ActivityView = Ember.View.extend
  didInsertElement: () ->
    ctx = $("#activity-chart").get(0).getContext("2d")
    options = {}
    chart = new Chart(ctx).Line(this.get 'controller.data', options)
    this.set 'controller.chart', chart

App.ActivityController = Ember.Controller.extend
  needs: ['activities']

  data: Ember.computed.oneWay 'controllers.activities.data'
  # labels: Ember.computed.oneWay 'controllers.activities.labels'


App.ActivitiesController = Ember.ArrayController.extend
  needs: ['activity']
  model: Ember.computed.oneWay 'controllers.activity.model.activities'

  labels: ( ->
    this.get('views').slice(0,3)
    # this.get('views').map (view) -> '' + view
    # [123456,234567,345678]
  ).property('views')

  views: ( ->
    this.mapBy('views')
  ).property('@each.views')

  data: ( ->
    labels: this.get 'labels'
    datasets: [{
      label: "views"
      fillColor: "rgba(220,220,220,0.2)"
      strokeColor: "rgba(220,220,220,1)"
      pointColor: "rgba(220,220,220,1)"
      pointStrokeColor: "#fff"
      pointHighlightFill: "#fff"
      pointHighlightStroke: "rgba(220,220,220,1)"
      # data: [123456,234567,345678]
      data: this.get('views').slice(0,3)
    }]
  ).property('labels', 'views')
