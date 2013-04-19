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

    it('should have a default mapPosition', function () {
      expect(this.model.get('mapPosition')).toBeDefined();
      expect(this.model.get('mapPosition').lat()).toBeDefined();
      expect(this.model.get('mapPosition').lng()).toBeDefined();
    });

    it('should have a default zoom', function () {
      expect(this.model.get('zoom')).toBeDefined();
    });
  });

  describe('setMapPosition', function () {
    it('should update the mapPosition', function () {
      this.model = new MapModel({ mapPosition: new google.maps.LatLng(0, 0) });
      this.model.setMapPosition(10, 20);

      expect(this.model.get('mapPosition').lat()).toEqual(10);
      expect(this.model.get('mapPosition').lng()).toEqual(20);
    });
  });

  describe('setZoom', function () {
    it('should update the zoom', function () {
      this.model = new MapModel();
      this.model.setZoom(20);

      expect(this.model.get('zoom')).toEqual(20);
    });
  });
});
