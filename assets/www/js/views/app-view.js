var AppView = Backbone.View.extend({
  initialize: function () {

    $(document).on('deviceready.appview', this.handleDeviceReady);

    initLocale();
    $('div[data-role="header"] > h1').attr('data-i18n', 'start.header.title');
    this.$el.i18n();
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
    gaPlugin.trackPage(null, null, "index.html");
  }
});
