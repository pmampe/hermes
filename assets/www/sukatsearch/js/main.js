function startModule() {
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  searchView = new SearchView({el:$('#search_view')});
}