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
        var position = this.getPosition(options);
        
        // if the model contains customised icon, show it instead of the default one.
        if (options.model.get('hasIcon')) {
          var locationId = options.model.get('id');
          pin = new google.maps.MarkerImage(
              'http://pgbroker-dev.it.su.se/image/view/' + locationId, 
              new google.maps.Size(22, 22));
        } 

        options.marker = new google.maps.Marker({
          position: position,
          poiType: options.model.getPoiType(),
          visible: true,
          icon: pin,
          map: null
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
      
      /**
       * getPosition checks if the default position stored in the model is overridden 
       * by the customizedPosition parameter. If it is it the customizedPosition, else
       * use the location stored in the model.
       */
      getPosition : function(options) {
        var position;
        if (options.customizedPosition) {
          position = options.customizedPosition;
        } else {
          position = _.flatten(options.model.getGPoints())[0]
        }
        
        return position;
      },

      /**
       * Update position on the map.
       */
      updatePosition: function () {
        this.marker.setPosition(_.flatten(this.model.getGPoints())[0]);
      }
    });
