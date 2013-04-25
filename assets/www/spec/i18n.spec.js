describe('Translations with i18n', function () {
  beforeEach(function () {
    var html = "<div data-role='page' class='type-home' id='page-home' data-header='common/header'>" +
        "<div data-role='content'>" +
        "<span data-i18n='start.menuItem.buildings'></span>" +
        "</div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-home");

    var resources = {
      en: { start: { 'menuItem': 'buildings' } }
    };
    i18n.init({resStore: resources});

  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
  });

  describe('when applying', function () {
    it('should translate key', function () {
      $('#page-home').i18n();
      expect($('#page-home').find('span').text()).toEqual("buildings");
    });
  });

});
