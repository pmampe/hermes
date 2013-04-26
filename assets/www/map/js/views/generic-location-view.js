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
        _.bindAll(this, "updatePosition", 'updateVisibility', 'handleMarkerClick');
        this.gmap = options.gmap;
        this.infoWindow = options.infoWindow;

        google.maps.event.addListener(this.marker, 'click', this.handleMarkerClick);
        this.model.on('click', this.handleMarkerClick);
        this.model.on('change:coords', this.updatePosition);
        this.model.on('change:visible', this.updateVisibility);

        // render the initial point state
        this.render();
      },

      /**
       * Renders a location on the map.
       */
      render: function () {
        this.updateVisibility();
        this.marker.setMap(this.gmap);
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
      },

      /**
       * Update visibilty on the map.
       */
      updateVisibility: function () {
        if (this.marker) {
          this.marker.setVisible(this.model.isVisible());
        }
      },

      /**
       * Open a infoWindow over the location.
       *
       * @param model the model of the location.
       * @param anchor the location to anchor the info window to.
       * @param {google.maps.LatLng} latLng position of the infoWindow.
       */
      openInfoWindow: function (model, anchor, latLng) {
        this.infoWindow.open(model, anchor, latLng);
      },

      //TODO: written for polygons, should work for markers, but might return bad results for lines
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
       * Handle 'click' event on marker.
       *
       * @param event the 'click' event
       */
      handleMarkerClick: function (event) {
        this.model.trigger('clicked');
        if (this.model.get('directionAware')) {
          this.infoWindow.setDestination(this.getCenter());
        }
        this.openInfoWindow(this.model, this.marker, this.getCenter());
      },

      /**
       * Remove marker from map.
       */
      remove: function () {
        this.infoWindow.close();
        this.marker.setMap(null);
        this.marker = null;
        Backbone.View.prototype.remove.call(this);
      }
    });
