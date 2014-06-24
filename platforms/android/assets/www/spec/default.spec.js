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

describe('Default-header', function () {

  var testTitle = 'test-title';

  beforeEach(function () {
    this.origTitle = $(document).attr('title');
    $(document).attr('title', testTitle);
    $('#stage').replaceWith('<div data-role="page" id="page" data-header="common/header"></div>');
  });

  afterEach(function () {
    $(document).attr('title', this.origTitle);
    $('#page').replaceWith("<div id='stage'></div>");
    $('div[data-role="popup"]').remove();
  });

  describe('when header is created', function () {
    it('should be inserted first in the page', function () {
      $('[data-role="page"]').append($('<div data-role="content"></div>'));
      $.mobile.loadPage('#page', {prefetch: "true"});
      expect($('[data-role=page] :first-child').data('role')).toBe('header');
    });

    it('should be only one header in page', function () {
      $.mobile.loadPage('#page', {prefetch: "true"});
      $('[data-role="page"]').trigger('pagecreate');
      expect($('[data-role=header]').length).toBe(1);
    });

  });

  describe('using common/header with no options', function () {
    it('should render a header with only title and add class nobuttons', function () {
      $.mobile.loadPage('#page', {prefetch: "true"});

      var $header = $('[data-role=header]');
      expect($header.hasClass("nobuttons")).toBeTruthy();
      expect($header.data("theme")).toBe("a");
      expect($header.find("h1").text()).toBe(testTitle);
    });
  });

  describe('using common/header with option backbutton', function () {
    it('should render a header with title and add a back button', function () {
      $('[data-role="page"]').data("header-options", "backbutton");
      $.mobile.loadPage('#page', {prefetch: "true"});

      var $header = $('[data-role=header]');
      expect($header.data("theme")).toBe("a");
      expect($header.find("h1").text()).toBe(testTitle);
      var $button = $header.find("a");
      expect($button.data("role")).toBe("button");
      expect($button.data("rel")).toBe("back");
      expect($button.hasClass("ui-btn-left")).toBeTruthy();
    });
  });

  describe('using common/header with option homebutton', function () {
    it('should render a header with title and add a home button', function () {
      $('[data-role="page"]').data("header-options", "homebutton");
      $.mobile.loadPage('#page', {prefetch: "true"});

      var $header = $('[data-role=header]');
      expect($header.data("theme")).toBe("a");
      expect($header.find("h1").text()).toBe(testTitle);
      var $button = $header.find("a");
      expect($button.data("role")).toBe("button");
      expect($button.data("icon")).toBe("home");
      expect($button.hasClass("ui-btn-right")).toBeTruthy();
      expect($button.attr("href")).toBe("../index.html");
    });
  });

  describe('using common/header with explicit header-title', function () {
    it('should render a header without fixed position', function () {
      var explicitTitle = "Explicit title";
      $('[data-role="page"]').data("header-title", explicitTitle);
      $.mobile.loadPage('#page', {prefetch: "true"});

      var $header = $('[data-role=header]');
      expect($header.find("h1").text()).toBe(explicitTitle);
    });
  });
});

describe('InAppBrowser link', function () {

  describe('when document contains links with target inAppBrowser', function () {

    beforeEach(function () {
      var html = '<div data-role="page" id="page"><div data-role="content"><a href="testing.html" data-title="title" target="inAppBrowser">test</a></div></div>';
      $('#stage').replaceWith(html);
      $.mobile.loadPage("#page", {prefetch: "true"});
      $.mobile.activePage = $('#page');
    });


    afterEach(function () {
      $('#page').replaceWith("<div id='stage'></div>");
    });

    it('should open link href in the inAppBrowser', function () {
      spyOn(window, "open");

      $("#page").find("a").trigger("click");

      expect(window.open).toHaveBeenCalledWith("testing.html", "_blank", "enableViewportScale=yes,location=yes,closebuttoncaption=common.header.home");
    });

    it('should should track url opened in the inAppBrowser', function () {
      spyOn(plugins.gaPlugin, "trackPage");

      $("#page").find("a").trigger("click");

      expect(plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, "testing.html");
    });
  });
});

describe('Error-dialog', function () {
  describe('when error occurs', function () {
    afterEach(function () {
      $('.ui-popup-screen').remove();
      $('.ui-popup-container').remove();
      $('div[data-role="popup"]').remove();
    });

    it('should present a popup with error message in case of error', function () {
      showError('fel 1');

      var html = $('#errorPopup').html();
      expect(html).toBeDefined();

      var msg = $("#errorPopup").find('span').html().trim();
      expect(msg).toEqual('fel 1');
    });

    it('when pressing "cancel" should close the popup and remove the html', function () {
      showError('fel 2');

      var html = $('#errorPopup').html();
      expect(html).toBeDefined();

      $('#closeErrorDialog').trigger('click');

      var html = $('#errorPopup').html();
      expect(html).toBeUndefined();
    });

    it('error message should be supressed during unload events', function () {
      $(window).trigger('unload');
      showError('fel 1');

      var html = $('#errorPopup').html();
      expect(html).toBeUndefined();

      showError.unSupressErrors();
    });
  });
});

describe('GAPlugin', function () {
  describe('on deviceready event', function () {
    it('should init GAPlugin', function () {
      spyOn(window.plugins.gaPlugin, 'init');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.init).toHaveBeenCalled();
    });

    it('should set account code on init', function () {
      spyOn(window.plugins.gaPlugin, 'init');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.init).toHaveBeenCalledWith(
          null,
          null,
          suApp.config.core.ga.account,
          jasmine.any(Number)
      );
    });

    it('should set max seconds = 10 on init', function () {
      spyOn(window.plugins.gaPlugin, 'init');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.init).toHaveBeenCalledWith(
          null,
          null,
          jasmine.any(String),
          10
      );
    });
  });
});

describe('Click on a .button-grid link', function () {
  beforeEach(function () {
    var html = '<div class="button-grid"><a id="link" href="testing.html">test</a></div>';
    $('#stage').append(html);
  });

  afterEach(function () {
    $('#stage').replaceWith("<div id='stage'></div>");
  });

  it('should make an ajax call', function () {
    spyOn($, 'ajax').andCallFake(function (obj) {
      expect(obj.complete).toBeDefined();
    });

    $("#link").trigger('click');
  });
});
