var MapView = Backbone.View.extend({

  model:new MapModel(),
  map:null,
  destination:null, // used when showing directions
  infoWindow:null,
  mapInfoWindowView:null,

  initialize:function () {
    _.bindAll(this, "render", "showInfoWindow", "resetSearchResults", "resetLocations");

    // Google Maps Options
    var myOptions = {
      zoom:15,
      center:this.model.get('location'),
      mapTypeControl:false,
      navigationControlOptions:{ position:google.maps.ControlPosition.LEFT_TOP },
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      streetViewControl:false
    };

    // Add the Google Map to the page
    this.$el.gmap(myOptions);
    this.map = this.$el.gmap("get", "map");

    this.model.set({currentPosition:new Location({
      id:-100,
      campus:null,
      type:'CurrentPosition',
      text:'You are here!',
      locations:[this.model.get('location').lat(), this.model.get('location').lng()],
      directionAware:false,
      pin:new google.maps.MarkerImage(
          'http://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          new google.maps.Size(22, 22),
          new google.maps.Point(0, 18),
          new google.maps.Point(11, 11))
    })});

    this.locations = new Locations();
    this.searchResults = new LocationSearchResult();

    this.locations.on("reset", this.resetLocations, this);
    this.searchResults.on("reset", this.resetSearchResults, this);
    this.model.on('change:location', this.updateCurrentPosition, this);

    this.pointViews = {};
    this.campusPoint = null;

    // Force the height of the map to fit the window
    $("#map-content").height($(window).height() - $("#page-map-header").height() - $(".ui-footer").height());

    this.currentPositionPoint = new PointView({ model:this.model.get('currentPosition'), gmap:this.map});
    this.currentPositionPoint.render();

    var self = this;
    google.maps.event.addListener(this.currentPositionPoint.marker, 'click', function () {
      self.showInfoWindow(self.currentPositionPoint.model, this);
    });

    this.updateGPSPosition();

    /* Using the two blocks below istead of creating a new view for
     * page-dir, which holds the direction details. This because
     * it's of the small amount of functionality.
     */
    // Briefly show hint on using instruction tap/zoom
    $('#page-dir').live("pageshow", function () {
      self.fadingMsg("Tap any instruction<br/>to see details on map");
    });

    $('#page-dir table').live("tap", function () {
      $.mobile.changePage($('#page-map'), {});
    });
    /* ------------------------------------------------------------- */

    this.mapInfoWindowView = new InfoWindow({mapView:this});
  },

  fadingMsg:function (locMsg) {
    $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
        .css({ "display":"block", "opacity":0.9, "top":$(window).scrollTop() + 100 })
        .appendTo($.mobile.pageContainer)
        .delay(2200)
        .fadeOut(1000, function () {
          $(this).remove();
        });
  },

  showInfoWindow:function (model, anchor, latlng) {
    this.destination = model.get('directionAware') ? model.getGLocation() : null;

    this.mapInfoWindowView.render(model, anchor, latlng);
  },

  showSearchView:function (campus) {
    var searchView = new SearchView({ el:$('#search-popup'), campus:campus, searchResults:this.searchResults });
    searchView.render();
  },

  updateCurrentPosition:function () {
    this.model.get('currentPosition').set({
      locations:[this.model.get('location').lat(), this.model.get('location').lng()]
    });
  },

  updateGPSPosition:function () {
    if (navigator.geolocation) {
      var self = this; // once inside block bellow, this will be the function
      navigator.geolocation.getCurrentPosition(
          function (position) {
            self.fadingMsg('Using device geolocation to get current position.');
            self.model.setLocation(position.coords.latitude, position.coords.longitude); // store current position

            // accuracy = position.coords.accuracy;
          },
          function (error) {
            self.fadingMsg('Unable to get location\n');
            console.log(error);
          });
    }
  },

  updateCampusPoint:function (coords, zoom, name) {
    if (this.campusPoint) {
      this.campusPoint.remove();
    }

    var googleCoords = new google.maps.LatLng(coords[0], coords[1]);
    this.map.panTo(googleCoords);
    this.map.setZoom(zoom);

    var self = this;

    // TODO: choose pinImage for campusLocations or remove pinImage var
    this.campusPoint = new PointView({
      model:new Location({
        id:-200,
        campus:name,
        type:'Campus',
        text:name,
        locations:coords,
        pin:null
      }),
      gmap:self.map
    });

    google.maps.event.addListener(this.campusPoint.marker, 'click', function () {
      self.showInfoWindow(self.campusPoint.model, this);
    });
  },

  resetSearchResults:function () {
    this.replacePoints(this.searchResults);
    $.mobile.loading('hide');
  },

  resetLocations:function () {
    this.replacePoints(this.locations);
  },

  replacePoints:function (newPoints) {
    var self = this;

    _.each(_.values(self.pointViews), function (pointView) {
      // remove all the map markers
      pointView.remove();
    });
    // empty the map
    for (var k in self.pointViews) {
      delete self.pointViews[k];
    }

    newPoints.each(function (item) {
      var point = new PointView({ model:item, gmap:self.map});

      self.pointViews[point.cid] = point;

      google.maps.event.addListener(point.marker, 'click', function () {
        self.showInfoWindow(point.model, this);
      });
    });
  },

  /** @param travelMode: walking, drving or public transportation
   *     @param origin: optional parameter, defaults to map location (model variable)
   *     @param destination: optional parameter, defaults to destination (global variable)
   */
  getDirections:function (travelMode, origin, destination) {
    var orig = origin ? origin : this.model.get('location');
    var dest = destination ? destination : this.destination;
    var travMode = null;

    if (travelMode == "walking") {
      travMode = google.maps.DirectionsTravelMode.WALKING;
    } else if (travelMode == "bicycling") {
      travMode = google.maps.DirectionsTravelMode.BICYCLING;
    } else if (travelMode == "driving") {
      travMode = google.maps.DirectionsTravelMode.DRIVING;
    } else if (travelMode == "publicTransp") {
      travMode = google.maps.DirectionsTravelMode.TRANSIT;
    }

    this.$el.gmap('displayDirections', {
          'origin':orig,
          'destination':dest,
          'travelMode':travMode },
        { 'panel':document.getElementById('dir_panel') },
        function (result, status) {
          if (status === 'OK') {
            var center = result.routes[0].bounds.getCenter();
            $('#map_canvas').gmap('option', 'center', center);
            $('#map_canvas').gmap('refresh');
          } else {
            alert('Unable to get route');
          }
        }
    );
  },
  
	showParkingAreas: function(parkingAreas) {
		var self = this;
		
		var pin = new google.maps.MarkerImage(
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
			'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
			'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
			'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
			'AAAABJRU5ErkJggg==');

		
		// iterate over different parking areas
		parkingAreas.each(function(parkingArea) {
			
			// iterate over individual coordinates
			var points = [];
			$.each(parkingArea.get("coords"), function(index, point) {
				var coord = new google.maps.LatLng(point[0], point[1])
				/*
				self.$el.gmap('addMarker', {
					'position': coord,
					'poiType': "geo",
					'visible': true,
					'icon': pin
				}).click(function() {
					self.showInfoWindow(parkingArea.get("id") + ":" + index, self, this);
				});
				*/
				
				points.push(coord);
			});

			var shape = new google.maps.Polyline({
				'strokeColor': "#000000",
				'strokeOpacity': 0.8,
				'strokeWeight': 3,
				'fillColor': "#00ff00",
				'fillOpacity': 0.35,
				'visible': true,
				'map': self.map,
				'path': points
			});
			google.maps.event.addListener(shape, 'click', function (evt) {
				self.showInfoWindow(parkingArea, this, evt.latLng);
			});

			
//			var drawType = parkingArea.get("drawType");
//			var options = {
//					'strokeColor': "#000000",
//					'strokeOpacity': 0.8,
//					'strokeWeight': 3,
//					'fillColor': "#00ff00",
//					'fillOpacity': 0.35,
//					'visible': true
//			};
//			var pathKey = drawType == "Polyline"? "path": "paths";
//			options[pathKey] = points;
//			self.$el.gmap('addShape', drawType, options).click(function() {
//				var text = parkingArea.get("streetName") + ": " + parkingArea.get("info");
//				self.showInfoWindow(parkingArea, this);
//			});
		});
	}
}); //-- End of Map view
