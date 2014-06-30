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

describe('Line location view', function () {
  describe('initializing', function () {
    beforeEach(function () {
      spyOn(suApp.view.GenericLocationView.prototype, "initialize");
    });

    it('should call GenericLocationView.initialize', function () {
      this.view = new suApp.view.LineLocationView({
        model: new suApp.model.Location()
      });

      expect(suApp.view.GenericLocationView.prototype.initialize).toHaveBeenCalled();
    });

    it('should create a google.Maps.Polyline', function () {
      spyOn(google.maps, 'Polyline');

      this.view = new suApp.view.LineLocationView({
        model: new suApp.model.Location()
      });

      expect(google.maps.Polyline).toHaveBeenCalledWith({
        strokeColor: "#002F5F",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#A1D8E0",
        fillOpacity: 0.35,
        visible: true,
        poiType: this.view.model.getPoiType(),
        map: null,
        path: this.view.model.getGPoints()
      });
    });
  });

  describe('updatePosition', function () {
    beforeEach(function () {
      spyOn(suApp.view.GenericLocationView.prototype, "initialize");
    });

    it('should call marker.setPath', function () {
      this.view = new suApp.view.LineLocationView({
        model: new suApp.model.Location()
      });
      spyOn(this.view.marker, 'setPath');

      this.view.updatePosition();

      expect(this.view.marker.setPath).toHaveBeenCalledWith(this.view.model.getGPoints());
    });
  });
});
