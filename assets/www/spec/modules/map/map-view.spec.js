describe('Map view', function () {
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

    this.view = new MapView({
      el: $('#map_canvas'),
      model: new MapModel()
    });
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
  });

  describe('instantiation', function () {
    it('should create a div of #map_canvas', function () {
      expect(this.view.el.nodeName).toEqual("DIV");
      expect(this.view.el.id).toEqual("map_canvas");
    });
  });

  describe('resize', function () {
    beforeEach(function () {
      // We need to create a new view since we need to attach the spy first
      spyOn(MapView.prototype, 'resize');
      this.view = new MapView({
        el: $('#map_canvas'),
        model: new MapModel()
      });
    });

    it('should react to window resize events', function () {
      $(document).trigger('resize');
      expect(MapView.prototype.resize.calls.length).toBe(1);
    });

    it('should remove the event handler from document.resize when the view is removed', function () {
      this.view.remove();
      $(document).trigger('resize');
      expect(MapView.prototype.resize.calls.length).toBe(0);
    });
  });
});
