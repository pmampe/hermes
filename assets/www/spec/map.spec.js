describe('App view', function () {
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
        new Locations().url(),
        this.validResponse(this.fixtures.Locations.valid)
    );

    this.view = new AppView({el: $('#page-map'), title: "foobar", model: new AppModel()});
    this.server.respond();
  });

  afterEach(function () {
    this.server.restore();
    $('#page-map').replaceWith("<div id='stage'></div>");
  });

  describe('instantiation', function () {
    it('should create a div of #page-map', function () {
      expect(this.view.el.nodeName).toEqual("DIV");
      expect(this.view.el.id).toEqual("page-map");
    });

    it('should set this.header from options.header', function () {
      expect(this.view.title).toEqual("foobar");
    });
  });

  describe('render', function () {
    beforeEach(function () {
      $('#page-map').append("<div data-role='header'><h1>foo</h1></div>");
    });

    it('should replace heaser with this.header', function () {
      //spyOn(this.view.mapView, 'render');
      this.view.render();
      expect($('div[data-role="header"] > h1').text()).toEqual("foobar");
    });
  });
});
