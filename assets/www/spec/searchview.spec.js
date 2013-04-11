describe('Map view', function () {
  beforeEach(function () {
    $('#stage').replaceWith("<div data-role='page' id='page-map' style='width:200px; height:200px'><div id='map_canvas'></div></div>");

    this.view = new MapView({el: $('#map_canvas')});
  });

  //maryam tries some stuff
  describe('populate filter list', function () {
    beforeEach(function () {
      var filteredList = '<div id="search-box" class="ui-mini">'+
        '<ul id="search-autocomplete" data-role="listview" data-theme="a" data-filter-theme="a" data-mini="true" data-filter-mini="true"' +
        'data-filter="true" data-filter-reveal="true" data-filter-placeholder="Enter search string" data-inset= "true">' +
        '</ul>' +
        '</div>';
      $('#page-map').append(filteredList);
      $.mobile.loadPage("#page-map");
    });

    it('should populate filter list with the correct number of items', function () {
      expect($("#search-autocomplete li").length).toEqual(0);
      var list = ["E 144", "D4 a", "Hiss E3"];
      this..filterSearch(list);
      expect($("#search-autocomplete li").length).toEqual(3);
    });
  });
  //end
});