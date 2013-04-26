/**
 * @class The model representing the map app.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */
var AppModel = Backbone.Model.extend(
    /** @lends AppMpdel */
    {
      /**
       * Model attribute defaults.
       */
      defaults: {
        menu: false,
        filterByCampus: false,
        campus: new Campus({ name: "Frescati" }),
        types: [],
        nonVisibleTypes: [],
        zoomSensitive: false,
        showingNonVisibleForLocation: null
      },

      initialize: function () {
        _.bindAll(this, "hideAllNonVisibleTypes", "showNonVisibleForLocationByRelation");
        this.campuses = new Campuses();
        this.locations = new Locations(null, {
          searchableTypes: _.difference(this.get('types'), this.get('nonVisibleTypes'))
        });

        // Hide nonVisibleTypes when locations is fetched
        this.locations.on("reset", this.hideAllNonVisibleTypes);

        if (this.get('menu') || this.get('filterByCampus')) {
          this.campuses.fetch();
        }
      },

      /**
       * Collection to filter on
       */
      getFilterCollection: function () {
        return this.get('filterByCampus') ? this.campuses : this.locations;
      },

      /**
       * Fetch all locations of a specific type.
       */
      fetchLocations: function () {
        this.locations.fetch({
          data: {
            types: this.get('types')
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          }
        });
      },

      /**
       * Sets no visibility on all locations that is in the list of non visible types
       */
      hideAllNonVisibleTypes: function () {
        var nonVisibleTypes = this.get("nonVisibleTypes");

        _.invoke(this.locations.filter(function (location) {
          return _.contains(nonVisibleTypes, location.get('type'));
        }), "set", "visible", false);
      },

      /**
       * Sets visibility on locations that is related for specified types
       */
      showNonVisibleForLocationByRelation: function (location, relatedBy, types) {
        this.hideAllNonVisibleTypes();
        // TODO Find some other way of doing string capitalization, maybe https://github.com/epeli/underscore.string#readme
        var byFunction = relatedBy ? this.locations["by" + relatedBy.charAt(0).toUpperCase() + relatedBy.slice(1)] : null;

        var showingNonVisibleForLocation = null;
        if (byFunction) {
          var relatedWithType = byFunction.call(this.locations, location).filter(function(location) {
            return _.contains(types, location.get('type'));
          });

          _.invoke(relatedWithType, "set", "visible", true);

          showingNonVisibleForLocation = {
            location: location,
            relatedBy: relatedBy,
            types: types
          };
        }

        this.set("showingNonVisibleForLocation", showingNonVisibleForLocation);
      }
    });
