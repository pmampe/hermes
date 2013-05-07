/**
 * Tests for the StartView
 */

describe('Start view', function () {
  beforeEach(function () {
    this.view = new StartView();
  });

  describe('on deviceready event', function () {
    it('should hide splash screen', function () {
      spyOn(navigator.splashscreen, 'hide');

      $(document).trigger('deviceready');

      expect(navigator.splashscreen.hide).toHaveBeenCalled();
    });
  });
});
