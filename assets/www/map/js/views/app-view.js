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
      initialize: function (options) {
        _.bindAll(this, "render");

        this.title = options.title;

        this.mapView = new MapView({ el: $('#map_canvas') });
      },

      /**
       * Registers events.
       */
      events: {

      },

      /**
       * Render the app module.
       */
      render: function () {
        this.mapView.render();
        $('div[data-role="header"] > h1').text(this.title);
      },

      /**
       * Show all locations of a specific type.
       *
       * @param type the type of location to show.
       */
      showType: function (type) {
        this.mapView.locations.fetch({
          data: {
            types: new Array(type)
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          }
        });
      }
    });
