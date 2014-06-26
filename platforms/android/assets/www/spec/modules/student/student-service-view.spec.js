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
 * Tests for the StudentView
 */

describe('Student view', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='studentservice_page' style='width:200px; height:200px'>" +
        "<div id='studentservice_view' data-role='content'>" +
        "<ul data-role='listview' data-inset='true' class='studentservice-list' id='studentservice-menu'>" +
        "</ul>" +
        "</div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#studentservice_page", {prefetch: "true"});

    this.view = new suApp.view.StudentView({ el: $('#studentservice_page') });
    this.view.render();
  });

  afterEach(function () {
    $('#studentservice_page').replaceWith("<div id='stage'></div>");
  });

  describe('render', function () {
    it('Menu should be populated with 9 list items', function () {
      expect($('#studentservice-menu').children().size()).toEqual(9);
    });
  });

  describe('on deviceready', function () {

    it('Should initiate i18n and return the swedish list depending when swedish is the language', function () {
      spyOn(i18n, 'detectLanguage').andReturn('sv-SE');
      this.view = new suApp.view.StudentView({ el: $('#studentservice_page')});

      expect(this.view.menu.length).toEqual(suApp.config.studentServiceSwe.menu.length);

      for (var i = 0; i < this.view.menu.length; i++) {
        expect(suApp.config.studentServiceSwe.menu).toContain(this.view.menu[i]);
      }
    });

    it('Should initiate i18n and return the english list when english is the default language', function () {
      spyOn(i18n, 'detectLanguage').andReturn('en');
      this.view = new suApp.view.StudentView({ el: $('#studentservice_page')});

      expect(this.view.menu.length).toEqual(suApp.config.studentServiceEng.menu.length);

      for (var i = 0; i < this.view.menu.length; i++) {
        expect(suApp.config.studentServiceEng.menu).toContain(this.view.menu[i]);
      }
    });

    it('Should initiate i18n and return the english list when neither english nor swedish is the default language', function () {
      spyOn(i18n, 'detectLanguage').andReturn('fr-FR');
      this.view = new suApp.view.StudentView({ el: $('#studentservice_page')});

      expect(this.view.menu.length).toEqual(suApp.config.studentServiceEng.menu.length);

      for (var i = 0; i < this.view.menu.length; i++) {
        expect(suApp.config.studentServiceEng.menu).toContain(this.view.menu[i]);
      }
    });

    it('should call trackPage on GAPlugin for correct page', function () {

      spyOn(window.plugins.gaPlugin, 'trackPage');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, "studentservice/index.html");
    });
  });

  describe('on handleServiceLinkClick', function () {
    it('should call trackPage on GAPlugin for link target', function () {
      spyOn(window.plugins.gaPlugin, 'trackPage');

      var target = $('.servicelink');
      $(target).trigger('click');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, target.attr('href'));
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

