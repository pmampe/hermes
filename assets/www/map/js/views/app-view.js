var AppView = Backbone.View.extend({

    initialize:function () {
      _.bindAll(this, "render", "resetLocations", "changeCampus", "showPOIs");

      this.togglePoiType();

      this.campuses = new Campuses();
      this.campuses.on("reset", this.renderCampuses, this);

      this.campuses.fetch({
        error:function () {
          alert("ERROR! Failed to fetch campuses.")
        }
      });

      this.locations = new Locations();
      this.locations.on("reset", this.resetLocations, this);

      this.locations.fetch({
        error:function () {
          alert("ERROR! Failed to fetch locations.")
        }
      });

      this.parkingAreas = new ParkingAreas();
      this.parkingAreas.on("reset", this.showParkingAreas, this);

      var self = this
      this.mapView = new MapView({ el: $('#map_canvas'), appView:self });
      this.searchView = new SearchView({ el:$('#search-popup'), appView: self, mapView: self.mapView });
    },

    events:{
      "change #campus":"changeCampus",
      "change #poiType":"showPOIs",
      "click a[id=menu-search]":"openSearchPopup"
    },

    openSearchPopup:function (event) {
      this.searchView.render();
    },
    
    showParkingAreas: function() {
    	this.mapView.showParkingAreas(this.parkingAreas);
    },

    resetLocations:function () {
    	this.mapView.resetLocations(this.locations);
    },

    renderCampuses:function () {
      var template = _.template($("#campus_template").html(), {
        defaultOptionName:"Campus",
        options:this.campuses.toJSON()
      });

      this.$el.find('#campus').replaceWith(template);
      this.$el.find('#campus').selectmenu();
      this.$el.find('#campus').selectmenu("refresh", true);
      this.$el.trigger("refresh");
    },

    renderLocations:function (locations) {
      var template = _.template($("#location_template").html(), {
        defaultOptionName:"Filter",
        options:locations
      });

      var types = $('#poiType').val();

      this.$el.find('#poiType')
        .find('option')
        .remove()
        .end()
        .append(template)
        .val('');

      $('#poiType').val(types);

      this.$el.find('#poiType').selectmenu();

      this.togglePoiType();

      this.$el.find('#poiType').selectmenu("refresh", true);
      this.$el.trigger("refresh");
    },

    changeCampus:function (e, v) {
      this.togglePoiType();
      var campus = this.campuses.get($("#campus").val());
      this.mapView.centerOnLocation(campus.get("coords"), campus.get("zoom"), campus.get("name"));

      var locationsByCampus = this.locations.byCampus(campus.get("name"));

      var types = [];
      locationsByCampus.each(function (item) {
        types.push(item.get("type"));
      });

      this.renderLocations(_.uniq(types));

      // Reset poiType (show: -- Category --), trigger change to remove pois
      $('#poiType').trigger("change"); // doesn't work from here for some reason..
    },

    showPOIs:function () {
      var campus = this.campuses.get($("#campus").val());
      if (campus != null)
        campus = campus.get("name");

      var types = $('#poiType').val();
      
      if (types != null) {
        var locations = this.locations.byCampusAndType(campus, types);
        this.mapView.showPOIs(campus, types, locations);
        
        if (types.indexOf("Parkeringar") != -1) {
          this.parkingAreas.fetch({
            data: {campusName: campus},
            error:function () {
              alert("ERROR! Failed to fetch parkingAreas.")
            }
          });
        }
      }
    },

    // disable poiType if no campus is chosen, else enable
    togglePoiType:function () {
      if ($("#campus").val() == "") {
        $('#poiType').selectmenu("disable");
      } else {
        $('#poiType').selectmenu("enable");
      }
    }
});
