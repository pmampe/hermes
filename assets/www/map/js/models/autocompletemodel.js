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
       * @constructs
       * @param models models for this collection.
       * @param options options for this collection.
       */
      initialize: function (models, options) {
        this._prevSync = {};
      },

      /**
       * Intercept method performed after fetch().
       */
      parse: function (response) {
        return response.locations;
      },

      /**
       * Override collections sync method to abort unfinished autocomplete calls.
       * Avoids race between ajax requests.
       *
       * @param method the CRUD method ("create", "read", "update", or "delete").
       * @param collection the collection to be read.
       * @param options success and error callbacks, and all other jQuery request options.
       * @return {*} jqXHR (jQuery XMLHttpRequest)
       */
      sync: function (method, collection, options) {
        if (options && options.safe !== false) { // Normal behavior for safe === false
          var prevSync = collection._prevSync[method];

          if (prevSync && prevSync.readyState != 4) { // Abort previous sync if not complete
            prevSync.abort();
          }
        }

        return collection._prevSync[method] = Backbone.sync.apply(this, arguments);
      },

      /**
       * Constructs the URL used for getting autocomplete locations.
       *
       * @return {string} the URL.
       */
      url: function () {
        return config.map.autocomplete.url;
      },

      /**
       * Abort a running sync.
       *
       * @param method the CRUD method ("create", "read", "update", or "delete").
       */
      abortSync: function (method) {
        var sync = this._prevSync[method];

        if (sync && sync.readyState != 4) {
          sync.abort();
        }
      }
    }
);
