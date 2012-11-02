$(function () {

	var InfoWindow = Backbone.View.extend({

		infoWindow: null,
		destination: null,


		initialize: function() {
			var self = this;

			$(".dir-button").live("click", function() {
				self.remove();

				$("#footer-buttons1").hide();
				$("#footer-buttons2").show();

				$(".dir-button").each(function() {
					$(this).removeClass("selected");
				});
				$(this).addClass("selected");
				window.MapView.getDirections(this.id);
			});
		},

		/** For some reason, can't use self as callback, resulting in the function bellow having
		 * both a self and a callback parameter (normally it's the same - 'this').
		 */
		render: function(itemText, self, callback, destinationCoords) {
			this.remove(); // remove previous infowindow
			
			// TODO: remove dependency to MapView
			if (destinationCoords) {
				window.MapView.destination = new google.maps.LatLng(destinationCoords[0], destinationCoords[1]);
			}

			var displayMode = destinationCoords? "display:inline": "display:none";
			var variables = { itemText: itemText, displayMode: displayMode };
			var template = _.template( $("#infoWindow_template").html(), variables );

			this.infoWindow = new google.maps.InfoWindow({content: template});
			self.$el.gmap('openInfoWindow', this.infoWindow, callback);
		},

		remove: function() {
			if (this.infoWindow) {
				this.infoWindow.close();
			}			
		}


	}); //-- End of InfoWindow view

	window.MapInfoWindowView = new InfoWindow;
});
