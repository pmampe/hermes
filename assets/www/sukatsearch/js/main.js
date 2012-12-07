function startModule() {
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  searchView = new SearchView({el: $('#search_view')});
  $('#search_page').trigger("pagecreate");


  $('#details_page').live('pagebeforeshow', function () {
    var itemsDetailsContainer = $('#details_page').find(":jqmData(role='content')"),
        itemDetailsView,
        itemId = $('#details_page').jqmData('itemId'),
        itemModel = searchView.collection.get(itemId);

    itemDetailsView = new PersonDetailsView({el: $('#details_view'), model: itemModel, viewContainer: itemsDetailsContainer});
    itemDetailsView.render();
  });
}
