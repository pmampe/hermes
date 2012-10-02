var Person = Backbone.Model.extend({
  defaults: {
    "givenName": 'Foo',
    "sn": 'bar'
  }
});

var Persons = Backbone.Collection.extend({

  model: Person,

  url: function() {
    return 'http://melkor.it.su.se:8080/hermes-broker/sukat/search'
  }

});