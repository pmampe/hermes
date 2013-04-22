/**
 * The info window displayed over the map points.
 *
 * @class A Backbone view to handle the info window.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
var InfoWindow = Backbone.View.extend(
    /** @lends InfoWindow */
    {

      infoWindow: null,
      destination: null,

      /**
       * @constructs
       * @param options Options for this class. Expects a {MapView}.
       */
      initialize: function (options) {
        _.bindAll(this, 'render');

        this.infoWindow = new google.maps.InfoWindow({
          maxWidth: 260
        });

        var self = this;

        // TODO: refactor to (backbone) events: { [selector]: [function] }, couldn't get this to work. /lucien
        $(".dir-button").live("click", function () {
          self.remove();

          // show the directions toolbar
          options.mapView.showNumberOfButtons(4);

          $(".dir-button").each(function () {
            $(this).removeClass("selected");
          });
          $(this).addClass("selected");
          options.mapView.getDirections(this.id, self.destination);
        });
      },

      /**
       * Sets the destination.
       * @param destination
       */
      setDestination: function (destination) {
        this.destination = destination;
      },

      /**
       * Render the info window.
       */
      render: function (model, anchor, latlng) {
        this.remove(); // remove previous infowindow

        var displayMode = model.get('directionAware') ? "display:inline" : "display:none";
        var template = _.template($("#infoWindow_template").html(), {
          itemName: model.get("name") + (model.get("building") ? ", " + model.get("building") : ""),
          itemText: model.get("text"),
          itemTextEn: model.get("textEn"),
          displayMode: displayMode
        });

        this.infoWindow.setContent(template);
        if (latlng) {
          this.infoWindow.setPosition(latlng);
          this.infoWindow.open(anchor.getMap());
        } else {
          this.infoWindow.open(anchor.getMap(), anchor);
        }
      },

      /**
       * Closes the info window.
       */
      remove: function () {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
        Backbone.View.prototype.remove.call(this);
      }
    }); //-- End of InfoWindow view

