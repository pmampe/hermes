/**
 * The info window displayed over the map points.
 *
 * @class A Backbone view to handle the info window.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
var InfoWindowView = Backbone.View.extend(
    /** @lends InfoWindow */
    {

      infoWindow: null,
      destination: null,

      /**
       * @constructs
       * @param options Options for this class. Expects a {MapView}.
       */
      initialize: function (options) {
        _.bindAll(this, 'open', 'close', 'updateRelatedLinks');

        this.appModel = options.appModel;
        this.appModel.on("change:showingNonVisibleForLocation", function () {
          var showingNonVisibleForLocation = this.appModel.get('showingNonVisibleForLocation');
          this.updateRelatedLinks(showingNonVisibleForLocation ? showingNonVisibleForLocation.location : null);
        }, this);

        this.infoWindow = new google.maps.InfoWindow({
          maxWidth: 260
        });

        var self = this;

        // TODO: refactor to (backbone) events: { [selector]: [function] }, couldn't get this to work. /lucien
        $(document).on("click.info-window-view", ".iw .dir-button", function () {
          self.close();

          $(".dir-button").each(function () {
            $(this).removeClass("selected");
          });
          $(this).addClass("selected");
          options.mapView.getDirections(this.id, self.destination);
        });
      },

      /**
       * Remove handler for the view.
       */
      remove: function () {
        this.close();
        $(document).off(".info-window-view");
        Backbone.View.prototype.remove.call(this);
      },

      /**
       * Sets the destination.
       * @param destination
       */
      setDestination: function (destination) {
        this.destination = destination;
      },

      /**
       * Opens the info window.
       * @param model
       * @param anchor
       * @param latlng
       */
      open: function (model, anchor, latlng) {
        this.close(); // close previous infowindow

        //translate info window body by altering var text
        var text= this.getLanguageKey();

        var tOptions = {
          name: model.getName(),
          displayDirections: model.get('directionAware'),
          model: model,
          itemText: model.get(text)
        };

        if (model.get('type') == 'building') {
          var hasElevators = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['elevator'],
              true
          ).size() > 0;

          var hasEntrances = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['entrance'],
              true
          ).size() > 0;


          var toilets = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['toilet'],
              true
          );

          var floors = [];
          _.each(_.flatten(toilets), function (toilet) {
            floors.push(toilet.get('floor'));
          });
          floors = _.uniq(floors.sort(), true).join(', ');

          tOptions.hasElevators = hasElevators;
          tOptions.hasEntrances = hasEntrances;
          tOptions.tFloors = floors;
        }

        var template = JST['map/infoWindow'](tOptions);

        this.infoWindow.setContent(template);
        if (latlng) {
          this.infoWindow.setPosition(latlng);
          this.infoWindow.open(anchor.getMap());
        } else {
          this.infoWindow.open(anchor.getMap(), anchor);
        }

        var self = this;
        $(".iw a.showRelated").click(function () {
          var $this = $(this);
          self.appModel.showNonVisibleForLocationByRelation(model, $this.data("related-by"), $this.data("related-types").split(" "));
        });
        $(".iw a.hideRelated").click(function () {
          self.appModel.showNonVisibleForLocationByRelation(null);
        });

        this.updateRelatedLinks(model);

      },

      getLanguageKey: function(){
        var text ="textEn";
        if(this.getRootLanguage()=='sv'){
          text= 'text';
        } else {
          text= 'textEn';
        }
        return text;
      },

      getRootLanguage: function(){
       language = navigator.language.split("-");
       rootLanguage = (language[0]);
       return rootLanguage;
      },

      /**
       * Updates links for showing related locations in the infowindow given the location that related is shown for
       * @param location
       */
      updateRelatedLinks: function (location) {
        $('.iw a.showRelated').show();
        $('.iw a.hideRelated').hide();
        var showingNonVisibleForLocation = this.appModel.get("showingNonVisibleForLocation");
        if (showingNonVisibleForLocation && location == showingNonVisibleForLocation.location) {
          var attrQuery = '[data-related-by="' + showingNonVisibleForLocation.relatedBy + '"][data-related-types="' + showingNonVisibleForLocation.types.join(" ") + '"]';
          $('.iw a.showRelated' + attrQuery).hide();
          $('.iw a.hideRelated' + attrQuery).show();
        }
      },

      /**
       * Closes the info window.
       */
      close: function () {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
      }
    }); //-- End of InfoWindow view

