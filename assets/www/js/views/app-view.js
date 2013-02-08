var AppView = Backbone.View.extend({
  events:{
    "click a[id=mondo-link]":"openInAppBrowser",
    "click a[id=su-link]":"openInAppBrowser",
    "click a[id=sub-link]":"openInAppBrowser"
  },

  openInAppBrowser:function (event) {
    event.preventDefault();
    var url = event.currentTarget.href;
    window.open(url, '_blank', 'location=yes');
  }
});
