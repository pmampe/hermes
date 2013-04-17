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
        _.bindAll(this, "render", 'locationCallback', 'campusCallback');

        this.title = options.title;
        this.campuses = new Campuses();
        this.locations = new Locations();

        var filterByCampus = this.model.get('filterByCampus');
        var showMenu = this.model.get('menu');

        this.mapView = new MapView({
          el: $('#map_canvas')
        });

        this.searchView = new SearchView({
          el: $('#search-box'),
          collection: filterByCampus ? this.campuses : this.locations,
          placeholder: options.title,
          clickCallback: filterByCampus ? this.campusCallback : this.locationCallback
        });

        this.model.on('change:campus', this.changeCampus, this);
        this.locations.on("reset", this.mapView.replacePoints(this.locations));

        this.updateLocations();

        // Display a menu button
        if (showMenu) {
          this.menuPopupView = new MenuPopupView({
            el: $('#menupopup'),
            campuses: this.campuses,
            appModel: this.model
          });

          this.campuses.on("reset", this.menuPopupView.updateCampuses, this);
          this.changeCampus();
        }

        if (showMenu || filterByCampus) {
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

      locationCallback: function (selectedModel) {
        var collection = new Locations([]);

        if (selectedModel) {
          collection.add(selectedModel);
        }

        this.mapView.replacePoints(collection);
      },

      campusCallback: function (selectedModel) {
        this.model.set('campus', selectedModel);
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
