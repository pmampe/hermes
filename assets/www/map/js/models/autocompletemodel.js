/**
 * Location
 *
 * @class Backbone model representing a location on the map.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.Model}
 */
var Autocomplete = Backbone.Model.extend(
    /** @lends Autocomplete */
    {
      defaults: {
        id: 0,
        name: 'unknown'
      }
    }
);

/**
 * Collection of locations.
 *
 * @class Backbone collection of Locations
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.Collection}
 */
var Autocompletes = Backbone.Collection.extend(
    /** @lends Autocompletes */
    {
      /** The model used for this Location. */
      model: Autocomplete,

      /**
       * Intercept method performed after fetch().
       * In this method the bounds and campuses variable are set.
       */
      parse: function (response) {
        return response.locations;
      },


      /**
       * Constructs the URL used for getting locations.
       *
       * @return {string} the URL.
       */
      url: function () {
        return 'http://pgbroker-dev.it.su.se/geo/search';
      }
    }
);
