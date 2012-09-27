var mapdata = { destination: new google.maps.LatLng(59.366619, 18.062979) };
var currCoords;

function fadingMsg (locMsg) {
    $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
    .appendTo( $.mobile.pageContainer )
    .delay( 2200 )
    .fadeOut( 1000, function(){
        $(this).remove();
   });
}

function addTestMarkers() {
	var pois = [[59.364782,18.054589], [59.365558,18.054997], [59.366575,18.057915], [59.356952,18.053409], [59.363678,18.06313]];
	$.each(pois, function(i,v) {
		$('#map_canvas').gmap('addMarker', { 
			'position': new google.maps.LatLng(v[0], v[1]),
			'poiType': 'location',
			'visible': false
		}).click(function() {
			$('#map_canvas').gmap('openInfoWindow', { content : 'Very interesting point!' }, this);
		});
	});
}

function toogleShowPOI() {
	var poiVisible = $("#choosePOI").prop("checked");
	
	if (poiVisible) {
		$('#map_canvas').gmap('find', 'markers', { 'property': 'poiType', 'value': ['location','geo'] }, function(marker, found) {
			marker.setVisible(true);
		});
	} else if (!poiVisible) {
		$('#map_canvas').gmap('find', 'markers', { 'property': 'poiType', 'value': 'location' }, function(marker, found) {
			// weird bug in api, takes all markers
			if (marker.poiType == 'location') {
				marker.setVisible(false);
			}
		});
	}
}



function showDirections() {
	var destinationText = $("#destination").val();

	var destinationCoords = {};
	if (destinationText == "su-south") {
		destinationCoords = { destination: new google.maps.LatLng(59.363339, 18.060319) };
	} else if (destinationText == "su-north") {
		destinationCoords = { destination: new google.maps.LatLng(59.36657,18.063045) };
	} else if (destinationText == "kraftriket") {
		destinationCoords = { destination: new google.maps.LatLng(59.361436, 18.053988) }; 
	}
	
	if (destinationText != "-") {
		makeMap(currCoords, destinationCoords.destination);
	}
}

function makeMap (curCoords, destCoords) { 
    $('#map_canvas').gmap('displayDirections', 
        { 'origin' : curCoords, 
          'destination' : destCoords, 
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
} // end makeMap

function showCurrentPosition (curCoords, accuracy) {
	console.log("curCoords = " + curCoords);
	$('#map_canvas').gmap('addMarker', { 
		'title': 'You are here!', 
		'bound': true, 
		'animation': google.maps.Animation.DROP, 
		'position': curCoords,
		'poiType': 'geo'
	}).click(function() {
		$('#map_canvas').gmap('openInfoWindow', { 'content': 'You are here!' }, this);
	});
}




$(document).ready(function() {
	$("#getDirections").live("click", showDirections);
	$("#choosePOI").prop("checked", false); // make sure it's not checked when reloading page
	$("#choosePOI").live("change", toogleShowPOI);
});


// Home page
$('#page-home').live("pageinit", function() {
	$('#map_square').gmap(
	    { 'center' : mapdata.destination, 
	      'zoom' : 12, 
	      'mapTypeControl' : false,
	      'navigationControl' : false,
	      'streetViewControl' : false 
	    })
	    .bind('init', function(evt, map) { 
	        $('#map_square').gmap('addMarker', 
	            { 'position': map.getCenter(), 
	              'animation' : google.maps.Animation.DROP 
	            });                                                                                                                                                                                                                
	    });
    $('#map_square').click( function() { 
        $.mobile.changePage($('#page-map'), {});
    });
});

//Create the map then make 'displayDirections' request
$('#page-map').live("pageinit", function() {
    $('#map_canvas').gmap({'center' : mapdata.destination,
    	'zoom': 12,
        'mapTypeControl' : true, 
        'navigationControl' : true,
        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
        })
    .bind('init', function() {
        $('.refresh').trigger('tap');        
    });
    
});


$('#page-map').live("pageshow", function() {
    $('#map_canvas').gmap('refresh');
});

// Request display of directions, requires jquery.ui.map.services.js
$('.refresh').live("tap", function() {
	$('#map_canvas').gmap('clear', 'markers');
    addTestMarkers();

	currCoords = mapdata.destination;
	var accuracy = -1;
	
	// START: Tracking location with device geolocation
	if ( navigator.geolocation ) { 
		fadingMsg('Using device geolocation to get current position.');
	    
	    navigator.geolocation.getCurrentPosition ( 
	        function(position) {
	        	currCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	        	accuracy = position.coords.accuracy;
	        	showCurrentPosition(currCoords, accuracy);
	        }, 
	        function(error){ 
	            alert('Unable to get location');
	            //$.mobile.changePage($('#page-home'), {}); 
	        }); 
	} else {
		alert('Unable to get location2.');
	}            
	    // END: Tracking location with device geolocation
	
	
	$(this).removeClass($.mobile.activeBtnClass);
	return false;
});

// Go to map page to see instruction detail (zoom) on map page
$('#map-button2').live("tap", function() {
    $.mobile.changePage($('#page-map'), {});
});

// Briefly show hint on using instruction tap/zoom
$('#page-dir').live("pageshow", function() {
    fadingMsg("Tap any instruction<br/>to see details on map");
});	

$('#page-dir table').live("tap", function() {
	$.mobile.changePage($('#page-map'), {});
});	


