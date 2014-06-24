/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

describe('MapRouter', function () {
  describe('after initialization', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();
      i18n.init({resGetPath: '../../i18n/en.json'});
    });

    it('should have the correct amount of routes', function () {
      expect(_.size(this.router.routes)).toEqual(7);
    });

    it('*actions route exists & points to default route', function () {
      expect(this.router.routes['*actions']).toEqual('defaultRoute');
    });

    it('static routes exists & points to the correct function', function () {
      expect(this.router.routes.auditoriums).toEqual('auditoriums');
      expect(this.router.routes.computerLabs).toEqual('computerLabs');
    });
  });

  describe('when navigating', function () {
    beforeEach(function () {
      Backbone.history.options = {};
    });

    it("should call defaultRoute for empty url", function () {
      spyOn(suApp.router.MapRouter.prototype, "defaultRoute");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("/");

      expect(suApp.router.MapRouter.prototype.defaultRoute).toHaveBeenCalled();
    });

    it("should call auditoriums for /auditoriums", function () {
      spyOn(suApp.router.MapRouter.prototype, "auditoriums");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("auditoriums");

      expect(suApp.router.MapRouter.prototype.auditoriums).toHaveBeenCalled();
    });

    it("should call buildings for /buildings", function () {
      spyOn(suApp.router.MapRouter.prototype, "buildings");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("buildings");

      expect(suApp.router.MapRouter.prototype.buildings).toHaveBeenCalled();
    });

    it("should call buildings for /parkingspaces", function () {
      spyOn(suApp.router.MapRouter.prototype, "parkingspaces");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("parkingspaces");

      expect(suApp.router.MapRouter.prototype.parkingspaces).toHaveBeenCalled();
    });

    it("should call buildings for /departments", function () {
      spyOn(suApp.router.MapRouter.prototype, "departments");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("departments");

      expect(suApp.router.MapRouter.prototype.departments).toHaveBeenCalled();
    });

    it("should call computerLabs for /computerLabs", function () {
      spyOn(suApp.router.MapRouter.prototype, "computerLabs");
      this.router = new suApp.router.MapRouter();

      Backbone.history.loadUrl("computerLabs");

      expect(suApp.router.MapRouter.prototype.computerLabs).toHaveBeenCalled();
    });
  });

  describe('when choosing defaultRoute', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
    });

    it("should initialize an AppView", function () {
      this.router.defaultRoute('foo');

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });
  });

  describe('when choosing computer labs', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.computerLabs();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.computerLabs();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.computerLabs();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'computerLabs'", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["computerlab"]);
      });

      this.router.computerLabs();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(i18n.t(options.title)).toEqual("map.titles.computerlabs");
      });

      this.router.computerLabs();
    });
  });

  describe('when choosing auditoriums', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.auditoriums();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.auditoriums();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.auditoriums();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'auditorium'", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["auditorium"]);
      });

      this.router.auditoriums();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("map.titles.auditoriums");
      });

      this.router.auditoriums();
    });
  });

  describe('when choosing buildings', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.buildings();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.buildings();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.buildings();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types ['building', 'entrance', 'elevator', 'toilet'] and nonVisibleTypes ['entrance', 'elevator', 'toilet']", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["building", "entrance", "elevator", "toilet"]);
        expect(options.model.get('nonVisibleTypes')).toEqual(["entrance", "elevator", "toilet"]);
      });

      this.router.buildings();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("map.titles.buildings");
      });

      this.router.buildings();
    });

    it("should initialize an AppView with menu=true", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('menu')).toBeTruthy();
      });

      this.router.buildings();
    });
  });

  describe('when choosing parkingspaces', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.parkingspaces();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.parkingspaces();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.parkingspaces();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'auditorium'", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["parking", "handicap_parking", 'entrance']);
      });

      this.router.parkingspaces();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("map.titles.parking");
      });

      this.router.parkingspaces();
    });

    it("should call handleParkingspaceLocationsReset on locations reset", function () {
      spyOn(suApp.model, 'AppModel');
      spyOn(this.router, 'handleParkingspaceLocationsReset');

      var locations = new suApp.collection.Locations();
      var appModel = new suApp.model.AppModel();
      appModel.locations = locations;

      suApp.model.AppModel.andCallFake(function (options) {
        return appModel;
      });

      this.router.parkingspaces();
      locations.trigger('reset');

      expect(this.router.handleParkingspaceLocationsReset).toHaveBeenCalled();
    });
  });

  describe('when choosing departments', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.departments();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.departments();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.departments();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'auditorium'", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["organization"]);
      });

      this.router.departments();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("map.titles.departments");
      });

      this.router.departments();
    });
  });

  describe('when handling parkingspace marker visibility', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();
    });

    it("should set handicap adapted locations visible", function () {
      var locations = new suApp.collection.Locations(this.fixtures.Locations.valid);
      var location = new suApp.model.Location({
        name: 'Entre 1',
        type: 'entrance',
        handicapAdapted: true,
        visible: false
      });
      locations.add([location]);

      this.router.handleParkingspaceMarkerVisibility(locations, true);

      expect(location.isVisible()).toBeTruthy();
    });

    it("should set handicap adapted locations invisible", function () {
      var locations = new suApp.collection.Locations(this.fixtures.Locations.valid);
      var location = new suApp.model.Location({
        name: 'Entre 1',
        type: 'entrance',
        handicapAdapted: true,
        visible: true
      });
      locations.add([location]);

      this.router.handleParkingspaceMarkerVisibility(locations, false);

      expect(location.isVisible()).toBeFalsy();
    });
  });

  describe('when handling parkingspace locations reset', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();
    });

    it("should set zoomSensitive=true on the app model", function () {
      spyOn(suApp.view.AppView.prototype, "initialize");
      var appModel = new suApp.model.AppModel();
      var appView = new suApp.view.AppView();

      this.router.handleParkingspaceLocationsReset(appView, appModel);

      expect(appModel.get('zoomSensitive')).toBeTruthy();
    });

    it("should attach a event trigger on the 'clicked' event on parking & handicap_parking models", function () {
      spyOn(suApp.view.AppView.prototype, "initialize");
      var location = new suApp.model.Location({
        type: 'parking'
      });
      var locations = new suApp.collection.Locations();
      locations.add([location]);

      var appModel = new suApp.model.AppModel();
      appModel.locations = locations;
      var appView = new suApp.view.AppView();

      var checkCollection = false;
      var checkVisible = false;
      appView.on('toggleMarkerVisibility', function (collection, visible) {
        checkCollection = (collection === locations);
        checkVisible = visible;
      });

      this.router.handleParkingspaceLocationsReset(appView, appModel);

      location.trigger('clicked');

      expect(appModel.get('zoomSensitive')).toBeFalsy();
      expect(checkCollection).toBeTruthy();
      expect(checkVisible).toBeTruthy();
    });
  });

  describe('when choosing resturants', function () {
    beforeEach(function () {
      this.router = new suApp.router.MapRouter();

      spyOn(suApp.view.AppView.prototype, "initialize");
      spyOn(suApp.view.AppView.prototype, "render");
      spyOn(suApp.view.AppView.prototype, "updateLocations");
      spyOn(suApp.collection.Campuses.prototype, "fetch");
    });

    it("should initialize an AppView", function () {
      this.router.restaurants();

      expect(suApp.view.AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.restaurants();

      expect(suApp.view.AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.restaurants();

      expect(suApp.view.AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'resturant'", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["restaurant"]);
      });

      this.router.restaurants();
    });

    it("should initialize an AppView with correct title", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("map.titles.restaurants");
      });

      this.router.restaurants();
    });

    it("should set filterByCampus in app model", function () {
      suApp.view.AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('filterByCampus')).toBeTruthy();
      });

      this.router.restaurants();
    });
  });
});
