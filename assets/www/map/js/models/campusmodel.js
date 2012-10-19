var Campus = Backbone.Model.extend({
  defaults: {
    "id": 0,
    "name": 'Unknown',
    "coords": [59.363317, 18.0592], // Default to Frescati campus.
    "zoom": 15
  }
});

var Campuses = Backbone.Collection.extend({
  model: Campus,

  url: function() {
    return 'http://pgbroker-dev.it.su.se/geo/campuses';
  }
});