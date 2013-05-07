/**
 * Tests for the StartView
 */

describe('Start view', function () {
  beforeEach(function () {
    $('#stage').append("<a id='sisulink' href='http://sisu.it.su.se'>sisu</a>");
    this.view = new StartView({el: $('#stage')});
  });

  describe('on deviceready event', function () {
    it('should hide splash screen', function () {
      spyOn(navigator.splashscreen, 'hide');

      $(document).trigger('deviceready');

      expect(navigator.splashscreen.hide).toHaveBeenCalled();
    });
  });

  describe('on sisu link click event', function () {
    it('should call GAPlugin.trackPage', function () {
      spyOn(window.plugins.gaPlugin, 'trackPage');

      $('#sisulink').trigger('click');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, 'http://sisu.it.su.se');
    });
  });
});
