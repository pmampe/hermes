/**
 * Representation of a campus on the map.
 *
 * @class Backbone model represenbting a campus.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.Model}
 */
var Campus = Backbone.Model.extend(
    /** @lends Campus */
    {
      /**
       * Defaults for this model
       */
      defaults: {
        "id": 0,
        "name": 'Unknown',
        "coords": [59.363317, 18.0592], // Default to Frescati campus.
        "zoom": 15
      },

      getLat: function () {
        return this.get('coords')[0];
      },

      getLng: function () {
        return this.get('coords')[1];
      },

      getZoom: function () {
        return this.get('zoom');
      }
    });

/**
 * Collection of Campuses.
 *
 * @class Backbone collection of campuses.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.Collection}
 */
var Campuses = Backbone.Collection.extend(
    /** @lends Campuses */
    {
      /** The model used for this collection. */
      model: Campus,

      /**
       * Generates the URL to get Campuses.
       *
       * @return {string} the URL.
       */
      url: function () {
        return config.map.campuses.url;
      },

      /**
       * This is needed by SearchView.
       *
       * @return {Array} an array of filtered Campuses.
       */
      bySearchable: function () {
        return this;
      }
    });
