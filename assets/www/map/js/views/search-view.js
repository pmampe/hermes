var SearchView = Backbone.View.extend({

  campus:null,
  types:[],

  initialize:function () {
    _.bindAll(this, "render", "doSearch");

    this.searchResults = new LocationSearchResult();
    this.searchResults.on("reset", this.renderResultList, this);
  },

  events:{
    "click a[id=search_button]":"doSearch"
  },

  render:function () {
    var self = this;

    var campus = window.App.campuses.get($("#campus").val());
    if (campus) {
      this.campus = campus.get('name');

      var template = _.template($("#search-popup_campus_button_template").html(), { name:this.campus });
      this.$el.children("#search-popup-filters").append(template);
    }

    this.types = _.reject($('#poiType').val(), function (val) {
      return val == "";
    });

    var typeIds = [];

    _.each(this.types, function (type) {
      var typeId = "search-popup_type_button_" + type;
      typeIds.push(typeId);

      var template = _.template($("#search-popup_type_button_template").html(), { id:typeId, name:type });
      self.$el.children("#search-popup-filters").append(template);
    });

    this.$el.popup("open");

    var campusButton = $("#search-popup_campus_button");
    if (campusButton) {
      campusButton.click(function (event) {
        self.campus = null;
        campusButton.remove();
      });
      campusButton.button();
    }

    _.each(typeIds, function (typeId) {
      var typeButton = $("#" + typeId);
      if (typeButton) {
        typeButton.click(function (event) {
          self.types = _.reject(self.types, function (val) {
            return val == typeButton.text().trim();
          });
          typeButton.remove();
        });
        typeButton.button();
      }
    });
  },

  doSearch:function (event) {
    var self = this;

    this.searchResults.fetch({
      data:{
        q:$("#search_input").val().trim(),
        campus:self.campus,
        types:self.types
      },
      error:function () {
        alert("ERROR! Failed to fetch search results.")
      }
    });
  },

  renderResultList:function () {
    window.MapView.renderResultList(this.searchResults);
  }
}); //-- End of Search view
