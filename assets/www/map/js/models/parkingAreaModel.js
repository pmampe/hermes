var ParkingArea = Backbone.Model.extend({
	defaults: {
		"id": 0,
		"coords": [],
		"streetName": "",
		"info": "",
		"type": 'unknown',
		"objectId": "",
		"vehicle": "",
		"campus": 'unknown'
	}
});

var ParkingAreas = Backbone.Collection.extend({
	model: ParkingArea,

	url: function() {
		return 'http://localhost:8080/hermes-broker/geo/parking';
	}

});
