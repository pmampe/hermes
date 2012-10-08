var Person = Backbone.Model.extend({
  defaults: {
    "givenName": 'Unknown',
    "sn": 'Unknown',
    "displayName": "Unknown",
    "mail": "",
    "telephoneNumber": "+468162000"
  }
});

var Persons = Backbone.Collection.extend({

  model: Person,

  url: function() {
    return 'http://melkor.it.su.se:8080/hermes-broker/sukat/search'
  }

});