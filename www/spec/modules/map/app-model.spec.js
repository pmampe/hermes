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

/**
 * Tests for the AppModel
 */

describe('App model', function () {
  describe('instantiation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          suApp.collection.Campuses.prototype.url(),
          this.validResponse(this.fixtures.Campuses.valid)
      );
      this.server.autoRespond = true;
    });

    it('should fetch campuses when menu==true', function () {
      var self = this;
      runs(function () {
        this.model = new suApp.model.AppModel({menu: true});
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
          suApp.collection.Locations.prototype.url(),
          this.validResponse(this.fixtures.Locations.valid)
      );
    });

    it('should set visible to false for nonVisibleTypes', function () {
      var self = this;
      runs(function () {
        this.model = new suApp.model.AppModel({
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

    it('should display error message popup on error', function () {
      spyOn(window, 'showError');

      this.xhr = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function (xhr) {
        throw "ERROR";
      };

      this.model = new suApp.model.AppModel();
      this.model.fetchLocations();

      expect(window.showError).toHaveBeenCalled();
      this.xhr.restore();
    });
  });

  describe('when showing nonvisible for location by relation', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          suApp.collection.Locations.prototype.url(),
          this.validResponse(this.fixtures.Locations.valid)
      );
      //this.server.autoRespond = true;
      this.model = new suApp.model.AppModel({
        nonVisibleTypes: ["entrance"]
      });
      this.model.fetchLocations();
      this.server.respond();
    });

    it('should set visible to true on related locations', function () {
      expect(this.model.locations.get(6).isVisible()).toBeFalsy();
      this.model.handleVisibilityForLocationByRelation(this.model.locations.get(5), "building", ["entrance"], true);
      expect(this.model.locations.get(6).isVisible()).toBeTruthy();
    });

    it('should set visible to false on related locations when calling with false', function () {
      this.model.locations.get(6).attributes.visible = true;
      expect(this.model.locations.get(6).isVisible()).toBeTruthy();
      this.model.handleVisibilityForLocationByRelation(this.model.locations.get(5), "building", ["entrance"], false);
      expect(this.model.locations.get(6).isVisible()).toBeFalsy();
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
      this.model.handleVisibilityForLocationByRelation(obj.location, obj.relatedBy, obj.types, true);
      expect(wasTriggered).toBeTruthy();
      expect(_.isEqual(this.model.get('showingNonVisibleForLocation'), obj)).toBeTruthy();
    });
  });

  describe('when getting filter collection', function () {
    beforeEach(function () {
      this.model = new suApp.model.AppModel();
      this.model.campuses = new suApp.collection.Campuses();
      this.model.locations = new suApp.collection.Locations();
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

  describe('when showing visible types', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          suApp.collection.Locations.prototype.url(),
          this.validResponse(this.fixtures.Locations.valid)
      );
      this.model = new suApp.model.AppModel({
        nonVisibleTypes: []
      });
      this.model.fetchLocations();
      this.server.respond();
    });

    it('should set visible true for all visible types', function () {
      this.model.locations.invoke('set', 'visible', false);
      this.model.showVisibleTypes();

      this.model.locations.each(function (location) {
        expect(location.get('visible')).toBeTruthy();
      });
    });
  });

  describe('when hiding models', function () {
    describe('function hideAllModelsExceptOne', function () {
      it('should hide all models except one', function () {
        var model = new suApp.model.AppModel();
        _.each(this.fixtures.Locations.valid, function (location) {
          model.locations.push(new suApp.model.Location(location));
        });
        var visibleModel = model.locations.at(0);

        model.hideAllModelsExceptOne(visibleModel);

        model.locations.each(function (location) {
          if (location == visibleModel) {
            expect(visibleModel.get('visible')).toBeTruthy();
          }
          else {
            expect(location.get('visible')).toBeFalsy();
          }
        });
      });
    });
  });
});
