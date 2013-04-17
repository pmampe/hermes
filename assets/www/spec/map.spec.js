describe('Location model', function () {
  describe('when creating an empty location', function () {
    beforeEach(function () {
      this.location = new Location();
    });

    it('should have id 0', function () {
      expect(this.location.get('id')).toEqual(0);
    });

    it('should have name "unknown"', function () {
      expect(this.location.get('name')).toEqual('unknown');
    });

    it('should have campus "unknown"', function () {
      expect(this.location.get('campus')).toEqual('unknown');
    });

    it('should have type "unknown"', function () {
      expect(this.location.get('type')).toEqual('unknown');
    });

    it('should have subType "null"', function () {
      expect(this.location.get('subType')).toBeNull();
    });

    it('should have shape "point"', function () {
      expect(this.location.get('shape')).toEqual('point');
    });

    it('should have no text', function () {
      expect(this.location.get('text')).toEqual('');
    });

    it('should have empty coords', function () {
      expect(this.location.get('coords').length).toEqual(0);
    });

    it('should be directionAware', function () {
      expect(this.location.get('directionAware')).toBeTruthy();
    });

    it('should have a pin', function () {
      expect(this.location.get('pin')).toBeDefined();
    });
  });

  describe('when creating a location', function () {
    beforeEach(function () {
      this.location = new Location({
        campus: 'campus',
        type: 'type',
        coords: [
          [59, 18]
        ]
      });
    });

    it('should generate a poi type from "campus.type"', function () {
      expect(this.location.getPoiType()).toEqual("campus.type");
    });

    it('should generate google LatLng when calling getGPoints', function () {
      expect(this.location.getGPoints()[0].lat()).toEqual(59);
      expect(this.location.getGPoints()[0].lng()).toEqual(18);
    });
  });
});

describe('Locations collection', function () {
  describe('creating an empty collection', function () {
    beforeEach(function () {
      this.locations = new Locations();
    });

    it('should have Location for model', function () {
      expect(this.locations.model).toBe(Location);
    });

    it('should have a url pointing at broker geo api', function () {
      expect(this.locations.url()).toMatch(/http:\/\/.+\.su\.se\/geo\/.+/);
    });
  });

  describe('fetching a collection of locations', function () {
    beforeEach(function () {
      this.locations = new Locations();
      this.fixture = this.fixtures.Locations.valid;

      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          this.locations.url(),
          this.validResponse(this.fixture)
      );
    });

    afterEach(function () {
      this.server.restore();
    });

    it('should make a correct request', function () {
      this.locations.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toMatch(/.*\/poi/);
    });

    it('should return all locations', function () {
      this.locations.fetch();
      this.server.respond();
      expect(this.locations.length).toEqual(4);
    });

    it('should override defaults', function () {
      this.locations.fetch();
      this.server.respond();
      var firstLocation = this.locations.get(1);
      expect(firstLocation.get('id')).toEqual(1);
      expect(firstLocation.get('name')).toEqual('first');
      expect(firstLocation.get('campus')).toEqual('Frescati');
      expect(firstLocation.get('type')).toEqual('parkering');
      expect(firstLocation.get('subType')).toEqual('mc');
      expect(firstLocation.get('shape')).toEqual('line');
      expect(firstLocation.get('text')).toEqual('Foobar');
      expect(firstLocation.get('coords')[0].length).toEqual(2);
      expect(firstLocation.get('coords')[0]).toContain(59.00);
      expect(firstLocation.get('coords')[0]).toContain(18.00);
      expect(firstLocation.get('directionAware')).toBeFalsy();
    });
  });

  describe('filtering a Location collection', function () {
    beforeEach(function () {
      this.locations = new Locations();
      this.fixture = this.fixtures.Locations.valid;

      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          this.locations.url(),
          this.validResponse(this.fixture)
      );
    });

    afterEach(function () {
      this.server.restore();
    });

    it('byCampus should return all by campus', function () {
      this.locations.fetch();
      this.server.respond();

      var subCollection = this.locations.byCampus('Frescati');
      expect(subCollection.size()).toEqual(3);
    });

    it('byType should return all by type', function () {
      this.locations.fetch();
      this.server.respond();

      var subCollection = this.locations.byType('hörsal');
      expect(subCollection.size()).toEqual(1);
    });

    it('byCampusAndType should return all by campus and type', function () {
      this.locations.fetch();
      this.server.respond();

      var types = [];
      types.push('parkering');
      var subCollection = this.locations.byCampusAndType('Frescati', types);
      expect(subCollection.size()).toEqual(2);
    });
  });
});

