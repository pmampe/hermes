$(document).on("mobileinit", function () {
  $.support.cors = true;

  $.mobile.allowCrossDomainPages = true;
  $.mobile.pushStateEnabled = false;
  $.mobile.page.prototype.options.domCache = true;
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = true;
  $.mobile.hashListeningEnabled = true;
});
