function startModule() {

  var appView = new AppView({ el:$('#page-map') });

  $('#page-map').trigger( "pagecreate" );
  document.addEventListener("searchbutton", function() {alert("apa"); this.openSearchPopup(null)}, false);
}
