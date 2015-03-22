
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


# App.ActivityView = Ember.View.extend
#   didInsertElement: () ->
#     console.log('activityView didInsertElement');

App.ActivityController = Ember.Controller.extend
  needs: ['activities']


App.ActivitiesView = Ember.View.extend
  classNames: ['activities-view']

  didInsertElement: () ->
    margin = top: 20, right: 20, bottom: 30, left: 50
    width = 960 - margin.left - margin.right
    height = 300 - margin.top - margin.bottom

    parseDate = d3.time.format("%d-%b-%y").parse;
    x = d3.time.scale().range([0, width])
    y = d3.scale.linear().range([height, 0])

    xAxis = d3.svg.axis().scale(x).orient("bottom")
    yAxis = d3.svg.axis().scale(y).orient("left")

    line = d3.svg.line()
      .x (d) -> x(d.date)
      .y (d) -> y(d.close)

    svg = d3.select(".activities-view")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    dataStr = """
      date,close
      1-May-12,582.13
      30-Apr-12,583.98
      27-Apr-12,603.00
      26-Apr-12,607.70
      25-Apr-12,610.00
      24-Apr-12,560.28
    """

    data = d3.csv.parse dataStr, (d) -> 
      date: parseDate d.date
      close: +d.close

    x.domain d3.extent data, (d) -> d.date 
    y.domain d3.extent data, (d) -> d.close

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
        .text("Price ($)")

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)


App.ActivitiesController = Ember.ArrayController.extend
  needs: ['activity']
  model: Ember.computed.oneWay 'controllers.activity.model.activities'

  views: ( ->
    this.mapBy('views')
  ).property('@each.views')


