/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Tests for the StartView
 */

describe('Start view', function () {
  beforeEach(function () {
    $('#stage').append("<a id='sisulink' href='http://sisu.it.su.se' target='inAppBrowser'>sisu</a>");
    this.view = new suApp.view.StartView({el: $('#stage')});
  });

  describe('on deviceready event', function () {
    it('should hide splash screen', function () {
      runs(function () {
        spyOn(navigator.splashscreen, 'hide');
        suApp.config.core.splashscreen.timeout = 1;
        $(document).trigger('deviceready');
      });

      helper.delay(10, function () {
        expect(navigator.splashscreen.hide).toHaveBeenCalled();
      });
    });
    it('Should set StatusBar.overlaysWebView to false', function() {
      spyOn(window.plugins.StatusBar, 'overlaysWebView');
      window.plugins.StatusBar.overlaysWebView(false);
      expect(window.plugins.StatusBar.overlaysWebView).toHaveBeenCalledWith(false);
    });
  });

  describe('on sisu link click event', function () {
    it('should call GAPlugin.trackPage', function () {
      spyOn(window.plugins.gaPlugin, 'trackPage');

      $('#sisulink').trigger('click');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, 'start.sisu.link');
    });
  });

  describe('on off event', function () {
    it('should remove handler for the view', function () {
      spyOn(Backbone.View.prototype, 'remove');

      $(document).trigger('deviceready');

      this.view.remove();
      expect(Backbone.View.prototype.remove).toHaveBeenCalled();
    });
  });
});
