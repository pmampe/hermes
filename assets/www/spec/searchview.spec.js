describe('Map views search filter', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='page-map' style='width:200px; height:200px'>" +
        "<div id='search-box' class='ui-mini'>" +
        "<ul id='search-autocomplete' " +
        "data-role='listview' " +
        "data-theme='a' " +
        "data-filter-theme='a' " +
        "data-mini='true' " +
        "data-filter-mini='true' " +
        "data-filter='true' " +
        "data-filter-placeholder='Enter search string' " +
        "data-autodividers='true' " +
        "data-inset= 'true'>" +
        "</ul>" +
        "</div>" +
        "<div id='map_canvas'></div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-map");

    this.server = sinon.fakeServer.create();
    this.server.respondWith(
        "GET",
        Locations.prototype.url(),
        this.validResponse(this.fixtures.Locations.valid)
    );
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
    this.server.restore();
  });

  describe('instantiation', function () {
    it('should initialize search view on map view initialization', function () {
      spyOn(SearchView.prototype, "initialize");
      new MapView({ el: $('#map_canvas') });
      expect(SearchView.prototype.initialize).toHaveBeenCalled();
    });

    it('should render search view on location refresh', function () {
      var mapView = new MapView({ el: $('#map_canvas') });
      spyOn(mapView.searchView, "render");
      runs(function () {
        mapView.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return mapView.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect(mapView.searchView.render).toHaveBeenCalled();
      });
    });
  });

  describe('mobile keyboard handling', function () {
    beforeEach(function () {
      spyOn(SearchView.prototype, "hideFilteredList");
      new MapView({ el: $('#map_canvas') });
    });

    it('should set type to search on the search input field', function () {
      expect($('#search-box input').attr('type')).toBe('search');
    });

    it('should prevent form submit to trigger blur event in search input field', function () {
      $('#search-box form').submit();
      expect(SearchView.prototype.hideFilteredList.calls.length).toBe(0);
    });

    it('should blur input field on enter key but not hide the filter list', function () {
      runs(function () {
        var event = $.Event('keyup');
        event.which = 13;
        $('#search-box input').trigger(event);
        expect(SearchView.prototype.hideFilteredList.calls.length).toBe(1);
        expect(SearchView.prototype.hideFilteredList.mostRecentCall.args[1].skipHide).toBeTruthy();
        expect($('#search-box input').is(":focus")).toBeFalsy();
      });

      waitsFor(function() {
        return true;
      }, "timeout", 200);

      runs(function() {
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(0);
      });
    });
  });
});
