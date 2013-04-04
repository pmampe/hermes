var AppView = Backbone.View.extend({
  events: {
    "click a[id=sisulink]": "openInAppBrowser"
  },

  openInAppBrowser: function (event) {
    event.preventDefault();
    var url = event.currentTarget.href;
    window.open(url, '_blank', 'location=yes');
  }
});
