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

        // Display a menu button
        if (this.model.get('menu') == true) {
          this.menuPopupView = new MenuPopupView({
            el: $('#menupopup'),
            campuses: this.campuses,
            appModel: this.model
          });

          this.model.on('change:campus', this.changeCampus, this);
          this.campuses.on("reset", this.menuPopupView.updateCampuses, this);

          this.changeCampus();
          this.campuses.fetch();
        }
      },

      /**
       * Registers events.
       */
      events: {
        "click #menubutton": "showMenu"
      },

      /**
       * Render the app module.
       */
      render: function () {
        $('div[data-role="header"] > h1').text(this.title);

        if (this.model.get('menu') == true) {
          $('div[data-role="header"]').append(JST['map/menu/button']);
          $('#menubutton').button();

          this.delegateEvents();
          this.mapView.render();
        }
      },

      /**
       * Show the menu.
       */
      showMenu: function () {
        this.menuPopupView.render();
      },

      /**
       * Show all locations of a specific type.
       */
      updateLocations: function () {
        this.mapView.locations.fetch({
          data: {
            types: this.model.get('types'),
            campusName: this.model.get('campus').get('name')
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
        this.updateLocations();
      }
    });
