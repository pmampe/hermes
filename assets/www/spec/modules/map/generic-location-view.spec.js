describe('Generic location view', function () {
  describe('opening an info window', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model()
      });

    });

    it('should render infoWindow', function () {
      this.view.infoWindow = new InfoWindow();

      spyOn(this.view.infoWindow, "render");

      this.view.openInfoWindow(0, 1, 2);

      expect(this.view.infoWindow.render).toHaveBeenCalledWith(0, 1, 2);
    });
  });

  describe('remove', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model(),
        infoWindow: new InfoWindow()
      });

    });

    it('should remove info window', function () {
      spyOn(this.view.infoWindow, "remove");
      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
      };

      this.view.remove();

      expect(this.view.infoWindow.remove).toHaveBeenCalled();
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
      GenericLocationView.prototype.render = function () {
      };

      this.view = new GenericLocationView({
        model: new Location(),
        infoWindow: new InfoWindow()
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
});
