$(function() {

  var AppView = Backbone.View.extend({

    el: $('#page-map'),

    initialize: function() {
      this.campuses = new Campuses();
      this.campuses.on("reset", this.renderCampuses, this);

      this.campuses.fetch({
        error: function() {alert("ERROR! Failed to fetch campuses.")}
      });

      this.togglePoiType();
    },

    events: {
      "change #campus": "changeCampus",
      "change #poiType": "showPOIs"
    },

    renderCampuses: function() {
      var template = _.template( $("#campus_template").html(), {
        defaultOptionName: "Campus",
        campusOptions: this.campuses.toJSON()
      } );

      this.$el.children('#page-map-header').append(template);
      this.$el.find('#campus').selectmenu();
      this.$el.find('#campus').selectmenu("refresh", true);
    },

    changeCampus: function(e, v) {
      this.togglePoiType();
      var campus = this.campuses.get($("#campus").val());
      window.MapView.centerOnLocation(campus.get("coords"), campus.get("zoom"));

      // Reset poiType (show: -- Category --), trigger change to remove pois
      $('#poiType').val("");
      $('#poiType').trigger("change"); // doesn't work from here for some reason..
      $('#poiType').selectmenu("refresh");
    },

    showPOIs: function() {
      window.MapView.showPOIs($("#campus").val(), $('#poiType').val());
    },

    // disable poiType if no campus is chosen, else enable
    togglePoiType: function() {
      if ($("#campus").val() == "") {
        $('#poiType').selectmenu("disable");
      } else {
        $('#poiType').selectmenu("enable");
      }
    },

    fadingMsg: function(locMsg) {
      $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
        .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
        .appendTo( $.mobile.pageContainer )
        .delay( 2200 )
        .fadeOut( 1000, function(){
          $(this).remove();
        });
    }

  }); //-- End of App view

  window.App = new AppView;
});