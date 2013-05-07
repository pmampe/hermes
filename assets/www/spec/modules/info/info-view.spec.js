/**
 * Tests for the InfoView
 */

describe('Info view', function () {
  beforeEach(function () {
    this.view = new InfoView();
  });

  describe('on deviceready event', function () {
    it('should call trackPage on GAPlugin for correct page', function () {
      spyOn(window.plugins.gaPlugin, 'trackPage');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, "accessibility/index.html");
    });
  });
});
