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

describe('Generic location view', function () {

  describe('opening an info window', function () {
    beforeEach(function () {
      spyOn(suApp.view.GenericLocationView.prototype, "render");

      this.view = new suApp.view.GenericLocationView({
        model: new Backbone.Model()
      });

    });

    it('should open infoWindow and pan to marker', function () {
      this.view.gmap = new google.maps.Map();

      this.anchor = new google.maps.Anchor();

      this.view.infoWindow = new suApp.view.InfoWindowView({
        appModel: new suApp.model.AppModel()
      });

      spyOn(this.view, 'getCenter').andCallFake(function () {
        return 2;
      });
      spyOn(this.view.infoWindow, "open");
      spyOn(this.view.gmap, "panTo");
      spyOn(this.view.gmap, "panBy");

      this.view.openInfoWindow(0, this.anchor);

      expect(this.view.gmap.panTo).toHaveBeenCalled();
      expect(this.view.gmap.panBy).toHaveBeenCalled();
      expect(this.view.infoWindow.open).toHaveBeenCalledWith(0, this.anchor, 2);
    });

  });

  describe('remove', function () {
    beforeEach(function () {
      spyOn(suApp.view.GenericLocationView.prototype, "render");

      this.view = new suApp.view.GenericLocationView({
        model: new Backbone.Model(),
        infoWindow: new suApp.view.InfoWindowView({
          appModel: new suApp.model.AppModel()
        })
      });

    });

    it('should close info window on remove', function () {
      spyOn(this.view.infoWindow, "close");
      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
      };

      this.view.remove();

      expect(this.view.infoWindow.close).toHaveBeenCalled();
    });

    it('should clear map for marker', function () {
      var setMapHasRun = false;

      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
        setMapHasRun = true;
      };

      this.view.remove();

      expect(setMapHasRun).toBeTruthy();
    });

    it('should nullify marker', function () {
      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
      };

      this.view.remove();

      expect(this.view.marker).toBeNull();
    });
  });

  describe('updateVisibility', function () {
    beforeEach(function () {
      suApp.view.GenericLocationView.prototype.render = function () {
      };

      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location(),
        infoWindow: new suApp.view.InfoWindowView({
          appModel: new suApp.model.AppModel()
        })
      });

    });

    it('should set visibility of model on marker', function () {
      this.view.marker = new google.maps.Marker();
      spyOn(this.view.marker, 'setVisible');

      this.view.model.set('visible', true);
      this.view.updateVisibility();
      expect(this.view.marker.setVisible).toHaveBeenCalledWith(true);

      this.view.model.set('visible', false);
      this.view.updateVisibility();
      expect(this.view.marker.setVisible).toHaveBeenCalledWith(false);
    });
  });

  describe('handleMarkerClick', function () {
    beforeEach(function () {
      suApp.view.GenericLocationView.prototype.render = function () {
      };

      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location(),
        infoWindow: new suApp.view.InfoWindowView({
          appModel: new suApp.model.AppModel()
        })
      });

    });

    it('should set trigger the "clicked" event on its model', function () {
      spyOn(this.view, 'openInfoWindow');

      var clicked = false;
      this.view.model.on('clicked', function () {
        clicked = true;
      });

      this.view.handleMarkerClick({latLng: ''});

      expect(clicked).toBeTruthy();
    });

    it('should call openInfoWindow', function () {
      spyOn(this.view, 'openInfoWindow');

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.openInfoWindow).toHaveBeenCalledWith(this.view.model, this.view.marker);
    });

    it('should set destination on infoWindow if directionAware=true', function () {
      spyOn(this.view, 'openInfoWindow');
      spyOn(this.view.infoWindow, 'setDestination');
      this.view.model.set('directionAware', true);

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.infoWindow.setDestination).toHaveBeenCalledWith(this.view.getCenter());
    });

    it('should not set destination on infoWindow if directionAware=false', function () {
      spyOn(this.view, 'openInfoWindow');
      spyOn(this.view.infoWindow, 'setDestination');
      this.view.model.set('directionAware', false);

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.infoWindow.setDestination).not.toHaveBeenCalled();
    });
  });

  describe('getCenter', function () {
    beforeEach(function () {
      suApp.view.GenericLocationView.prototype.render = function () {
      };
    });

    it('should return correct results for point', function () {
      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location({ coords: [
          [10, 10]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(10);
      expect(this.view.getCenter().lng()).toEqual(10);
    });

    it('should return correct results for line', function () {
      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location({ coords: [
          [10, 10],
          [20, 20]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(15);
      expect(this.view.getCenter().lng()).toEqual(15);
    });

    it('should return correct results for polygon', function () {
      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location({ coords: [
          [10, 10],
          [20, 20],
          [10, 20],
          [20, 10]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(15);
      expect(this.view.getCenter().lng()).toEqual(15);
    });

    it('should return -1 for no GPoints', function () {
      this.view = new suApp.view.GenericLocationView({
        model: new suApp.model.Location({ coords: [] })
      });

      expect(this.view.getCenter()).toEqual(-1);
    });
  });
});
