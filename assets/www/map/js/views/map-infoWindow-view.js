var InfoWindow = Backbone.View.extend({

  infoWindow:null,
  destination:null,

  initialize:function (options) {
    _.bindAll(this, 'render');

    this.infoWindow = new google.maps.InfoWindow();

    var self = this;

    // TODO: refactor to (backbone) events: { [selector]: [function] }, couldn't get this to work. /lucien
    $(".dir-button").live("click", function () {
      self.remove();

      $("#footer-buttons1").hide();
      $("#footer-buttons2").show();

      $(".dir-button").each(function () {
        $(this).removeClass("selected");
      });
      $(this).addClass("selected");
      options.mapView.getDirections(this.id);
    });
  },

  /** For some reason, can't use self as callback, resulting in the function bellow having
   * both a self and a callback parameter (normally it's the same - 'this').
   */
  render:function (model, anchor, latlng) {
    this.remove(); // remove previous infowindow

    var displayMode = model.get('directionAware') ? "display:inline" : "display:none";
    var variables = { itemText:model.get("text"), displayMode:displayMode };
    var template = _.template($("#infoWindow_template").html(), variables);

    this.infoWindow.setContent(template);
    if (latlng) {
    	this.infoWindow.setPosition(latlng);
    	this.infoWindow.open(anchor.getMap());
    } else {
    	this.infoWindow.open(anchor.getMap(), anchor);
    }
  },

  remove:function () {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }
}); //-- End of InfoWindow view

