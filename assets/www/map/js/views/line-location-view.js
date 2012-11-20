var LineLocationView = GenericLocationView.extend({

  initialize:function (options) {

    options.marker = new google.maps.Polyline({
      strokeColor:"#000000",
      strokeOpacity:0.8,
      strokeWeight:3,
      fillColor:"#00ff00",
      fillOpacity:0.35,
      visible:true,
      poiType:options.model.getPoiType(),
      map:null,
      path:options.model.getGPoints()
    });

    var self = this;
    google.maps.event.addListener(options.marker, 'click', function (event) {
      if (options.model.get('directionAware')) {
        options.infoWindow.setDestination(event.latLng);
      }
      self.openInfoWindow(options.model, this, event.latLng);
    });

    this.constructor.__super__.initialize.apply(this, [options]);
  },

  updatePosition:function () {
    this.marker.setPath(this.model.getGPoints());
  }
});
