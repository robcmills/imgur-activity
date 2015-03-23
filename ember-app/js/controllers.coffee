
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
    uploaded = new Date(imgurObj.datetime * 1000)

    newWatch = this.store.createRecord 'watch', 
      imgurId: imgurObj.id
      started: now
      uploaded: uploaded
    newWatch.save()

    firstActivity = this.store.createRecord 'activity', 
      comments: 0
      datetime: uploaded
      downs: 0
      imgur_id: imgurObj.id,
      score: 0
      ups: 0
      views: 0
    firstActivity.save()

    nowActivity = this.store.createRecord 'activity', 
      comments: imgurObj.comment_count
      datetime: now
      downs: imgurObj.downs
      imgur_id: imgurObj.id,
      score: imgurObj.score
      ups: imgurObj.ups
      views: imgurObj.views
    nowActivity.save()

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
      console.log 'showActivity', watch.get 'imgurId'
      this.transitionToRoute 'activity', watch

    delete: (watch) ->
      console.log 'delete', watch
      watch.deleteRecord()
      watch.save()


App.ActivityView = Ember.View.extend
  didInsertElement: () ->
    console.log('activityView didInsertElement');
    this.initD3()

  initD3: () ->
    margin = top: 20, right: 20, bottom: 30, left: 100
    width = 960 - margin.left - margin.right
    height = 300 - margin.top - margin.bottom

    x = d3.time.scale().range([0, width])
    y = d3.scale.linear().range([height, 0])

    xAxis = d3.svg.axis().scale(x).orient("bottom")
    yAxis = d3.svg.axis().scale(y).orient("left")

    svg = d3.select(".activity .chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    # render views as default
    activities = this.get 'controller.activities'
    dataStr = activities.get 'viewsDataStr'
    parseDatetime = d3.time.format('%0m/%0d/%Y %0I:%M:%S %p').parse;

    data = d3.csv.parse dataStr, (d) -> 
      datetime: parseDatetime d.datetime
      views: +d.views

    x.domain d3.extent data, (d) -> d.datetime
    y.domain d3.extent data, (d) -> d.views

    svg.append "g"
      .attr "class", "x axis"
      .attr "transform", "translate(0," + height + ")"
      .call xAxis

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("views")

    line = d3.svg.line()
      .x (d) -> x(d.datetime)
      .y (d) -> y(d.views)

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)


App.ActivityController = Ember.Controller.extend
  needs: ['activities']
  activities: Ember.computed.alias 'controllers.activities'


App.ActivitiesController = Ember.ArrayController.extend
  # sortProperties: 'datetime'

  viewsDataStr: ( ->
    dataStr = 'datetime,views\n'
    this.forEach (item) ->
      dataStr += (item.get 'datetime')
        .toLocaleString().replace(',','') + ',' + 
          (item.get 'views') + '\n'
      null
    dataStr
  ).property '@each'


