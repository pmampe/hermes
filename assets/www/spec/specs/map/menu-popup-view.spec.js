describe('Menu popup view', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='page-map' style='width:200px; height:200px'>" +
        "<div id='other-popup' data-role='popup'></div>" +
        "<div id='menupopup' data-role='popup'>" +
        "<ul id='menupopupList' data-role='listview'></ul>" +
        "</div>" +
        "<div id='map_canvas'></div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-map");

    this.view = new MenuPopupView({
      el: $('#menupopup'),
      campuses: 'foo',
      callback: function () {
        return 'bar';
      }
    });
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
  });

  describe('initializing', function () {
    it('should set campuses from options', function () {
      expect(this.view.campuses).toEqual('foo');
    });

    it('should set appModel from options', function () {
      expect(this.view.callback()).toEqual('bar');
    });
  });

  describe('render', function () {
    it('close other popups & open menu popup', function () {
      this.view.render();

      expect($('#other-popup').parent().hasClass('ui-popup-hidden')).toBeTruthy();
      expect($('#menupopup').parent().hasClass('ui-popup-active')).toBeTruthy();
    });
  });

  describe('selectCampus', function () {
    it('runs callback & closes menu popup', function () {
      spyOn(this.view, "callback");
      var campus = new Campus({ id: 0, name: 'foo'});

      this.view.campuses = new Campuses();
      this.view.campuses.add([campus]);

      $('#menupopupList').append('<li id="campus-0"><a id="link">Some campus</a></li>');

      this.view.selectCampus({target: "#link"});

      expect(this.view.callback).toHaveBeenCalledWith(campus);
      expect($('#menupopup').parent().hasClass('ui-popup-hidden')).toBeTruthy();
    });
  });

  describe('updateCampuses', function () {
    it('removes everything from the list', function () {
      $('#menupopupList').append('<li id="campus-0"><a id="link">Some campus</a></li>');
      $('#menupopupList').append('<li id="campus-1"><a id="link">Some other campus</a></li>');

      this.view.campuses = new Campuses();

      this.view.updateCampuses();

      expect($('#menupopupList').children().length).toEqual(0);
    });

    it('adds campuses to the list', function () {
      this.view.campuses = new Campuses();
      this.view.campuses.add([
        { id: 0, name: 'foo'},
        { id: 1, name: 'bar'}
      ]);

      this.view.updateCampuses();

      expect($('#menupopupList').children().length).toEqual(2);
      expect($('#campus-0')).toBeDefined();
      expect($('#campus-1')).toBeDefined();
    });
  });
});
