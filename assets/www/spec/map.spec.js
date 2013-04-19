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

  describe('zoom to a new bound in the map', function () {
    it('should set map bounds correctly', function () {
      var self = this;

      // TODO: fix this test, for some reason not working here, works when running in normal map..
      google.maps.event.addListener(this.view.map, 'bounds_changed', function () {
        expect(this.getBounds().getSouthWest().lat()).toBeGreaterThan(self.fixtures.Locations.valid.bounds.minLat);
        expect(this.getBounds().getSouthWest().lng()).toBeGreaterThan(self.fixtures.Locations.valid.bounds.minLng);
        expect(this.getBounds().getNorthEast().lat()).toBeLessThan(self.fixtures.Locations.valid.bounds.maxLat);
        expect(this.getBounds().getNorthEast().lng()).toBeLessThan(self.fixtures.Locations.valid.bounds.maxLng);
      });

      this.view.zoomToBounds(this.fixtures.Locations.valid.bounds);
    });
  });
});

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

describe('Campus model', function () {
  describe('when creating an empty Campus', function () {
    beforeEach(function () {
      this.campus = new Campus();
    });

    it('should have id 0', function () {
      expect(this.campus.get('id')).toEqual(0);
    });

    it('should have name "Unknown"', function () {
      expect(this.campus.get('name')).toEqual('Unknown');
    });

    it('should have coords', function () {
      expect(this.campus.get('coords')).toBeDefined();
    });

    it('should have zoom', function () {
      expect(this.campus.get('zoom')).toBeDefined();
    });
  });

  describe('getLat', function () {
    it('should return latitude from coords', function () {
      this.campus = new Campus({ coords: [10, 20] });

      expect(this.campus.getLat()).toEqual(10);
    });
  });

  describe('getLng', function () {
    it('should return longitude from coords', function () {
      this.campus = new Campus({ coords: [10, 20] });

      expect(this.campus.getLng()).toEqual(20);
    });
  });
});

describe('Campus collection', function () {
  describe('creating an empty collection', function () {
    beforeEach(function () {
      this.campuses = new Campuses();
    });

    it('should have Campus for model', function () {
      expect(this.campuses.model).toBe(Campus);
    });

    it('should have a url from config', function () {
      expect(this.campuses.url()).toMatch(config.map.campuses.url);
    });
  });
});
