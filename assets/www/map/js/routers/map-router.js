var MapRouter = Backbone.Router.extend({
  routes: {
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

  computerLabs: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["computer_labs"] }),
      title: "Datorsalar"
    });
    appView.render();
    appView.updateLocations();
  },

  auditoriums: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["auditorium"] }),
      title: "Hör- & skrivsalar"
    });
    appView.render();
    appView.updateLocations();
  },

  buildings: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        menu: true,
        types: ["building"]
      }),
      title: "Hus"
    });
    appView.render();
    appView.updateLocations();
  },

  parkingspaces: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        filterByCampus: true,
        types: ["parking", "handicap_parking", 'entrance'],
        zoomSensitive: true,
        toggleMarkerVisibility: function (locations, visible) {
          locations.each(function (item) {
            if (item.get('type') == 'entrance') {
              item.set('visible', visible);
            }
          });
        }
      }),
      title: "Parkeringar"
    });
    appView.render();
    appView.updateLocations();
  },

  departments: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        types: ["organization"]
      }),
      title: "Institutioner"
    });
    appView.render();
    appView.updateLocations();
  }
});
