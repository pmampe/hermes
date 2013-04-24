/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var PolygonLocationView = GenericLocationView.extend(
    /** @lends PolygonLocationView */
    {

      points: null,

      /**
       * @constructs
       * @param options options for this view.
       */
      initialize: function (options) {
        this.points = options.model.getGPoints();

        options.marker = new google.maps.Polygon({
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#00ff00",
          fillOpacity: 0.35,
          visible: true,
          poiType: options.model.getPoiType(),
          map: null,
          paths: this.points
        });

        this.constructor.__super__.initialize.apply(this, [options]);
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
        this.marker.setPath(this.model.getGPoints());
      }
    });
