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

        var self = this;
        google.maps.event.addListener(options.marker, 'click', function (event) {
          if (options.model.get('directionAware')) {
            options.infoWindow.setDestination(event.latLng);
          }
          self.openInfoWindow(options.model, this, event.latLng);
        });

        this.constructor.__super__.initialize.apply(this, [options]);
      },
      
      getCenterOfPolygon: function() {
        if (this.points) {
          var sumLat = 0;
          var sumLng = 0;
          var numberOfPoints = 0;
          $(this.points).each(function(i, v) {
            sumLat += v.lat();
            sumLng += v.lng();
            numberOfPoints++;
          });
          var latCenter = sumLat / numberOfPoints;
          var lngCenter = sumLng / numberOfPoints;
          
          var coord = new google.maps.LatLng(latCenter, lngCenter);
  
          return coord;
        } else {
          return -1; // TODO: throw exception instead..
        }
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
        this.marker.setPath(this.model.getGPoints());
      }
    });
