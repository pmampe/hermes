var MapView = Backbone.View.extend({

		map: null,
		currLoc: null,
		destination: null, // used when showing directions
		infoWindow: null,
		locationName: null,
        mapInfoWindowView: null,


		initialize: function() {
          _.bindAll(this, "render", "showInfoWindow");

			// Stockholms Universitet
			var latlng = new google.maps.LatLng(59.364213,18.058383);
			this.currLoc = latlng; // store current position

			// Google Maps Options
			var myOptions = {
					zoom: 15,
					center: latlng,
					mapTypeControl: false,
					navigationControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					streetViewControl: false

			};

			// Force the height of the map to fit the window
			$("#map-content").height($(window).height() - $("#page-map-header").height() - $(".ui-footer").height());

			// Add the Google Map to the page
			this.$el.gmap(myOptions);
			this.map = this.$el.gmap("get", "map");

			this.showCurrentPositionIfGpsAvailable();


			var self = this;

			/* Using the two blocks below istead of creating a new view for
			 * page-dir, which holds the direction details. This because
			 * it's of the small amount of functionality.
			 */
			// Briefly show hint on using instruction tap/zoom
			$('#page-dir').live("pageshow", function() {
				self.fadingMsg("Tap any instruction<br/>to see details on map");
			});

			$('#page-dir table').live("tap", function() {
				$.mobile.changePage($('#page-map'), {});
			});
			/* ------------------------------------------------------------- */

          this.mapInfoWindowView = new InfoWindow({mapView: this});
		},

		fadingMsg: function(locMsg) {
			$("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
			.css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
			.appendTo( $.mobile.pageContainer )
			.delay( 2200 )
			.fadeOut( 1000, function(){
				$(this).remove();
			});
		},

		showInfoWindow: function(itemText, self, callback, destinationCoords) {
			var displayDirections = destinationCoords? true: false;
			this.destination = displayDirections? new google.maps.LatLng(destinationCoords[0], destinationCoords[1]): null;
	      this.mapInfoWindowView.render(itemText, self, callback, displayDirections);
		},

		showCurrentPosition: function(curCoords, animate) {

			var pinImage = new google.maps.MarkerImage(
					'http://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
					new google.maps.Size(22,22),
					new google.maps.Point(0,18),
					new google.maps.Point(11,11));

			var options = {
					'title': 'You are here!',
					'bound': true,
					'position': curCoords,
					'poiType': 'geo',
					'icon': pinImage
			};
			if (animate) options.animation = google.maps.Animation.DROP;

			var self = this; // once inside block bellow, this will be the function
			this.$el.gmap('addMarker', options).click(function() {
				self.showInfoWindow("You are here!", self, this);
			});
		},

		showCurrentPositionIfGpsAvailable: function() {
			//START: Tracking location with device geolocation
			if ( navigator.geolocation) {
				var self = this; // once inside block bellow, this will be the function
				navigator.geolocation.getCurrentPosition (
						function(position) {
							self.fadingMsg('Using device geolocation to get current position.');
							var currCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							self.currLoc = currCoords; // store current position
							// accuracy = position.coords.accuracy;
							self.showCurrentPosition(currCoords, true);
						},
						function(error){
							self.fadingMsg('Unable to get location\n');
							console.log(error);
						});
			}
			//END: Tracking location with device geolocation
		},

		centerOnLocation: function(coords, zoom, name) {
			if (coords != "" && zoom != "") {
				var googleCoords = new google.maps.LatLng(coords[0], coords[1]);
				this.map.panTo(googleCoords);
				this.map.setZoom(zoom);


				this.locationName = name;

				// TODO: choose pinImage for campusLocations or remove pinImage var
				var pinImage = new google.maps.MarkerImage(
						'http://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
						new google.maps.Size(22,22),
						new google.maps.Point(0,18),
						new google.maps.Point(11,11));


				// show location pin (if wanting to get directions)
				var self = this;
				self.$el.gmap('addMarker', {
					'position': googleCoords,
					'poiType': this.locationName,
					'visible': true,
//					'icon': pinImage,
					'animate': google.maps.Animation.DROP
				}).click(function() {
					self.showInfoWindow(name, self, this, coords);
				});
			}
		},

		showPOIs: function(campus, types, locations) {
			var self = this;
            var poiTypesNames = _.map(types, function(type){ return campus + "." + type; });

            // Hide other pois (except geo-location, and current campus)
            this.$el.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
                if (_.contains(poiTypesNames, marker.poiType) || marker.poiType == "geo" || marker.poiType == self.locationName) {
                    marker.setVisible(true);
                }
                else {
                    marker.setVisible(false);
                }
            });
		},


		renderResultList: function(searchResults) {
			// Hide other pois (except geo-location)
			this.$el.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
				if (marker.poiType != "geo") {
					marker.setVisible(false);
				}
			});

			var pin = searchResults.pin;

			self = this;
			searchResults.each(function(item) {
				var itemLocation = item.get("locations");
				var itemText = item.get("text");

				self.$el.gmap('addMarker', {
					'position': new google.maps.LatLng(itemLocation[0], itemLocation[1]),
					'poiType': "search_result",
					'visible': true,
					'icon': pin
				}).click(function() {
					self.showInfoWindow(itemText, self, this, itemLocation);
				});
			});
		},

		resetLocations: function(locations) {
		    var pin = locations.pin;

			var self = this;
			locations.each(function(item) {
				var itemText = item.get("text");
				var itemLocation = item.get("locations");
				var itemCampus = item.get("campus");
				var itemType = item.get("type");

				self.$el.gmap('addMarker', {
					'position': new google.maps.LatLng(itemLocation[0], itemLocation[1]),
					'poiType': itemCampus + "." + itemType,
					'visible': false,
					'icon': pin
				}).click(function() {
					self.showInfoWindow(itemText, self, this, itemLocation);
				});
			});
		},



		/** @param travelMode: walking, drving or public transportation
		 * 	@param origin: optional parameter, defaults to currLoc (global variable)
		 * 	@param destination: optional parameter, defaults to destination (global variable)
		 */
		getDirections: function(travelMode, origin, destination) {
			var orig = origin? origin: this.currLoc;
			var dest = destination? destination: this.destination;
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
				'origin' : orig,
				'destination' : dest,
				'travelMode' : travMode },
				{ 'panel' : document.getElementById('dir_panel') },
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
		}

	}); //-- End of Map view
