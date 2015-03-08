

App.WatchesController = Ember.ArrayController.extend
  actions: 
    showActivity: (watch) ->
      console.log 'showActivity', watch
      this.transitionToRoute 'activity', watch
