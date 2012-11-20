var PointLocationView = GenericLocationView.extend({

  initialize:function (options) {

    options.marker = new google.maps.Marker({
      position:_.flatten(options.model.getGPoints())[0],
      poiType:options.model.getPoiType(),
      visible:true,
      icon:options.model.get('pin'),
      map:null
    });

    var self = this;
    google.maps.event.addListener(options.marker, 'click', function (event) {
      if (options.model.get('directionAware')) {
        options.infoWindow.setDestination(_.flatten(options.model.getGPoints())[0]);
      }
      self.openInfoWindow(options.model, this);
    });

    this.constructor.__super__.initialize.apply(this, [options]);
  },

  updatePosition:function () {
    this.marker.setPosition(_.flatten(this.model.getGPoints())[0]);
  }
});
