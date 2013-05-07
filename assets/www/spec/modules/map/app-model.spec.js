/**
 * Tests for the AppModel
 */

describe('App model', function () {
  describe('instantiation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Campuses.prototype.url(),
          this.validResponse(this.fixtures.Campuses.valid)
      );
      this.server.autoRespond = true;
    });

    it('should fetch campuses when menu==true', function () {
      var self = this;
      runs(function () {
        this.model = new AppModel({menu: true});
        self.server.respond();
      });

      waitsFor(function () {
        return self.model.campuses.length > 0;
      });

      runs(function () {
        expect(self.model.campuses).toBeDefined();
        expect(self.model.campuses.length).toEqual(2);
      });
    });
  });

  describe('when fetching locations', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Locations.prototype.url(),
          this.validResponse(this.fixtures.Locations.valid)
      );
    });

    it('should set visible to false for nonVisibleTypes', function () {
      var self = this;
      runs(function () {
        this.model = new AppModel({
          nonVisibleTypes: ["entrance"]
        });
        this.model.fetchLocations();
        self.server.respond();
      });

      waitsFor(function () {
        return self.model.locations.length > 0;
      });

      runs(function () {
        expect(self.model.locations.filter(function (location) {
          return location.isVisible();
        }).length).toBe(5);
        expect(self.model.locations.filter(function (location) {
          return !location.isVisible();
        }).length).toBe(1);
      });
    });

    it('should send alert on error', function () {
      spyOn(window, 'alert');

      this.xhr = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function (xhr) {
        throw "ERROR";
      };

      this.model = new AppModel();
      this.model.fetchLocations();

      expect(window.alert).toHaveBeenCalled();
      this.xhr.restore();
    });
  });

  describe('when showing nonvisible for location by relation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Locations.prototype.url(),
          this.validResponse(this.fixtures.Locations.valid)
      );
      //this.server.autoRespond = true;
      this.model = new AppModel({
        nonVisibleTypes: ["entrance"]
      });
      this.model.fetchLocations();
      this.server.respond();
    });

    it('should set visible to true on related locations', function () {
      expect(this.model.locations.get(6).isVisible()).toBeFalsy();
      this.model.showNonVisibleForLocationByRelation(this.model.locations.get(5), "building", ["entrance"]);
      expect(this.model.locations.get(6).isVisible()).toBeTruthy();
    });

    it('should change showingNonVisibleForLocation and trigger change', function () {
      var wasTriggered = false;
      this.model.on('change:showingNonVisibleForLocation', function () {
        wasTriggered = true;
      });
      var obj = {
        location: this.model.locations.get(5),
        relatedBy: "building",
        types: ["entrance"]
      };
      this.model.showNonVisibleForLocationByRelation(obj.location, obj.relatedBy, obj.types);
      expect(wasTriggered).toBeTruthy();
      expect(_.isEqual(this.model.get('showingNonVisibleForLocation'), obj)).toBeTruthy();
    });
  });

  describe('when getting filter collection', function () {
    beforeEach(function () {
      this.model = new AppModel();
      this.model.campuses = new Campuses();
      this.model.locations = new Locations();
    });

    it('should return campuses when filterByCampus === true', function () {
      this.model.set('filterByCampus', true);

      expect(this.model.getFilterCollection()).toEqual(this.model.campuses);
    });

    it('should return locations when filterByCampus === false', function () {
      this.model.set('filterByCampus', false);

      expect(this.model.getFilterCollection()).toEqual(this.model.locations);
    });
  });
});
