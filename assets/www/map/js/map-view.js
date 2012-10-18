$(function() {

	var Map = Backbone.View.extend({

		el: $('#map_canvas'),
		
		map: null,

		initialize: function() {

			// Stockholms Universitet
			var latlng = new google.maps.LatLng(59.364213,18.058383);

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

		showCurrentPosition: function(curCoords, animate) {
//			console.log("curCoords = " + curCoords);
			var options = {
					'title': 'You are here!',
					'bound': true,
					'position': curCoords,
					'poiType': 'geo'
			};
			if (animate) options.animation = google.maps.Animation.DROP;

			var self = this; // once inside block bellow, this will be the function
			this.$el.gmap('addMarker', options).click(function() {
				self.$el.gmap('openInfoWindow', { 'content': 'You are here!' }, this);
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
		
		showPOIs: function(campus, type, locations) {
			var mapDiv = $('#map_canvas');

            locations.each(function(item) {
              var itemLocation = item.get("locations");

              mapDiv.gmap('addMarker', {
                  'position': new google.maps.LatLng(itemLocation[0], itemLocation[1]),
                  'poiType': item.get("campus") + "." + item.get("type"),
                  'visible': true
              }).click(function() {
                  mapDiv.gmap('openInfoWindow', { content : item.get("text") }, this);
              });
            });

            // Hide other pois (except geo-location)
            mapDiv.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
                if (marker.poiType != campus + "." + type && marker.poiType != "geo") {
                    marker.setVisible(false);
                }
            });
		}
	}); //-- End of Map view

	window.MapView = new Map;
});