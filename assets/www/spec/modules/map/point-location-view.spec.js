describe('Line location view', function () {
  describe('initializing', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "initialize");
    });

    it('should call GenericLocationView.initialize', function () {
      this.view = new PointLocationView({
        model: new Location()
      });

      expect(GenericLocationView.prototype.initialize).toHaveBeenCalled();
    });

    it('should create a google.Maps.Point', function () {
      spyOn(google.maps, 'Marker');

      this.view = new PointLocationView({
        model: new Location()
      });

      expect(google.maps.Marker).toHaveBeenCalledWith({
        position: this.view.getPosition({model: this.view.model}),
        poiType: this.view.model.getPoiType(),
        visible: true,
        icon: this.view.model.get('pin'),
        map: null
      });
    });

    it('should create pin from image if hasIcon=true', function () {
      spyOn(google.maps, 'MarkerImage');
      config.map.icon.urlPrefix = 'foo';

      this.view = new PointLocationView({
        model: new Location({ id: 0, hasIcon: true })
      });

      expect(google.maps.MarkerImage).toHaveBeenCalledWith("foo/0", new google.maps.Size(22, 22));
    });
  });

  describe('updatePosition', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "initialize");
    });

    it('should call marker.setPosition', function () {
      this.view = new PointLocationView({
        model: new Location()
      });
      spyOn(this.view.marker, 'setPosition');

      this.view.updatePosition();

      expect(this.view.marker.setPosition).toHaveBeenCalledWith(this.view.model.getGPoints()[0]);
    });
  });

  describe('getPosition', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "initialize");
    });

    it('should return value of options.customizedPosition if supplied', function () {
      this.view = new PointLocationView({
        model: new Location()
      });

      var pos = this.view.getPosition({ customizedPosition: 'foo' });

      expect(pos).toEqual('foo');
    });

    it('should return value of getGPoints if no customizedPosition is supplied', function () {
      this.view = new PointLocationView({
        model: new Location()
      });

      var pos = this.view.getPosition({ model: this.view.model });

      expect(pos).toEqual(this.view.model.getGPoints()[0]);
    });
  });
});
