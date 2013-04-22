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
        _.bindAll(this,
            "render",
            'locationCallback',
            'campusCallback',
            'menuSelectCallback',
            "startGPSPositioning",
            'handleZoomChanged'
        );

        $(document).on("deviceready.appview", this.startGPSPositioning);

        this.title = options.title;
        this.campuses = new Campuses();
        this.locations = new Locations();
        this.zoomLocations = new Locations();
        this.mapModel = new MapModel();

        var filterByCampus = this.model.get('filterByCampus');
        var showMenu = this.model.get('menu');

        this.mapView = new MapView({
          el: $('#map_canvas'),
          model: this.mapModel,
          zoomCallback: this.handleZoomChanged
        });

        this.searchView = new SearchView({
          el: $('#search-box'),
          collection: filterByCampus ? this.campuses : this.locations,
          placeholderSuffix: options.title ? options.title.toLowerCase() : undefined
        });

        var self = this;
        this.searchView.on('selected', function (selectedElement) {
          if (filterByCampus) {
            self.campusCallback(selectedElement);
          }
          else {
            self.locationCallback(selectedElement);
          }
        });

        this.model.on('change:campus', this.changeCampus, this);
        this.locations.on("reset", function () {
          self.mapView.replacePoints(self.locations)
        });
        this.zoomLocations.on("reset", function () {
          self.mapView.replacePoints(self.zoomLocations)
        });

        this.updateLocations();

        // Display a menu button
        if (showMenu) {
          this.menuPopupView = new MenuPopupView({
            el: $('#menupopup'),
            campuses: this.campuses,
            appModel: this.model
          });

          this.menuPopupView.on('selected', this.menuSelectCallback);
          this.model.on('change:campus', this.changeCampus, this);

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
        }
        this.mapView.render();
      },

      /**
       * Remove handler for the view.
       */
      remove: function () {
        $(document).off('.appview');

        // Stop GPS positioning watch
        if (this.gpsWatchId && navigator.geolocation) {
          navigator.geolocation.clearWatch(this.gpsWatchId);
        }

        Backbone.View.prototype.remove.call(this);
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
       * Callback for menu selection
       *
       * @param campus the selected campus
       */
      menuSelectCallback: function (campus) {
        this.model.set('campus', campus);
      },

      /**
       * Handle changed zoom level.
       *
       * @param zoom the new zoom level.
       */
      handleZoomChanged: function (zoom) {
        if (zoom > 16) {
          this.zoomLocations.fetch({
            data: {
              types: ['handicap_entrance']
            },
            error: function () {
              alert("ERROR! Failed to fetch locations.");
            }
          });
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

      /**
       * Moves map to selected campus & resets locations.
       */
      changeCampus: function () {
        var campus = this.model.get('campus');
        var lat = campus.getLat();
        var lng = campus.getLng();
        this.mapModel.setMapPosition(lat, lng);
        this.mapModel.setZoom(campus.getZoom());
        this.mapView.replacePoints(this.locations);
      },

      /**
       * Update the position from GPS.
       */
      startGPSPositioning: function () {
        if (navigator.geolocation) {
          this.mapView.fadingMsg('Using device geolocation to get current position.');
          var self = this;

          // Get the current position or display error message
          this.gpsWatchId = navigator.geolocation.getCurrentPosition(
              function (pos) {
                self.mapView.trigger('updateCurrentPosition', pos)
              },
              function (error) {
                self.mapView.fadingMsg('Unable to get location');
              }
          );

          // Start watching for GPS position changes
          this.gpsWatchId = navigator.geolocation.watchPosition(
              function (pos) {
                self.mapView.trigger('updateCurrentPosition', pos)
              },
              function (error) {
              },
              1000
          );
        }
      }
    });
