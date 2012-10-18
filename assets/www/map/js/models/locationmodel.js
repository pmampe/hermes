var Location = Backbone.Model.extend({
  defaults: {
    "id": 0,
    "campus": 'unknown',
    "type": 'unknown',
    "text": "",
    "location": []
  }
});

var Locations = Backbone.Collection.extend({
  model: Location,

  url: function() {
    return 'http://pgbroker-dev.it.su.se/geo/poi';
  },

  byCampus: function(campus){
    return _(this.filter(function(data) {
      return data.get("campus") == campus;
    }));
  },

  byType: function(type){
    return _(this.filter(function(data) {
      return data.get("type") == type;
    }));
  },

  byCampusAndType: function(campus, type){
    var ret = this.byCampus(campus)
    return _(ret.filter(function(data) {
      return data.get("type") == type;
    }));
  }
});