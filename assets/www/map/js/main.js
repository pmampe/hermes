function startModule() {

  var appView = new AppView({ el:$('#page-map') });
  appView.render();

  $('#page-map').trigger("pagecreate");
  document.addEventListener("searchbutton", function () {
    this.openSearchPopup(null);
  }, false);
}
