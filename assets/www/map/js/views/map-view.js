$(function() {

	var Map = Backbone.View.extend({

		el: $('#map_canvas'),
		map: null,
		currLoc: null,
		infoWindow: null,
		

		initialize: function() {

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
			// this.$el.height($(window).height() - $("header").height());

			// Add the Google Map to the page
			this.$el.gmap(myOptions);
			this.map = this.$el.gmap("get", "map");

			this.showCurrentPositionIfGpsAvailable();
			

			/* Using the two blocks below istead of creating a new view for
			 * page-dir, which holds the direction details. This because
			 * it's of the small amount of functionality.
			 */
			// Briefly show hint on using instruction tap/zoom
			$('#page-dir').live("pageshow", function() {
				window.App.fadingMsg("Tap any instruction<br/>to see details on map");
			});

			$('#page-dir table').live("tap", function() {
				$.mobile.changePage($('#page-map'), {});
			});
			/* ------------------------------------------------------------- */
			


			/*
        // Bind an event to add tweets from the collection

        this.collection.bind('add', function(model) {

            // Stores the tweet's location
            var position = new google.maps.LatLng( model.get("geo").coordinates[0], model.get("geo").coordinates[1]); 

            // Creates the marker
            // Uncomment the 'icon' property to enable sexy markers. Get the icon Github repo:
            // https://github.com/nhunzaker/twittermap/tree/master/images
            var marker = new google.maps.Marker({                         
              position: position,
              map: map,
              title: model.from_user,                  
              //icon: 'images/marker.png', 
              description: model.text
            });


        });

			 */
		},
		
		showNewInfoWindowAndCloseOldOnesIfOpen: function(itemText, self) {
			if (self.infoWindow) {
				self.infoWindow.close();
			}
			self.infoWindow = new google.maps.InfoWindow({content: itemText});
			self.$el.gmap('openInfoWindow', self.infoWindow, self);
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
				var itemText = "<div class='iw'>" +
		        	"<h3>You are here!</h3>" +
	        	"</div>";
				
				// TODO: Get to work
				self.showNewInfoWindowAndCloseOldOnesIfOpen(itemText, self);
			});
		},
		
		
		showCurrentPositionIfGpsAvailable: function() {
			//START: Tracking location with device geolocation
			if ( navigator.geolocation) {
				var self = this; // once inside block bellow, this will be the function
				navigator.geolocation.getCurrentPosition (
						function(position) {
							window.App.fadingMsg('Using device geolocation to get current position.');
							var currCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							self.currLoc = currCoords; // store current position
							// accuracy = position.coords.accuracy;
							self.showCurrentPosition(currCoords, true);
						},
						function(error){
							window.App.fadingMsg('Unable to get location\n');
							console.log(error);
						});
			}
			//END: Tracking location with device geolocation
		},
		
		centerOnLocation: function(coords, zoom) {
			if (coords != "" && zoom != "") {
				var googleCoords = new google.maps.LatLng(coords[0], coords[1]);
				this.map.panTo(googleCoords);
				this.map.setZoom(zoom);
			}
		},
		
		showPOIs: function(campus, types, locations) {
            var poiTypesNames = _.map(types, function(type){ return campus + "." + type; });

            // Hide other pois (except geo-location)
            this.$el.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
                if (_.contains(poiTypesNames, marker.poiType) || marker.poiType == "geo") {
                    marker.setVisible(true);
                }
                else {
                    marker.setVisible(false);
                }
            });
		},
		
		
		renderResultList: function(searchResults) {
			self = this;

			// Hide other pois (except geo-location)
			this.$el.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
				if (marker.poiType != "geo") {
					marker.setVisible(false);
				}
			});

			var redPin =    new google.maps.MarkerImage(
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
				'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
				'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
				'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
				'AAAABJRU5ErkJggg==');

			searchResults.each(function(item) {
				var itemLocation = item.get("locations");
				var itemText = item.get("text");

				this.$el.gmap('addMarker', {
					'position': new google.maps.LatLng(itemLocation[0], itemLocation[1]),
					'poiType': "search_result",
					'visible': true,
					'icon': redPin
				}).click(function() {
					self.showNewInfoWindowAndCloseOldOnesIfOpen(itemText, self);
				});
			});
		},

		
		// origin optional parameter
		getDirections: function(destination, origin) {
			var orig = origin? origin: this.currLoc;
			
			this.$el.gmap('displayDirections', { 
				'origin' : orig,
				'destination' : destination,
				'travelMode' : google.maps.DirectionsTravelMode.WALKING },
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

	window.MapView = new Map;
});