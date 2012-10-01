var Person = Backbone.Model.extend({
  defaults: {
    "givenName": 'Foo',
    "sn": 'bar'
  }
});

var Persons = Backbone.Collection.extend({

  model: Person,

  url: function() {
    return 'http://lucien.it.su.se:8080/hermes-broker/sukat/search'
  }

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
    _.bindAll(this, "render", "doSearch", "renderResultList");

    this.collection = new Persons();
    this.collection.on("reset", this.renderResultList, this);

    this.render();
  },

  render: function() {
    var template = _.template( $("#search_template").html(), {} );
    this.el.innerHTML = template;
  },

  events: {
    "click input[type=button]": "doSearch"
  },

  doSearch: function( event ){
    this.collection.fetch({
      data: {user: $("#search_input").val().trim()},
      error: function() {alert("ERROR! Failed to fetch search results.")}
    });
  },

  renderResultList: function() {
    var variables = { result_count: this.collection.length };
    var template = _.template( $("#result_template").html(), variables );
    this.$el.children('#result_content').html(template);

    var that = this;
    _.each(this.collection.models, function (item) {
      that.renderPerson(item);
    });
  },

  renderPerson: function (item) {
    var personView = new PersonView({
      model:item
    });

    this.$el.find('#result_list').append(personView.render().el);
  }
});

function startModule() {
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  searchView = new SearchView({el:$('#search_view')});
}
