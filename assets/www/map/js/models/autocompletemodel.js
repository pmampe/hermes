/**
 * Autocomplete
 *
 * @class Backbone model representing autocomplete strings in location search.
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
 * Collection of autocomplete locations.
 *
 * @class Backbone collection of Autocomplete locations
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.Collection}
 */
var Autocompletes = Backbone.Collection.extend(
    /** @lends Autocompletes */
    {
      /** The model used. */
      model: Autocomplete,

      /**
       * Intercept method performed after fetch().
       */
      parse: function (response) {
        return response.locations;
      },


      /**
       * Constructs the URL used for getting autocomplete locations.
       *
       * @return {string} the URL.
       */
      url: function () {
        return 'http://pgbroker-dev.it.su.se/geo/search';
      }
    }
);
