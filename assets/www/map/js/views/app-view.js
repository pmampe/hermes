/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @author <a href="mailto:bjorn.westlin@su.se">Björn Westlin</a>
 * @type {Backbone.View}
 */
var AppView = Backbone.View.extend(
    /** @lends AppView */
    {

      /**
       * @constructs
       */
      initialize: function () {
        _.bindAll(this, "render");

        this.mapView = new MapView({ el: $('#map_canvas') });
      },

      /**
       * Registers events.
       */
      events: {
        "click a[id=menu-search]": "openSearchPopup"
      },

      /**
       * Render the app module.
       */
      render: function () {
        this.mapView.render();
      },

      showType: function (type) {
        this.mapView.locations.fetch({
          data: {
            types: new Array(type)
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          }
        });
      },

      /**
       * Opens the search popup (or slide down)
       *
       * @param event the triggering event.
       */
      openSearchPopup: function (event) {
        this.mapView.showSearchView();
      }
    });
