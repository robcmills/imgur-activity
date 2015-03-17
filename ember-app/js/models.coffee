
App.Watch = DS.Model.extend
  activities: DS.hasMany 'activity'
  imgId: DS.attr 'string'  
  started: DS.attr 'date'
  uploaded: DS.attr 'date'

App.Activity = DS.Model.extend
  comments: DS.attr 'number'
  datetime: DS.attr 'date'
  downs: DS.attr 'number'
  score: DS.attr 'number'
  ups: DS.attr 'number'
  views: DS.attr 'number'
  watch: DS.belongsTo 'watch'

  # deltaViews: DS.attr 'number', default: 0
  # deltaComments: DS.attr 'number', default: 0
  # deltaDowns: DS.attr 'number', default: 0
  # deltaUps: DS.attr 'number', default: 0
  # deltaScore: DS.attr 'number', default: 0
