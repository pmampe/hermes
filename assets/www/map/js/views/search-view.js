var SearchView = Backbone.View.extend({

  campus:null, // Holds the campus associated with this search
  types:[], // Holds the filter types associated with this search

  initialize:function () {
    _.bindAll(this, "render", "doSearch", "doSearchOnEnter", "closeSearch");

    // Create a collection to keep the search results.
    this.searchResults = new LocationSearchResult();
    this.searchResults.on("reset", this.renderResultList, this);

    this.$el.on({
      popupbeforeposition:function () {
        var w = $(window).width();
        $("#search-popup").css("width", w);

        var pos = $("#page-map-header").height();
        $("#search-popup").css("top", pos);
      }
    });
  },

  events:{
    "click a[id=search_button]":"doSearch",
    "keypress input[id=search_input]":'doSearchOnEnter',
    "click a[id=search_button_close]":"closeSearch"
  },

  render:function () {
    var self = this;

    // Clean the filter container, to avoid duplicates.
    var filtersContainer = this.$el.children("#search-popup-filters");
    filtersContainer.empty();

    // Add a filter button for the campus (if one is selected)
    var campus = window.App.campuses.get($("#campus").val());
    if (campus) {
      this.campus = campus.get('name');

      var template = _.template($("#search-popup_filter_button_template").html(), { id:"search-popup_campus_button", name:this.campus });
      filtersContainer.append(template);
    }

    // Add filter buttons for the selected filter types.
    this.types = _.reject($('#poiType').val(), function (val) {
      return val == "";
    });

    var typeIds = [];

    _.each(this.types, function (type) {
      var typeId = "search-popup_type_button_" + type;
      typeIds.push(typeId);

      var template = _.template($("#search-popup_filter_button_template").html(), { id:typeId, name:type });
      filtersContainer.append(template);
    });

    // Open the search popup.
    this.$el.popup("open", { transition:'slidedown'});

    // Attach functionality to clicks on the filter buttons.

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

  doSearchOnEnter:function (event) {
    if (event.keyCode != 13) return;
    this.doSearch(event);
  },

  doSearch:function (event) {
    $.mobile.loading('show', { text:'Loading search results...', textVisible: true });

    var self = this;

    this.searchResults.fetch({
      data:{
        q:$("#search_input").val().trim(),
        campus:self.campus,
        types:self.types
      },
      error:function () {
        alert("ERROR! Failed to fetch search results.")
        $.mobile.loading('hide');
      }
    });
  },

  renderResultList:function () {
    window.MapView.renderResultList(this.searchResults);
    $.mobile.loading('hide');
  },

  closeSearch:function (event) {
    this.$el.hide();
  }
}); //-- End of Search view
