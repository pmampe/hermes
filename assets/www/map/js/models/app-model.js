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
        zoomSensitive: false
      },

      initialize: function () {
        this.campuses = new Campuses();
        this.locations = new Locations();

        if (this.get('showMenu') || this.get('filterByCampus')) {
          this.campuses.fetch();
        }
      },

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
      }

    });
