/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var GenericLocationView = Backbone.View.extend(
    /** @lends GenericLocationView */
    {

      /**
       * @constructs
       * @param options options for the location view. Expects model, gmap, marker & infoWindow
       */
      initialize: function (options) {
        _.bindAll(this, "updatePosition");
        this.model = options.model;
        this.gmap = options.gmap;
        this.marker = options.marker;
        this.infoWindow = options.infoWindow;

        this.model.on('change:coords', this.updatePosition);

        // render the initial point state
        this.render();
      },

      /**
       * Renders a location on the map.
       */
      render: function () {
        this.marker.setMap(this.gmap);
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
      },

      /**
       * Open a infoWindow ocer the location.
       *
       * @param model the model of the location.
       * @param anchor the location to anchor the info window to.
       * @param {google.maps.LatLng} latLng position of the infoWindow.
       */
      openInfoWindow: function (model, anchor, latLng) {
        this.infoWindow.render(model, anchor, latLng);
      },

      getCenter: function () {
        if (this.model.getGPoints()) {
          var sumLat = 0;
          var sumLng = 0;
          var numberOfPoints = 0;
          $(this.model.getGPoints()).each(function (i, v) {
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
       * Remove marker from map.
       */
      remove: function () {
        this.infoWindow.remove();
        this.marker.setMap(null);
        this.marker = null;
        Backbone.View.prototype.remove.call(this);
      }
    });
