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
        types: ["building"]
      }),
      title: 'map.titles.buildings'
    });

  /*  getLocale();
    i18n.init({resGetPath: '../../../i18n/__lng__.json'}, function(){
      $('#page-map').i18n();
    });*/

    appView.render();
    appView.updateLocations();
  },

  parkingspaces: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        filterByCampus: true,
        types: ["parking", "handicap_parking", 'entrance'],
        zoomSensitive: true
      }),
      title: 'map.titles.parking'
    });
    appView.on('toggleMarkerVisibility', function (locations, visible) {
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
      title: 'map.titles.departments'
    });
    appView.render();
    appView.updateLocations();
  }
});
