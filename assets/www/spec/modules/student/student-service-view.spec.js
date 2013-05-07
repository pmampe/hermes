/**
 * Tests for the StudentView
 */

describe('Student view', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='studentservice_page' style='width:200px; height:200px'>" +
        "<div id='studentservice_view' data-role='content'>" +
        "<ul data-role='listview' data-inset='true'>" +
        "<li>" +
        "<a href='http://www.su.se/utbildning/anmalan-antagning' target='_blank' class='servicelink'>" +
        "<span data-i18n='studentService.menu.applicationAndAdmission'>Admission</span>" +
        "</a>" +
        "</li>" +
        "</ul>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#studentservice_page", {prefetch: "true"});

    this.view = new StudentView({ el: $('#studentservice_page') });
  });

  afterEach(function () {
    $('#studentservice_page').replaceWith("<div id='stage'></div>");
  });

  describe('on deviceready', function () {
    it('should call trackPage on GAPlugin for correct page', function () {

      spyOn(window.plugins.gaPlugin, 'trackPage');

      $(document).trigger('deviceready');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, "studentservice/index.html");
    });
  });

  describe('on handleServiceLinkClick', function(){
    it('should call trackPage on GAPlugin for link target', function(){
      spyOn(window.plugins.gaPlugin, 'trackPage');

      var target = $('a.servicelink');
      $(target).trigger('click');

      expect(window.plugins.gaPlugin.trackPage).toHaveBeenCalledWith(null, null, target.attr('href'));
    });
  });

});

