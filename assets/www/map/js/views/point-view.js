var PointView = Backbone.View.extend({

  initialize:function (options) {
    this.model = options.model;
    this.gmap = options.gmap;

    this.marker = new google.maps.Marker({
      position:this.model.getGLocation(),
      poiType:this.model.getPoiType(),
      visible:true,
      icon:this.model.get('pin'),
      map:null
    });

    var self = this;

    this.model.on('change:locations', function () {
      self.marker.setPosition(self.model.getGLocation());
    });

    // render the initial point state
    this.render();
  },

  render:function () {
    this.marker.setMap(this.gmap);
  },

  remove:function () {
    this.marker.setMap(null);
    this.marker = null;
  }
});
