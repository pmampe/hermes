/**
 * Tests for the AppView
 */

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

    var menuPopup = '<div data-role="popup" id="menupopup" data-transition="turn">' +
        '<ul id="menupopupList" data-role="listview" data-inset="true">' +
        '</ul>' +
        '</div>';
    $('#page-map').append(menuPopup);
    $.mobile.loadPage("#page-map");

    this.view = new AppView({el: $('#page-map'), title: "foobar", model: new AppModel()});
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
  });

  describe('instantiation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Campuses.prototype.url(),
          this.validResponse(this.fixtures.Campuses.valid)
      );
      this.server.autoRespond = true;

      this.view.updateLocations = function () {
      };
    });

    afterEach(function () {
      this.server.restore();
    });

    it('should create a div of #page-map', function () {
      expect(this.view.el.nodeName).toEqual("DIV");
      expect(this.view.el.id).toEqual("page-map");
    });

    it('should set this.header from options.header', function () {
      expect(this.view.title).toEqual("foobar");
    });

    it('should create a menu if "menu" is true in model', function () {
      this.view.model.set('menu', true);
      this.view.initialize({title: 'foo'});
      expect(this.view.menuPopupView).toBeDefined();
    });

    it('should not create a menu if "menu" is false in model', function () {
      this.view.model.set('menu', false);
      this.view.initialize({title: 'foo'});
      expect(this.view.menuPopupView).toBeUndefined();
    });

    it('should fetch campuses', function () {
      var self = this;
      runs(function () {
        self.view.model.set('menu', true);
        self.view.initialize({title: 'foo'});
        self.server.respond();
      });

      waitsFor(function () {
        return self.view.campuses.length > 0;
      });

      runs(function () {
        expect(this.view.campuses).toBeDefined();
        expect(this.view.campuses.length).toEqual(2);
      });
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

  describe('call to change campus', function () {
    beforeEach(function () {
      this.view.updateLocations = function () {
      };
    });

    it('sets map position to selected campus', function () {
      spyOn(this.view.mapView.model, "setMapPosition");
      var campus = new Campus(this.fixtures.Campuses.valid[0]);
      this.view.model.set('campus', campus);

      this.view.changeCampus();

      expect(this.view.mapView.model.setMapPosition).toHaveBeenCalledWith(campus.getLat(), campus.getLng());
    });

    it('updates locations', function () {
      spyOn(this.view.mapView, "replacePoints");
      var campus = new Campus(this.fixtures.Campuses.valid[0]);
      this.view.model.set('campus', campus);

      this.view.changeCampus();

      expect(this.view.mapView.replacePoints).toHaveBeenCalled();
    });
  });

  describe('menu', function () {
    it('callback function should set campus', function () {
      this.view.model.set = function (key, val) {
        expect(key).toEqual('campus');
        expect(val).toEqual('foo');
      };

      this.view.menuSelectCallback('foo');
    });
  });
});
