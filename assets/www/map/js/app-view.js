$(function() {

  var AppView = Backbone.View.extend({

    el: $('#page-map'),

    initialize: function() {
      this.togglePoiType();

      this.campuses = new Campuses();
      this.campuses.on("reset", this.renderCampuses, this);

      this.campuses.fetch({
        error: function() { alert("ERROR! Failed to fetch campuses.") }
      });

      this.locations = new Locations();
      this.locations.on("reset", this.resetLocations, this);

      this.locations.fetch({
        error: function() { alert("ERROR! Failed to fetch locations.") }
      });
    },

    events: {
      "change #campus": "changeCampus",
      "change #poiType": "showPOIs"
    },

    resetLocations: function() {
      var mapDiv = $('#map_canvas');

      var redPin =    new google.maps.MarkerImage(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
        'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
        'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
        'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
        'AAAABJRU5ErkJggg==');

      this.locations.each(function(item) {
        var itemLocation = item.get("locations");
        var itemText = "<div style='font: 12px/1.5 Verdana, sans-serif;color: #2A3333;text-shadow:none'>" +
        	"<h3>" + item.get("text") + "</h3>" +
        	"<a href='javascript://noop' onclick='window.MapView.getDirections(new google.maps.LatLng(" + itemLocation[0] + "," + itemLocation[1] + "))'>Directions to here</a>" +
        "</div>";
        var itemCampus = item.get("campus");
        var itemType = item.get("type");

        mapDiv.gmap('addMarker', {
          'position': new google.maps.LatLng(itemLocation[0], itemLocation[1]),
          'poiType': itemCampus + "." + itemType,
          'visible': false,
          'icon': redPin
        }).click(function() {
            mapDiv.gmap('openInfoWindow', { content: itemText }, this);
          });
      });
    },

    renderCampuses: function() {
      var template = _.template( $("#campus_template").html(), {
        defaultOptionName: "Campus",
        options: this.campuses.toJSON()
      } );

      this.$el.find('#campus').replaceWith(template);
      this.$el.find('#campus').selectmenu();
      this.$el.find('#campus').selectmenu("refresh", true);
      this.$el.trigger("refresh");
    },

    renderLocations: function(locations) {
      var template = _.template( $("#location_template").html(), {
        defaultOptionName: "Filter",
        options: locations
      } );

      var types = $('#poiType').val();

      this.$el.find('#poiType')
        .find('option')
        .remove()
        .end()
        .append(template)
        .val('');

      $('#poiType').val(types);

      this.$el.find('#poiType').selectmenu();

      this.togglePoiType();

      this.$el.find('#poiType').selectmenu("refresh", true);
      this.$el.trigger("refresh");
    },

    changeCampus: function(e, v) {
      this.togglePoiType();
      var campus = this.campuses.get($("#campus").val());
      window.MapView.centerOnLocation(campus.get("coords"), campus.get("zoom"));

      var locationsByCampus = this.locations.byCampus(campus.get("name"));

      var types = [];
      locationsByCampus.each(function (item) {
        types.push(item.get("type"));
      });

      this.renderLocations(_.uniq(types));

      // Reset poiType (show: -- Category --), trigger change to remove pois
      $('#poiType').trigger("change"); // doesn't work from here for some reason..
    },

    showPOIs: function() {
      var campus = this.campuses.get($("#campus").val());
      if (campus != null)
        campus = campus.get("name");

      var types = $('#poiType').val();

      if (types != null) {
        var locations = this.locations.byCampusAndType(campus, types);
        window.MapView.showPOIs(campus, types, locations);
      }
    },

    // disable poiType if no campus is chosen, else enable
    togglePoiType: function() {
      if ($("#campus").val() == "") {
        $('#poiType').selectmenu("disable");
      } else {
        $('#poiType').selectmenu("enable");
      }
    },

    fadingMsg: function(locMsg) {
      $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
        .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
        .appendTo( $.mobile.pageContainer )
        .delay( 2200 )
        .fadeOut( 1000, function(){
          $(this).remove();
        });
    }

  }); //-- End of App view

  window.App = new AppView;
});