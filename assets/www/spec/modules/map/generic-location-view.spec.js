describe('Generic location view', function () {
  describe('opening an info window', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model()
      });

    });

    it('should open infoWindow', function () {
      this.view.infoWindow = new InfoWindowView({
        appModel: new AppModel()
      });

      spyOn(this.view, 'getCenter').andCallFake(function () {
        return 2;
      });
      spyOn(this.view.infoWindow, "open");

      this.view.openInfoWindow(0, 1);

      expect(this.view.infoWindow.open).toHaveBeenCalledWith(0, 1, 2);
    });

    it('should translate info window body', function () {
      this.view.infoWindow = new InfoWindowView({ appModel: new AppModel({text: 'på svenska', textEn: 'in english'})});

      if (this.view.infoWindow.getRootLanguage() == 'sv') {
        var expected = 'på svenska';
      } else {
        var expected = 'in english';
      }
      var text = this.view.infoWindow.getLanguageKey();
      expect(this.view.infoWindow.appModel.get(text)).toEqual(expected);
    });
  });
  describe('remove', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model(),
        infoWindow: new InfoWindowView({
          appModel: new AppModel()
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
      GenericLocationView.prototype.render = function () {
      };

      this.view = new GenericLocationView({
        model: new Location(),
        infoWindow: new InfoWindowView({
          appModel: new AppModel()
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
});
