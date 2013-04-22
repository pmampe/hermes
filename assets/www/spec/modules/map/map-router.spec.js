describe('MapRouter', function () {
  describe('after initialization', function () {
    beforeEach(function () {
      this.router = new MapRouter();
    });

    it('should have the correct amount of routes', function () {
      expect(_.size(this.router.routes)).toEqual(6);
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
      spyOn(MapRouter.prototype, "defaultRoute");
      new MapRouter();

      Backbone.history.loadUrl("/");

      expect(MapRouter.prototype.defaultRoute).toHaveBeenCalled();
    });

    it("should call auditoriums for /auditoriums", function () {
      spyOn(MapRouter.prototype, "auditoriums");
      new MapRouter();

      Backbone.history.loadUrl("auditoriums");

      expect(MapRouter.prototype.auditoriums).toHaveBeenCalled();
    });

    it("should call buildings for /buildings", function () {
      spyOn(MapRouter.prototype, "buildings");
      new MapRouter();

      Backbone.history.loadUrl("buildings");

      expect(MapRouter.prototype.buildings).toHaveBeenCalled();
    });

    it("should call buildings for /parkingspaces", function () {
      spyOn(MapRouter.prototype, "parkingspaces");
      new MapRouter();

      Backbone.history.loadUrl("parkingspaces");

      expect(MapRouter.prototype.parkingspaces).toHaveBeenCalled();
    });

    it("should call buildings for /departments", function () {
      spyOn(MapRouter.prototype, "departments");
      new MapRouter();

      Backbone.history.loadUrl("departments");

      expect(MapRouter.prototype.departments).toHaveBeenCalled();
    });

    it("should call computerLabs for /computerLabs", function () {
      spyOn(MapRouter.prototype, "computerLabs");
      new MapRouter();

      Backbone.history.loadUrl("computerLabs");

      expect(MapRouter.prototype.computerLabs).toHaveBeenCalled();
    });
  });

  describe('when choosing defaultRoute', function () {
    beforeEach(function () {
      this.router = new MapRouter();

      spyOn(AppView.prototype, "initialize");
      spyOn(AppView.prototype, "render");
    });

    it("should initialize an AppView", function () {
      this.router.defaultRoute('foo');

      expect(AppView.prototype.initialize).toHaveBeenCalled();
      expect(AppView.prototype.render).toHaveBeenCalled();
    });
  });

  describe('when choosing computer labs', function () {
    beforeEach(function () {
      this.router = new MapRouter();

      spyOn(AppView.prototype, "initialize");
      spyOn(AppView.prototype, "render");
      spyOn(AppView.prototype, "updateLocations");
    });

    it("should initialize an AppView", function () {
      this.router.computerLabs();

      expect(AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.computerLabs();

      expect(AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.computerLabs();

      expect(AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'computerLabs'", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["computer_labs"]);
      });

      this.router.computerLabs();
    });

    it("should initialize an AppView with correct title", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("Datorsalar");
      });

      this.router.computerLabs();
    });
  });

  describe('when choosing auditoriums', function () {
    beforeEach(function () {
      this.router = new MapRouter();

      spyOn(AppView.prototype, "initialize");
      spyOn(AppView.prototype, "render");
      spyOn(AppView.prototype, "updateLocations");
    });

    it("should initialize an AppView", function () {
      this.router.auditoriums();

      expect(AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.auditoriums();

      expect(AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.auditoriums();

      expect(AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'auditorium'", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["auditorium"]);
      });

      this.router.auditoriums();
    });

    it("should initialize an AppView with correct title", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("Hör- & skrivsalar");
      });

      this.router.auditoriums();
    });
  });

  describe('when choosing buildings', function () {
    beforeEach(function () {
      this.router = new MapRouter();

      spyOn(AppView.prototype, "initialize");
      spyOn(AppView.prototype, "render");
      spyOn(AppView.prototype, "updateLocations");
    });

    it("should initialize an AppView", function () {
      this.router.buildings();

      expect(AppView.prototype.initialize).toHaveBeenCalled();
    });

    it("should render an AppView", function () {
      this.router.buildings();

      expect(AppView.prototype.render).toHaveBeenCalled();
    });

    it("should update locations", function () {
      this.router.buildings();

      expect(AppView.prototype.updateLocations).toHaveBeenCalled();
    });

    it("should initialize an AppView with types 'building'", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('types')).toEqual(["building"]);
      });

      this.router.buildings();
    });

    it("should initialize an AppView with correct title", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.title).toEqual("Hus");
      });

      this.router.buildings();
    });

    it("should initialize an AppView with menu=true", function () {
      AppView.prototype.initialize.andCallFake(function (options) {
        expect(options.model.get('menu')).toBeTruthy();
      });

      this.router.buildings();
    });
  });
});
