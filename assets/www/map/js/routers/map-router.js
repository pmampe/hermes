var MapRouter = Backbone.Router.extend({
  routes: {
    "restaurants" : "restaurants",
    "computerLabs": "computerLabs",
    "auditoriums": "auditoriums",
    "buildings": "buildings",
    "parkingspaces": "parkingspaces",
    "departments": "departments",
    "*actions": "defaultRoute"
  },

  defaultRoute: function (actions) {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel()
    });
    appView.render();

    $('#page-map').trigger("pagecreate");
  },

  restaurants: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["restaurant"] }),
      title: 'map.titles.restaurants'
    });
    appView.render();
    appView.updateLocations();
  },


  computerLabs: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["computer_labs"] }),
      title: 'map.titles.computerlabs'
    });
    appView.render();
    appView.updateLocations();
  },

  auditoriums: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["auditorium"] }),
      title:'map.titles.auditoriums'
     // title: "Hör- & skrivsalar"
    });
    appView.render();
    appView.updateLocations();
  },

  buildings: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        menu: true,
        types: ["building", "entrance"],
        nonVisibleTypes: ["entrance"]
      }),
      title: 'map.titles.buildings'
    });
    appView.render();
    appView.updateLocations();
  },

  parkingspaces: function () {
    var appModel = new AppModel({
      filterByCampus: true,
      types: ["parking", "handicap_parking", 'entrance'],
      nonVisibleTypes: ["entrance"],
      zoomSensitive: true
    });

    var appView = new AppView({
      el: $('#page-map'),
      model: appModel,
      title: "map.titles.parking"
    });
    var self = this;
    appModel.locations.on('reset', function () {
      self.handleParkingspaceLocationsReset(appView, appModel)
    });
    appView.on('toggleMarkerVisibility', this.handleParkingspaceMarkerVisibility);
    appView.render();
    appView.updateLocations();
  },

  departments: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        types: ["organization"]
      }),
      title: 'map.titles.departments'
    });
    appView.render();
    appView.updateLocations();
  },

  /**
   * Handle visibility of parkingspace markers
   *
   * @param locations collecion of locations
   * @param visible true = set markers visible, false = hide markers
   */
  handleParkingspaceMarkerVisibility: function (locations, visible) {
    locations.each(function (item) {
      if (item.get('type') == 'entrance') {
        if (item.get('handicapAdapted') === true) {
          item.set('visible', visible);
        }
        else {
          item.set('visible', false);
        }
      }
    });
  },

  /**
   * Handler for reset event on locations
   *
   * @param appView the app view
   * @param appModel the app model
   */
  handleParkingspaceLocationsReset: function (appView, appModel) {
    appModel.set('zoomSensitive', true);
    appModel.locations.byType(["parking", "handicap_parking"]).each(function (item) {
      item.on('clicked', function () {
        appModel.set('zoomSensitive', false);
        appView.trigger('toggleMarkerVisibility', appModel.locations, true);
      });
    });
  }
});
