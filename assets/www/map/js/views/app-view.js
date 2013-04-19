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
        _.bindAll(this, "render", 'locationCallback', 'campusCallback', 'menuSelectCallback');

        this.title = options.title;
        this.campuses = new Campuses();
        this.locations = new Locations();
        this.mapModel = new MapModel();

        var filterByCampus = this.model.get('filterByCampus');
        var showMenu = this.model.get('menu');

        getLocale();
        setLocale("en");

        var self = this;
        i18n.init(i18n.options,function(){
          self.$el.i18n();

        });


        this.mapView = new MapView({
          el: $('#map_canvas'),
          model: this.mapModel
        });

        this.searchView = new SearchView({
          el: $('#search-box'),
          collection: filterByCampus ? this.campuses : this.locations,
          placeholderSuffix: options.title ? options.title.toLowerCase() : undefined
        });


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
      }
    });
