/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var PointLocationView = GenericLocationView.extend(
    /** @lends PointLocationView */
    {

      /**
       * @constructs
       * @param options options for this view.
       */
      initialize: function (options) {
        
        var pin = options.model.get('pin');
        
        // if the model contains customised icon, show it instead of the default one.
        if (options.model.get('customisedIcon')) {
          var locationId = options.model.get('id');
          pin = new google.maps.MarkerImage(
              'http://localhost:8080/hermes-broker/image/view/' + locationId, 
              new google.maps.Size(22, 22));
        } 

        options.marker = new google.maps.Marker({
          position: _.flatten(options.model.getGPoints())[0],
          poiType: options.model.getPoiType(),
          visible: true,
          icon: pin,
          map: null
        });

        var self = this;
        google.maps.event.addListener(options.marker, 'click', function (event) {
          if (options.model.get('directionAware')) {
            options.infoWindow.setDestination(_.flatten(options.model.getGPoints())[0]);
          }
          self.openInfoWindow(options.model, this);
        });

        this.constructor.__super__.initialize.apply(this, [options]);
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
        this.marker.setPosition(_.flatten(this.model.getGPoints())[0]);
      }
    });
