var SukatSearchView = Backbone.View.extend({

  initialize: function () {
    _.bindAll(this, "render", "doSearch", "resetSearchResults");

    this.collection = new Persons();
    this.collection.on("reset", this.resetSearchResults, this);
  },

  render: function () {
    var template = _.template($("#search_template").html(), {});
    this.el.innerHTML = template;
  },

  events: {
    "click a[id=search_button]": "doSearch"
  },

  doSearch: function (event) {
    $.mobile.loading('show', { textVisible: false });

    this.collection.fetch({
      data: {user: $("#search_input").val().trim()},
      error: function () {
        $.mobile.loading('hide');
        alert("ERROR! Failed to fetch search results.");
      },
      success: function () {
        $.mobile.loading('hide');
      }
    });
  },

  resetSearchResults: function () {
    var variables = { result_count: this.collection.length };
    var template = _.template($("#result_template").html(), variables);
    this.$el.children('#result_content').html(template);

    var that = this;
    _.each(this.collection.models, function (item) {
      that.renderPerson(item);
    });

    $('#search_page').trigger("pagecreate");
  },

  renderPerson: function (item) {
    var personView = new PersonView({
      model: item
    });

    var $item = personView.render().el;
    $item.jqmData('itemId', item.get('id'));
    $item.bind('click', function () {
      $('#details_page').jqmData('itemId', $(this).jqmData('itemId'));
    });

    this.$el.find('#result_list').append($item);
  }
});
