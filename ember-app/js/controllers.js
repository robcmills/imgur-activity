// Generated by CoffeeScript 1.9.0
App.ImgurApiController = Ember.Controller.extend({
  get: function(id) {
    return $.ajax({
      url: 'https://api.imgur.com/3/gallery/image/' + id,
      headers: {
        Authorization: 'Client-ID b37988f15bb617f'
      }
    });
  }
});

App.WatchesController = Ember.ArrayController.extend({
  needs: ['imgurApi'],
  errMsg: null,
  val: null,
  reset: function() {
    return this.setProperties({
      errMsg: null,
      val: null
    });
  },
  _add: function(imgurObj) {
    var newWatch, now;
    console.log('_add', imgurObj);
    now = new Date();
    newWatch = this.store.createRecord('watch', {
      imgId: imgurObj.id,
      started: now,
      uploaded: new Date(imgurObj.datetime * 1000)
    });
    newWatch.save();
    return this.reset();
  },
  checkImgur: function(id) {
    console.log('checkImgur', id);
    return this.get('controllers.imgurApi').get(id).done((function(_this) {
      return function(response) {
        console.log('done', response);
        if (response.success) {
          return _this._add(response.data);
        }
      };
    })(this)).fail((function(_this) {
      return function(jqXHR, textStatus) {
        console.log('fail', jqXHR, textStatus);
        return _this.set('errMsg', 'Invalid ID');
      };
    })(this));
  },
  checkStore: function(id) {
    return this.store.find('watch', {
      img_id: id
    }).then((function(_this) {
      return function(records) {
        if (records.length) {
          return _this.set('errMsg', 'ID already exists');
        } else {
          return _this.checkImgur(id);
        }
      };
    })(this));
  },
  validate: function() {
    var id;
    id = this.get('val');
    if (!id || !id.length) {
      this.set('errMsg', 'Please enter a valid imgur ID');
      return false;
    }
    return this.checkStore(id);
  },
  actions: {
    add: function() {
      return console.log(this.validate());
    },
    showActivity: function(watch) {
      console.log('showActivity', watch);
      return this.transitionToRoute('activity', watch);
    },
    "delete": function(watch) {
      console.log('delete', watch);
      watch.deleteRecord();
      return watch.save();
    }
  }
});

App.ActivityView = Ember.View.extend({
  didInsertElement: function() {
    return console.log('activityView didInsertElement');
  }
});

App.ActivityController = Ember.Controller.extend({
  needs: ['activities']
});

App.ActivitiesController = Ember.ArrayController.extend({
  needs: ['activity'],
  model: Ember.computed.oneWay('controllers.activity.model.activities'),
  labels: (function() {
    return ['labels'];
  }).property(),
  views: (function() {
    return this.mapBy('views');
  }).property('@each.views')
});
