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
        this.locations = new Locations();

        this.mapView = new MapView({
          el: $('#map_canvas')
        });

        this.searchView = new SearchView({
          el: $('#search-box'),
          collection: this.locations,
          mapView: this.mapView,
          placeholder: options.title
        });

        this.locations.on("reset", this.mapView.replacePoints(this.locations));

        this.updateLocations();

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
        this.locations.fetch({
          data: {
            types: this.model.get('types')
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          }
        });
      },

      changeCampus: function () {
        var campus = this.model.get('campus');
        var lat = campus.getLat();
        var lng = campus.getLng();
        this.mapView.model.setMapPosition(lat, lng);

        var locations = this.locations.byCampus(campus.get('name'));
        this.mapView.replacePoints(locations);
      }
    });
