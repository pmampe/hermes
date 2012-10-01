var Person = Backbone.Model.extend({
  defaults: {
    "givenName": 'Foo',
    "sn": 'bar'
  }
});

var Persons = Backbone.Collection.extend({

  model: Person,
  url: 'http://melkor.it.su.se:8080/hermes-broker/sukatSearch?format=json&searchString=joakim'

});

var PersonView = Backbone.View.extend({
  tagName:"div",
  className:"personContainer",
  template:$("#personTemplate").html(),

  render:function () {
    var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

    this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
    return this;
  }
});

var SearchView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, "render");

    this.collection = new Persons();
    this.collection.fetch({ error: function() {alert("ERROR! Failed to fetch search results.")} });

    this.collection.on("reset", this.render, this);
  },

  render: function() {
    var variables = { result_count: this.collection.length };

    var template = _.template( $("#result_template").html(), variables );
    this.el.innerHTML = template;

    var that = this;
    _.each(this.collection.models, function (item) {
      that.renderPerson(item);
    });
  },

  renderPerson:function (item) {
    var personView = new PersonView({
      model:item
    });

    this.$el.children('#result_list').append(personView.render().el);
  }
});

function startModule() {
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  searchView = new SearchView({el:$('#search_view')});
}