describe('LocationSearchResult collection', function () {
  describe('creating an empty collection', function () {
    beforeEach(function () {
      this.locationSearchResults = new LocationSearchResult();
    });

    it('should have Location for model', function () {
      expect(this.locationSearchResults.model).toBe(Location);
    });

    it('should have a url pointing at broker geo api', function () {
      expect(this.locationSearchResults.url()).toMatch(/http:\/\/.+\.su\.se\/geo\/.+/);
    });
  });

  describe('fetching a collection of locationSearchResults', function () {
    beforeEach(function () {
      this.locationSearchResults = new LocationSearchResult();
      this.fixture = this.fixtures.Locations.valid;

      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          this.locationSearchResults.url(),
          this.validResponse(this.fixture)
      );
    });

    afterEach(function () {
      this.server.restore();
    });

    it('should make a correct request', function () {
      this.locationSearchResults.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toMatch(/.*\/search/);
    });

    it('should return all locations', function () {
      this.locationSearchResults.fetch();
      this.server.respond();
      expect(this.locationSearchResults.length).toEqual(4);
    });

    it('should override defaults', function () {
      this.locationSearchResults.fetch();
      this.server.respond();
      var firstLocation = this.locationSearchResults.get(1);
      expect(firstLocation.get('id')).toEqual(1);
      expect(firstLocation.get('campus')).toEqual('Frescati');
      expect(firstLocation.get('type')).toEqual('parkering');
      expect(firstLocation.get('subType')).toEqual('mc');
      expect(firstLocation.get('shape')).toEqual('line');
      expect(firstLocation.get('text')).toEqual('Foobar');
      expect(firstLocation.get('coords')[0].length).toEqual(2);
      expect(firstLocation.get('coords')[0]).toContain(59.00);
      expect(firstLocation.get('coords')[0]).toContain(18.00);
      expect(firstLocation.get('directionAware')).toBeFalsy();
    });
  });

});


describe('Map model', function () {
  describe('when creating a new map model', function () {
    beforeEach(function () {
      this.model = new MapModel();
    });

    it('should not have a currentPosition', function () {
      expect(this.model.get('currentPosition')).toBeNull();
    });

    it('should be able to set locations as google LatLng', function () {
      this.model.setLocation(40, 50);

      expect(this.model.get('location').lat()).toEqual(40);
      expect(this.model.get('location').lng()).toEqual(50);
    });
  });
});


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

    this.view = new MapView({el: $('#map_canvas')});
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
      this.view = new MapView({el: $('#map_canvas')});
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

    this.view = new AppView({el: $('#page-map'), title: "foobar"});
  });

  afterEach(function () {
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

describe('Autocomplete model', function () {
  describe('when creating an empty autocomplete', function () {
    beforeEach(function () {
      this.auto = new Autocomplete();
    });

    it('should have id 0', function () {
      expect(this.auto.get('id')).toEqual(0);
    });

    it('should have name "unknown"', function () {
      expect(this.auto.get('name')).toEqual('unknown');
    });
  });

  describe('when creating a autocomplete model', function () {
    beforeEach(function () {
      this.auto = new Autocomplete({
        id: 1,
        name: "foo"
      });
    });

    it('i should get the values i set', function () {
      expect(this.auto.get('id')).toEqual(1);
      expect(this.auto.get('name')).toEqual('foo');
    });
  });
});

describe('Autocomplete collection', function () {
  describe('creating an empty collection', function () {
    beforeEach(function () {
      this.autos = new Autocompletes();
    });

    it('should have Autocomplete for model', function () {
      expect(this.autos.model).toBe(Autocomplete);
    });

    it('should have a url pointing at broker geo api', function () {
      expect(this.autos.url()).toMatch(/http:\/\/.+\.su\.se\/geo\/.+/);
    });

    it('should have a empty _prevSync map', function () {
      expect(this.autos._prevSync).toMatch({});
    });
  });

  describe('fetching a collection of results', function () {
    beforeEach(function () {
      this.autos = new Autocompletes();
      this.fixture = this.fixtures.Autocompletes.valid;

      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          this.autos.url(),
          this.validResponse(this.fixture)
      );
    });

    afterEach(function () {
      this.server.restore();
    });

    it('should make a correct request', function () {
      this.autos.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toMatch(/.*\/search/);
    });

    it('should return all results', function () {
      var self = this;
      runs(function () {
        self.autos.fetch();
        self.server.respond();
      });

      waitsFor(function () {
        return self.autos.length > 0;
      }, "Waiting for returning call", 100);

      runs(function () {
        expect(this.autos.length).toEqual(11);
      });
    });

    it('should override defaults', function () {
      this.autos.fetch();
      this.server.respond();
      var firstAuto = this.autos.get(1);
      expect(firstAuto.get('id')).toEqual(1);
      expect(firstAuto.get('name')).toEqual('Juridiska institutionen');
    });
  });
});

describe('MapRouter', function () {
  describe('after initialization', function () {
    beforeEach(function () {
      this.router = new MapRouter();
    });

    it('should have the correct amount of routes', function () {
      expect(_.size(this.router.routes)).toEqual(2);
    });

    it('*actions route exists & points to default route', function () {
      expect(this.router.routes['*actions']).toEqual('defaultRoute');
    });

    it('static routes exists & points to the correct right function', function () {
      expect(this.router.routes['auditoriums']).toEqual('auditoriums');
    });
  });

  describe('when navigating', function () {
    beforeEach(function () {
      Backbone.history.options = {};
    });

    it("should call dafaultRoute for empty url", function () {
      spyOn(MapRouter.prototype, "defaultRoute");
      new MapRouter();

      Backbone.history.loadUrl("/");

      expect(MapRouter.prototype.defaultRoute).toHaveBeenCalled();
    });

    it("should call auditoriums for /auditoriums", function () {
      spyOn(MapRouter.prototype, "auditoriums");
      new MapRouter();

      Backbone.history.loadUrl("auditoriums");

      expect(MapRouter.prototype.auditoriums).toHaveBeenCalled();
    });
  });
});
