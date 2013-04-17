var MapRouter = Backbone.Router.extend({
  routes: {
    "auditoriums": "auditoriums",
    "buildings": "buildings",
    "parkingspaces": "parkingspaces",
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
        types: ["parking", "handicap_parking"]
      }),
      title: "Parkeringar"
    });
    appView.render();
    appView.updateLocations();
  }
});
