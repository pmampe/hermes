var StudentView = Backbone.View.extend({
  initialize: function () {

    $(document).on('deviceready.appview', this.handleDeviceReady);

    initLocale({ resGetPath: '../i18n/__lng__.json' });
    $('div[data-role="header"] > h1').attr('data-i18n', 'studentService.header.title');
    this.$el.i18n();
  },

  events: {
    'click a.servicelink': 'handleServiceLinkClick'
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
    gaPlugin.trackPage(null, null, "studentservice/index.html");
  },

  /**
   * Handles the device ready event.
   */
  handleServiceLinkClick: function (event) {
    gaPlugin.trackPage(null, null, $(event.target).attr("href"));
  }
});
