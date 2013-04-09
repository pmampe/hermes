var MapRouter = Backbone.Router.extend({
  routes: {
    "auditoriums": "auditoriums",
    "buildings": "buildings",
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
    var appView = new AppView({ el: $('#page-map') });
    appView.render();
    appView.showType("building");
  }
});
