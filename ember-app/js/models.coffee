
App.Watch = DS.Model.extend
  started: DS.attr 'date'
  imgId: DS.attr 'string'  
  uploaded: DS.attr 'date'
  activities: DS.hasMany 'activity'

App.Activity = DS.Model.extend
  watch: DS.belongsTo 'watch'
  datetime: DS.attr 'date'
  views: DS.attr 'number'
  comments: DS.attr 'number'
  downs: DS.attr 'number'
  ups: DS.attr 'number'
  score: DS.attr 'number'

  deltaViews: DS.attr 'number', default: 0
  deltaComments: DS.attr 'number', default: 0
  deltaDowns: DS.attr 'number', default: 0
  deltaUps: DS.attr 'number', default: 0
  deltaScore: DS.attr 'number', default: 0
