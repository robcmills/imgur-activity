App = Ember.Application.create({
  rootElement: '#emberApp',
});

App.Router.map(function() {
  this.resource('activity', {path: '/activity'});
});

App.IndexRoute = Ember.Route.extend({});

App.ActivityRoute = Ember.Route.extend({
 // renderTemplate: function() {
 //    this.render('activity', {   
 //      into: 'index'
 //    }); 
 //  }
});
