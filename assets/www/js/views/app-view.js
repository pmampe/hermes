var AppView = Backbone.View.extend({
  initialize: function () {

    $(document).on('deviceready.appview', this.handleDeviceReady);

    getLocale();
    var self = this;

    i18n.init(i18n.options, function () {
      $('div[data-role="header"] > h1').attr('data-i18n', 'start.header.title');
      self.$el.i18n();
    });

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
