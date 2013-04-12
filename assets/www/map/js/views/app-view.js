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

        this.campuses = new Campuses();

        this.mapView = new MapView({ el: $('#map_canvas') });

        this.menuPopupView = new MenuPopupView({ el: $('#menupopup'), campuses: {}, campusesMap: {} });

        var self = this;

        $(document).on('click', '#menubutton', function (event) {
          self.showMenu();
        });
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
       * Show the menu.
       */
      showMenu: function() {
        this.menuPopupView.render();
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
