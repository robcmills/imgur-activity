
App.Watch = DS.Model.extend
  started: DS.attr 'date'
  img_id: DS.attr 'string'  
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

  delta_views: DS.attr 'number', default: 0
  delta_comments: DS.attr 'number', default: 0
  delta_downs: DS.attr 'number', default: 0
  delta_ups: DS.attr 'number', default: 0
  delta_score: DS.attr 'number', default: 0
