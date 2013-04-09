var MapRouter = Backbone.Router.extend({
  routes: {
    "auditoriums": "auditoriums",
    "buildings": "buildings",
    "parkingspaces": "parkingspaces",
    "departments": "departments",
    "*actions": "defaultRoute"
  },

  defaultRoute: function (actions) {
    var appView = new AppView({ el: $('#page-map') });
    appView.render();

    $('#page-map').trigger("pagecreate");
    document.addEventListener("searchbutton", function () {
      this.openSearchPopup(null);
    }, false);
  },

  auditoriums: function () {
    var appView = new AppView({ el: $('#page-map'), title: "Hör- & skrivsalar" });
    appView.render();
    appView.showType("auditorium");
  },

  buildings: function () {
    var appView = new AppView({ el: $('#page-map'), title: "Hus" });
    appView.render();
    appView.showType("building");
  },

  parkingspaces: function () {
    var appView = new AppView({ el: $('#page-map'), title: "Parkeringar" });
    appView.render();
    appView.showType("parkingspace");
  },

  departments: function () {
    var appView = new AppView({ el: $('#page-map'), title: "Institutioner" });
    appView.render();
    appView.showType("organization");
  }
});
