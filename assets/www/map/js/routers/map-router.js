var MapRouter = Backbone.Router.extend({
  routes: {
    "auditoriums": "auditoriums",
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
    var appView = new AppView({ el: $('#page-map') });
    appView.render();
    appView.showType("auditorium");
  }
});
