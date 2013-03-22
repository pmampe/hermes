/**
 * The search view for the map module.
 *
 * @class A Backbone view to handle the search popup.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var SearchView = Backbone.View.extend(
    /** @lends SearchView */
    {

      /** Holds the filter types associated with this search */
      types: [],

      /**
       * @constructs
       * @param options Options for this class. Expects campus name and a searchResult collection to add results to
       */
      initialize: function (options) {
        _.bindAll(this, "render", "doSearch", "doSearchOnEnter", "autocomplete");

        this.campus = options.campus;
        this.searchResults = options.searchResults;
        this.autocompletes = new Autocompletes();

        this.autocompletes.on("reset", this.updateAutocomplete, this);

        this.$el.on({
          popupbeforeposition: function () {
            var w = $(window).width();
            $("#search-popup").css("width", w);

            var pos = $("#page-map-header").outerHeight();
            $("#search-popup").css("top", pos);
          },
          popupafterclose: function () {
            options.mapView.toggleSearchFromToolbar();
          }
        });
      },

      /** Registers events */
      events: {
        "keypress input": 'doSearchOnEnter',
        "listviewbeforefilter #search-autocomplete": "autocomplete",
        "click .autocomplete-link": "doSearchOnAutocomplete"
      },

      /**
       * Render the search view.
       */
      render: function () {
        var self = this;

        // Clean the filter container, to avoid duplicates.
        var filtersContainer = this.$el.children("#search-popup-filters");
        filtersContainer.empty();

        // Add a filter button for the campus (if one is selected)
        if (this.campus) {
          var template = _.template($("#search-popup_filter_button_template").html(), { id: "search-popup_campus_button", name: this.campus });
          filtersContainer.append(template);
        }

        // Add filter buttons for the selected filter types.
        this.types = _.reject($('#poiType').val(), function (val) {
          return val === "";
        });

        var typeIds = [];

        _.each(this.types, function (type) {
          var typeId = "search-popup_type_button_" + type;
          typeIds.push(typeId);

          var template = _.template($("#search-popup_filter_button_template").html(), { id: typeId, name: type });
          filtersContainer.append(template);
        });

        // Open the search popup.
        this.$el.popup("open", { transition: 'slidedown'});

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

      /**
       * Listen for enter key event and trigger {doSearch}
       *
       * @param event key event.
       */
      doSearchOnEnter: function (event) {
        if (event.keyCode != 13) {
          return;
        }
        this.doSearch(event.target.value);
      },

      /**
       * Listen for click on autocomplete suggestion {doSearch}
       *
       * @param event key event.
       */
      doSearchOnAutocomplete: function (event) {
        this.doSearch(event.target.text);
      },

      /**
       * Do the search.
       *
       * @param q query string.
       */
      doSearch: function (q) {
        $("#search-popup").popup("close");
        $.mobile.loading('show', { text: 'Loading search results...', textVisible: true });

        var self = this;

        this.searchResults.fetch({
          data: {
            q: q.trim(),
            campus: self.campus,
            types: self.types
          },
          error: function () {
            alert("ERROR! Failed to fetch search results.");
            $.mobile.loading('hide');
          }
        });
      },

      autocomplete: function (e, data) {
        var $ul = $(e.target),
            $input = $(data.input),
            value = $input.val();
        $ul.html("");
        if (value && value.length > 1) {
          $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
          $ul.listview("refresh");

          var self = this;
          this.autocompletes.fetch({
            data: {
              q: value,
              campus: self.campus,
              types: self.types
            }
          });
        }
        else {
          this.autocompletes.abortSync("read");
        }
      },

      updateAutocomplete: function () {
        var html = "";

        $.each(this.autocompletes.first(5), function (i, val) {
          html += "<li><a class='autocomplete-link'>" + val.get('name') + "</a></li>";
        });

        var $ul = $('#search-autocomplete');
        $ul.html(html);
        $ul.listview("refresh");
        $ul.trigger("updatelayout");
      }
    }); //-- End of Search view
