var GenericLocationView = Backbone.View.extend({

  initialize:function (options) {
    this.model = options.model;
    this.gmap = options.gmap;
    this.marker = options.marker;
    this.infoWindow = options.infoWindow;

    this.model.on('change:coords', this.updatePosition);

    // render the initial point state
    this.render();
  },

  render:function () {
    this.marker.setMap(this.gmap);
  },

  updatePosition:function () {
  },

  openInfoWindow:function (model, anchor, latLng) {
    this.infoWindow.render(model, anchor, latLng);
  },

  remove:function () {
    this.marker.setMap(null);
    this.marker = null;
  }
});
