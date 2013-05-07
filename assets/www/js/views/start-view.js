var StartView = Backbone.View.extend({
  initialize: function () {
    $(document).on('deviceready.appview', this.handleDeviceReady);

    initLocale();
    $('div[data-role="header"] > h1').attr('data-i18n', 'start.header.title');
    this.$el.i18n();
  },

  events: {
    'click a#sisulink': 'handleSISULinkClick'
  },

  /**
   * Remove handler for the view.
   */
  remove: function () {
    $(document).off('.appview');

    Backbone.View.prototype.remove.call(this);
  },

  /**
   * Handles the device ready event.
   */
  handleDeviceReady: function () {
    navigator.splashscreen.hide();
    gaPlugin.trackPage(null, null, "index.html");
  },

  /**
   * Handle click on sisu link.
   */
  handleSISULinkClick: function (event) {
    gaPlugin.trackPage(null, null, $(event.currentTarget).attr("href"));
  }
});
