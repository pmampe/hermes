function startModule() {
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;

  getLocale();
  i18n.init({resGetPath: '../i18n/__lng__.json'},function(){
    $('#search_page').i18n();
    $('#details_page').i18n();
  });

  searchView = new SukatSearchView({el: $('#search_view')});
  searchView.render();
  $('#search_page').trigger("pagecreate");

  $('#search_page').i18n();

  $('#details_page').live('pagebeforeshow', function () {
    var itemsDetailsContainer = $('#details_page').find(":jqmData(role='content')"),
        itemDetailsView,
        itemId = $('#details_page').jqmData('itemId'),
        itemModel = searchView.collection.get(itemId);

    itemDetailsView = new PersonDetailsView({el: $('#details_view'), model: itemModel, viewContainer: itemsDetailsContainer});
    itemDetailsView.render();
  });
}
