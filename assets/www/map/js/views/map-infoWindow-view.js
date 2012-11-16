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
  render:function (itemText, anchor, displayDirections) {
    this.remove(); // remove previous infowindow

    var displayMode = displayDirections ? "display:inline" : "display:none";
    var variables = { itemText:itemText, displayMode:displayMode };
    var template = _.template($("#infoWindow_template").html(), variables);

    this.infoWindow.setContent(template);
    this.infoWindow.open(anchor.getMap(), anchor);
  },

  remove:function () {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }


}); //-- End of InfoWindow view

