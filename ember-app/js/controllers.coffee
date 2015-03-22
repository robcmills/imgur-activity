
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
    activityChart = new Chart(ctx).Line(this.get 'controller.data', options)

App.ActivityController = Ember.Controller.extend
  data: 
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset"
      fillColor: "rgba(220,220,220,0.2)"
      strokeColor: "rgba(220,220,220,1)"
      pointColor: "rgba(220,220,220,1)"
      pointStrokeColor: "#fff"
      pointHighlightFill: "#fff"
      pointHighlightStroke: "rgba(220,220,220,1)"
      data: [65, 59, 80, 81, 56, 55, 40]
    },{
      label: "My Second dataset"
      fillColor: "rgba(151,187,205,0.2)"
      strokeColor: "rgba(151,187,205,1)"
      pointColor: "rgba(151,187,205,1)"
      pointStrokeColor: "#fff"
      pointHighlightFill: "#fff"
      pointHighlightStroke: "rgba(151,187,205,1)"
      data: [28, 48, 40, 19, 86, 27, 90]
    }]
    
