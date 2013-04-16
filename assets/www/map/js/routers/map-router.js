var MapRouter = Backbone.Router.extend({
  routes: {
    "auditoriums": "auditoriums",
    "*actions": "defaultRoute"
  },

  defaultRoute: function (actions) {
    var appView = new AppView({ el: $('#page-map') });
    appView.render();

    $('#page-map').trigger("pagecreate");
  },

  auditoriums: function () {
    var appView = new AppView({ el: $('#page-map'), title: "Hör- & skrivsalar" });
    appView.render();
    appView.showType("auditorium");
  }
});
