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
    $.mobile.loadPage("#page-map", {prefetch: "true"});

    this.view = new suApp.view.MapView({
      el: $('#map_canvas'),
      model: new suApp.model.MapModel(),
      appModel: new suApp.model.AppModel()
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

    it('should listen for zoom events', function () {
      spyOn(google.maps.event, 'addListener');
      var view = new suApp.view.MapView({
        el: $('#map_canvas'),
        model: new suApp.model.MapModel(),
        appModel: new suApp.model.AppModel()
      });

      expect(google.maps.event.addListener).toHaveBeenCalledWith(view.map, 'zoom_changed', view.handleMapZoomChange);
    });
  });

  describe('resize', function () {
    beforeEach(function () {
      // We need to create a new view since we need to attach the spy first
      spyOn(suApp.view.MapView.prototype, 'resize');
      this.view = new suApp.view.MapView({
        el: $('#map_canvas'),
        model: new suApp.model.MapModel(),
        appModel: new suApp.model.AppModel()
      });
    });

    it('should react to window resize events', function () {
      $(document).trigger('resize');
      expect(suApp.view.MapView.prototype.resize.calls.length).toBe(1);
    });

    it('should remove the event handler from document.resize when the view is removed', function () {
      this.view.remove();
      $(document).trigger('resize');
      expect(suApp.view.MapView.prototype.resize.calls.length).toBe(0);
    });
  });

  describe('getDirections', function () {
    describe('Testing GPS error message', function () {
      beforeEach(function () {
        this.view.currentPositionPoint = 'undefined';
        spyOn(window, 'showError');
        device = {};
      });

      it('Should display the correct message for Android', function () {
        device.platform = 'Android';
        this.view.getDirections("walking", 'destination');
        expect(window.showError).toHaveBeenCalledWith(i18n.t("error.noGPSAndroid"));
      });

      it('Should display the correct message for iOS', function () {
        device.platform = 'iOS';
        this.view.getDirections("walking", 'destination');
        expect(window.showError).toHaveBeenCalledWith(i18n.t("error.noGPSiOS"));
      });

      it('Should display generic message for other devices', function () {
        device.platform = '';
        this.view.getDirections("walking", 'destination');
        expect(window.showError).toHaveBeenCalledWith(i18n.t("error.noGPS"));
      });
    });

    it('should use origin from current position', function () {
      this.view.createPositionMarker();
      var origOk = false;
      this.view.$el.gmap = function (command, options) {
        if (options.origin === 'foobar') {
          origOk = true;
        }
      };

      this.view.getDirections("walking", 'destination');
      this.view.getDirections("bicycling", 'destination');
      this.view.getDirections("driving", 'destination');
      this.view.getDirections("publicTransp", 'destination');
    });
  });

  describe('keyboard', function () {
    it('keyboardvisible should be false by default', function () {
      expect(this.view.keyboardVisible).toBeFalsy();
    });

    it('showkeyboard should set keyboardvisible variable == true', function () {
      $(document).trigger('showkeyboard');

      expect(this.view.keyboardVisible).toBeTruthy();
    });

    it('hidekeyboard should set keyboardvisible variable == false', function () {
      this.view.keyboardVisible = true;
      $(document).trigger('hidekeyboard');

      var self = this;
      helper.delay(200, function () {
        expect(self.view.keyboardVisible).toBeFalsy();
      });
    });
  });

  describe('zoom', function () {
    it('updateMapZoom should set zoom on map', function () {
      spyOn(this.view.map, 'setZoom');
      this.view.model.attributes.zoom = 1;

      this.view.updateMapZoom();

      expect(this.view.map.setZoom).toHaveBeenCalledWith(1);
    });

    it('handleMapZoomChange should trigger zoom_changed on MapView', function () {
      spyOn(this.view, 'trigger');
      spyOn(this.view.map, 'getZoom').andReturn(1);

      this.view.handleMapZoomChange();

      expect(this.view.trigger).toHaveBeenCalledWith('zoom_changed', 1);
    });
  });

  describe('current position', function () {
    describe('updating current position', function () {
      it('should create position marker & render it', function () {
        this.view.currentPositionPoint = undefined;
        var marker = new suApp.view.PointLocationView({model: new suApp.model.Location({})});
        var self = this;
        spyOn(this.view, 'createPositionMarker').andCallFake(function () {
          self.view.currentPositionPoint = marker;
        });
        spyOn(marker, 'render');
        spyOn(marker.model, 'set');

        this.view.updateCurrentPosition({'coords': {'latitude': 1, 'longitude': 2}});

        expect(this.view.createPositionMarker).toHaveBeenCalled();
        expect(marker.render).toHaveBeenCalled();
        expect(marker.model.set).toHaveBeenCalledWith('coords', [
          [1, 2]
        ]);
      });
    });
  });

  describe('markers', function () {
    describe('removeAllMarkers', function () {
      beforeEach(function () {
        var self = this;
        _.each(this.fixtures.Locations.valid, function (fixture) {
          self.view.pointViews.push(jasmine.createSpyObj(fixture.name, ['remove']));
        });
      });

      it('should call "remove" for all markers', function () {
        this.view.removeAllMarkers();

        _.each(this.view.pointViews, function (view) {
          expect(view.remove).toHaveBeenCalled();
        });
      });

      it('should reset pointViews', function () {
        this.view.removeAllMarkers();

        expect(this.view.pointViews).toEqual([]);
      });
    });
  });
});
