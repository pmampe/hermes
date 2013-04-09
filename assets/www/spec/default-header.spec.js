describe('Default-header', function() {

  var testTitle = 'test-title';

  beforeEach(function () {
    this.origBody = $('body').html();
    this.origTitle = $(document).attr('title');
    $(document).attr('title', testTitle);
    $('body').html('<div data-role="page" id="page" data-header="common/header"></div>');
    this.oldHistory = window.history;
    window.history.back = function() {
      this.backWasCalled = true;
    }
  });

  afterEach(function () {
    $(document).attr('title', this.origTitle);
    $('body').html(this.origBody);
    window.history = this.oldHistory;
  });

  describe('when header is created', function() {

    it('should be inserted first in the page', function() {
      $('[data-role="page"]').append($('<div data-role="content"></div>'));
      $.mobile.loadPage('#page');
      expect($('[data-role=page] :first-child').data('role')).toBe('header');
    });

    it('should be only one header in page', function() {
      $.mobile.loadPage('#page');
      $('[data-role="page"]').trigger('pagecreate');
      expect($('[data-role=header]').length).toBe(1);
    });

  });

  describe('using common/header with no options', function() {
    it('should render a header with only title and add class nobuttons', function() {
      $.mobile.loadPage('#page');

      var $header = $('[data-role=header]');
      expect($header.hasClass("nobuttons")).toBeTruthy();
      expect($header.data("theme")).toBe("a");
      expect($header.data("position")).toBe("fixed");
      expect($header.find("h1").text()).toBe(testTitle);
    });
  });

  describe('using common/header with option backbutton', function() {
    it('should render a header with title and add a back button', function() {
      $('[data-role="page"]').data("header-options", "backbutton");
      $.mobile.loadPage('#page');

      var $header = $('[data-role=header]');
      expect($header.data("theme")).toBe("a");
      expect($header.data("position")).toBe("fixed");
      expect($header.find("h1").text()).toBe(testTitle);
      var $button = $header.find("a");
      expect($button.text().trim()).toBe("Tillbaka");
      expect($button.data("role")).toBe("button");
      expect($button.data("rel")).toBe("back");
      expect($button.data("icon")).toBe("arrow-l");
      expect($button.hasClass("ui-btn-left")).toBeTruthy();
      $button.trigger("click");
      expect(window.history.backWasCalled).toBeTruthy();
    });
  });

  describe('using common/header with option homebutton', function() {
    it('should render a header with title and add a home button', function() {
      $('[data-role="page"]').data("header-options", "homebutton");
      $.mobile.loadPage('#page');

      var $header = $('[data-role=header]');
      expect($header.data("theme")).toBe("a");
      expect($header.data("position")).toBe("fixed");
      expect($header.find("h1").text()).toBe(testTitle);
      var $button = $header.find("a");
      expect($button.text().trim()).toBe("Hem");
      expect($button.data("role")).toBe("button");
      expect($button.data("icon")).toBe("home");
      expect($button.hasClass("ui-btn-right")).toBeTruthy();
      expect($button.attr("href")).toBe("../index.html");
    });
  });

  describe('using common/header with option notfixed', function() {
    it('should render a header without fixed position', function() {
      $('[data-role="page"]').data("header-options", "notfixed");
      $.mobile.loadPage('#page');

      var $header = $('[data-role=header]');
      expect($header.hasClass("ui-header-fixed")).toBeFalsy();
    });
  });
});