describe('Main', function () {
  describe('startingMapModule', function () {
    beforeEach(function () {
      new MapRouter(); //Construct a MapRouter to get the Backbone.history inited.
      spyOn(window, 'MapRouter');
      spyOn(Backbone.history, 'start');
    });

    it('should create a MapRouter', function () {
      startMapModule();
      expect(window.MapRouter).toHaveBeenCalled();
    });

    it('should start Backbone history', function () {
      startMapModule();
      expect(Backbone.history.start).toHaveBeenCalled();
    });
  });
});
