$(function() {

	var Map = Backbone.View.extend({

		el: $('#map_canvas'),
		
		map: null,
		locations: { // format [lat, lng, zoom]
			"freskati": [59.363317, 18.0592, 15],
			"kraftriket": [59.35774, 18.054399, 15],
			"kista": [59.405477, 17.946543, 17],
			"socialhs": [59.351243, 18.049204, 17]
		},
		pois: {
			"parkering": {
				freskati: {text:"Freskati Parkering", locations:[[59.362027, 18.060873], [59.366488, 18.060401], [59.366706, 18.055895]]},
				kraftriket: {text:"Freskati Parkering", locations:[[59.357018, 18.055891], [59.356493, 18.055353]]},
				kista: {text:"Freskati Parkering", locations:[[59.40569, 17.945758], [59.405488, 17.945886]]},
				socialhs: {text:"Freskati Parkering", locations:[[59.350521, 18.050727], [59.351133, 18.047723]]}
			},
			"handikapstoa": {},
			"konferans": {},
			"mat": {}
		},

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
		
		centerOnLocation: function(location) {
			if (location != "") {
				var opts = this.locations[location];
				var googleCoords = new google.maps.LatLng(opts[0], opts[1]);
				this.map.panTo(googleCoords);
				this.map.setZoom(opts[2]);
			}
		},
		
		showPOIs: function(location, poiType) {
			var mapDiv = $('#map_canvas');
			
			if (location != "" && poiType != "") {
				var pois = this.pois[poiType][location];
				
				// Add pois to map
				if (pois) {
					$.each(pois.locations, function(i,v) {
						mapDiv.gmap('addMarker', {
							'position': new google.maps.LatLng(v[0], v[1]),
							'poiType': location + "." + poiType,
							'visible': true
						}).click(function() {
							mapDiv.gmap('openInfoWindow', { content : pois.text }, this);
						});
					});
				}
				
				
				// Hide other pois (except geo-location)
				mapDiv.gmap('find', 'markers', { 'property': 'poiType'}, function(marker, found) {
					if (marker.poiType != location + "." + poiType && marker.poiType != "geo") {
						marker.setVisible(false);
					}
				});

			}			
		}

		
	}); //-- End of Map view

	
	window.MapView = new Map;
});