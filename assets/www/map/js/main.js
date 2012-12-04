function startModule() {
  // Init i18n, not setting language will cause i18next to try browser language.
  i18n.init({
    useCookie:false,
    fallbackLng:'en',
    resGetPath:'locales/__lng__.json',
    getAsync:false
  });

  var appView = new AppView({ el:$('#page-map') });
  appView.render();

  $('#page-map').trigger("pagecreate");
  document.addEventListener("searchbutton", function () {
    this.openSearchPopup(null);
  }, false);
}
