/**
 * Location
 *
 * @class Backbone model representing a location on the map.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.Model}
 */
var Location = Backbone.Model.extend(
    /** @lends Location */
    {
      defaults: {
        id: 0,
        name: 'unknown',
        campus: 'unknown',
        type: 'unknown',
        shape: "point",
        text: "",
        coords: [],
        directionAware: true,
        hasIcon: false,
        buildingName: null,
        buildingId: null,
        handicapAdapted: false,
        visible: true,
        pin: new google.maps.MarkerImage(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
                'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
                'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
                'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
                'AAAABJRU5ErkJggg==')
      },

      /**
       * Get google points for this location.
       *
       * @return {Array} an array of google.maps.LatLng representing the points for this location.
       */
      getGPoints: function () {
        var points = [];

        $.each(this.get("coords"), function (index, point) {
          var coord = new google.maps.LatLng(point[0], point[1]);
          points.push(coord);
        });

        return points;
      },

      /**
       * Get a generated poi-type.
       *
       * @return {string} the poi-type
       */
      getPoiType: function () {
        return this.get('campus') + "." + this.get('type');
      },

      /**
       * The name for this model.
       *
       * @returns the name.
       */
      getName: function () {
        var name = this.get('name');

        if (this.has('buildingName')) {
          name += ", " + model.get('buildingName');
        }

        return name;
      },

      /**
       * Checks if the location is visible on the map.
       *
       * @return true if visible, false if not.
       */
      isVisible: function () {
        return this.get('visible');
      }
    });

/**
 * Collection of locations.
 *
 * @class Backbone collection of Locations
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.Collection}
 */
var Locations = Backbone.Collection.extend(
    /** @lends Locations */
    {
      /** The model used for this Location. */
      model: Location,

      initialize: function (models, options) {
        this.searchableTypes = options ? options.searchableTypes : [];
      },

      /**
       * Constructs the URL used for getting locations.
       *
       * @return {string} the URL.
       */
      url: function () {
        return config.map.location.url;
      },

      /**
       * Filter by searchable types.
       *
       * @return {Array} an array of filtered Locations.
       */
      bySearchable: function () {
        if (!this.searchableTypes || this.searchableTypes.length == 0) return this;
        var self = this;
        return _(this.filter(function (location) {
          return _.contains(self.searchableTypes, location.get("type"));
        }));
      },

      /**
       * Filter Locations by campus.
       *
       * @param {string} campus the Campus to filter by.
       * @return {Array} an array of filtered Locations.
       */
      byCampus: function (campus) {
        return _(this.filter(function (data) {
          return data.get("campus") == campus;
        }));
      },

      /**
       * Filter Locations by type.
       *
       * @param {string} type the type to filter by.
       * @return {Array} an array of filtered Locations.
       */
      byType: function (types) {
        return _(this.filter(function (data) {
          return _.contains(types, data.get("type"));
        }));
      },

      /**
       * Filter Locations by campus and types.
       *
       * @param {string} campus the Campus to filter by.
       * @param {Array} types an array of types to filter by.
       * @return {Array} an array of filtered Locations.
       */
      byCampusAndType: function (campus, types) {
        var ret = this.byCampus(campus);
        return _(ret.filter(function (data) {
          return _.contains(types, data.get("type"));
        }));
      },

      /**
       * Filter Locations by building.
       *
       * @param {string} building the Building to filter by.
       * @return {Array} an array of filtered Locations.
       */
      byBuilding: function (building) {
        return _(this.filter(function (location) {
          return location.get('buildingId') === building.id
        }));
      },

      /**
       * Filter Locations by building.
       *
       * @param {string} building the Building to filter by.
       * @return {Array} an array of filtered Locations.
       */
      byBuildingAndTypeAndHandicapAdapted: function (building, types, adapted) {
        return _(this.filter(function (location) {
          var res = location.get('buildingId') === building.id;
          res &= _.contains(types, location.get("type"));
          return res && location.get('handicapAdapted') === adapted;
        }));
      }
    });
