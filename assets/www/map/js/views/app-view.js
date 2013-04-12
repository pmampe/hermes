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

      model: new AppModel(),

      /**
       * @constructs
       */
      initialize: function (options) {
        _.bindAll(this, "render");

        this.title = options.title;

        if (options.campus) {
          this.model.set('campus', options.campus);
        }

        this.model.on('change:campus', this.changeCampus, this);

        this.campuses = new Campuses();
        this.campuses.fetch();

        this.mapView = new MapView({ el: $('#map_canvas') });
        this.menuPopupView = new MenuPopupView({
          el: $('#menupopup'),
          campuses: this.campuses,
          appModel: this.model
        });

        this.changeCampus();

        var self = this;
        this.campuses.on("reset", function () {
          self.menuPopupView.updateCampuses();
        });

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
      showMenu: function () {
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
      },

      changeCampus: function () {
        var lat = this.model.get('campus').getLat();
        var lng = this.model.get('campus').getLng();
        this.mapView.model.setMapPosition(lat, lng);
      }
    });
