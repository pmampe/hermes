describe('Line location view', function () {
  describe('initializing', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "initialize");
    });

    it('should call GenericLocationView.initialize', function () {
      this.view = new LineLocationView({
        model: new Location()
      });

      expect(GenericLocationView.prototype.initialize).toHaveBeenCalled();
    });

    it('should create a google.Maps.Polyline', function () {
      spyOn(google.maps, 'Polyline');

      this.view = new LineLocationView({
        model: new Location()
      });

      expect(google.maps.Polyline).toHaveBeenCalledWith({
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#00ff00",
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
      spyOn(GenericLocationView.prototype, "initialize");
    });

    it('should call marker.setPath', function () {
      this.view = new LineLocationView({
        model: new Location()
      });
      spyOn(this.view.marker, 'setPath');

      this.view.updatePosition();

      expect(this.view.marker.setPath).toHaveBeenCalledWith(this.view.model.getGPoints());
    });
  });
});
