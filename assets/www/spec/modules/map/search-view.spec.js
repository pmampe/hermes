describe('Search view', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='page-map' style='width:200px; height:200px'>" +
        "<div id='search-box' class='ui-mini'>" +
        "<ul id='search-autocomplete' " +
        "data-role='listview' " +
        "data-theme='a' " +
        "data-filter-theme='a' " +
        "data-mini='true' " +
        "data-filter-mini='true' " +
        "data-filter='true' " +
        "data-filter-placeholder='Enter search string' " +
        "data-autodividers='true' " +
        "data-inset= 'true'>" +
        "</ul>" +
        "<a id='cancelFilter' href='#' class='cancel-filter-button' " +
        "data-role='button' data-inline='true' data-mini='true' >Cancel</a> " +
        "</div>" +
        "<div id='map_canvas'></div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-map");

    this.server = sinon.fakeServer.create();
    this.server.respondWith(
        "GET",
        Locations.prototype.url(),
        this.validResponse(this.fixtures.Locations.valid)
    );
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
    this.server.restore();
  });

  describe('instantiation', function () {
    it('should initialize search view on app view initialization', function () {
      spyOn(SearchView.prototype, "initialize");
      this.view = new AppView({ el: $('#page-map'), model: new AppModel() });
      expect(SearchView.prototype.initialize).toHaveBeenCalled();
    });

    it('should render search view on location refresh', function () {
      spyOn(SearchView.prototype, "render");

      var appView = new AppView({ el: $('#page-map'), model: new AppModel() });
      runs(function () {
        appView.model.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return appView.model.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect(SearchView.prototype.render).toHaveBeenCalled();
      });
    });
  });

  describe('filter functions', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
          "GET",
          Locations.prototype.url(),
          this.validResponse(this.fixtures.FilterItems.valid.locations)
      );

      spyOn(SearchView.prototype, "render");
    });

    it('should populate filter with the correct number of campuses', function () {
      this.server.respondWith(
          "GET",
          Campuses.prototype.url(),
          this.validResponse(this.fixtures.FilterItems.valid.locations)
      );

      var appView = new AppView({
        el: $('#page-map'),
        model: new AppModel({
          filterByCampus: true
        })
      });

      runs(function () {
        this.server.respond();
      });

      waitsFor(function () {
        return appView.model.campuses.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect($("#search-autocomplete li").length).toEqual(0);
        appView.searchView.populateFilter();
        expect($("#search-autocomplete li.ui-btn").length).toEqual(4);
      });
    });

    it('should trigger custom filtering for each filter item', function () {
      spyOn(SearchView.prototype, "filterSearch");
      var appView = new AppView({ el: $('#page-map'), model: new AppModel() });
      runs(function () {
        appView.model.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return appView.model.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect(SearchView.prototype.render).toHaveBeenCalled();
        expect($("#search-autocomplete li").length).toEqual(0);
        appView.searchView.populateFilter();
        expect($("#search-autocomplete li.ui-btn").length).toEqual(4);
        $(".ui-input-search input").focus().val("A").change();
        expect(SearchView.prototype.filterSearch.calls.length).toEqual(4);
      });
    });

    it('should overwrite jquery mobiles filtering', function () {
      var appView = new AppView({ el: $('#page-map'), model: new AppModel() });
      runs(function () {
        appView.model.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return appView.model.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect(SearchView.prototype.render).toHaveBeenCalled();
        expect($("#search-autocomplete li").length).toEqual(0);
        appView.searchView.populateFilter();
        expect($("#search-autocomplete li.ui-btn.ui-screen-hidden").length).toEqual(4);
        $(".ui-input-search input").focus().val("A").change();
        expect($("#search-autocomplete li.ui-btn.ui-screen-hidden").length).toEqual(2);

      });
    });
  });

  describe('mobile keyboard handling', function () {
    beforeEach(function () {
      spyOn(SearchView.prototype, "hideFilteredList");
      this.view = new AppView({ el: $('#page-map'), model: new AppModel()});
    });

    it('should set type to search on the search input field', function () {
      expect($('#search-box input').attr('type')).toBe('search');
    });

    it('should prevent form submit to trigger blur event in search input field', function () {
      $('#search-box form').submit();
      expect(SearchView.prototype.hideFilteredList.calls.length).toBe(0);
    });

    it('should blur input field on enter key but not hide the filter list', function () {
      runs(function () {
        var event = $.Event('keyup');
        event.which = 13;
        $('#search-box input').trigger(event);
        expect($('#search-box input').is(":focus")).toBeFalsy();
      });

      waitsFor(function () {
        return true;
      }, "timeout", 200);

      runs(function () {
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(0);
      });
    });
  });

  describe('Filtered list', function () {
    it('should call showFileredList on focus on input field', function () {
      spyOn(SearchView.prototype, "showFilteredList");
      this.view = new AppView({ el: $('#page-map'), model: new AppModel() });
      $('#search-box input').trigger('focus');
      expect(SearchView.prototype.showFilteredList).toHaveBeenCalled();
    });

    describe('hide/show filtered list', function () {
      var appView;

      beforeEach(function () {
        appView = new AppView({ el: $('#page-map'), model: new AppModel()});
        appView.searchView.collection = new Locations(this.fixtures.FilterItems.valid.locations);
        appView.searchView.populateFilter();
      });

      it('should show placeholder text in search field according to page title', function () {
        var category = "Axel Baxel";
        spyOn(SearchView.prototype, "render");
        spyOn(SearchView.prototype, "populateFilter");

        var searchView = new SearchView({
          el: "#search-box",
          collection: new Locations(),
          placeholderSuffix: category
        });

        var result = searchView.$el.find("input").attr('placeholder');

        expect(result).toMatch(/.*Axel Baxel/i);
      });

      it('should show cancel button on focus on input field', function () {
        expect($("#cancelFilter").is(":visible")).toBeFalsy();
        $('#search-box input').trigger('focus');
        expect($("#cancelFilter").is(":visible")).toBeTruthy();
      });

      it('should show filtered list on focus on input field', function () {
        var listSize = $("#search-autocomplete li").size();
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(listSize);

        $('#search-box input').trigger('focus');
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(0);
      });

      it('should hide filtered list and cancelButton on click cancel button', function () {
        $('#search-box input').trigger('focus');

        // all items visible
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(0);

        $("#cancelFilter").trigger("click");

        var listSize = $("#search-autocomplete li").size(); // all items hidden
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(listSize);

        expect($("#cancelFilter").is(":visible")).toBeFalsy(); // button hidden
      });

      it('should hide filtered list and cancelButton as well as reset (show all) locations when clicking cancel button and filtered text is empty', function () {
        spyOn(MapView.prototype, "replacePoints"); // prevents mapView.replacePoints to fire

        $('#search-box input').trigger('focus');
        $("#search-autocomplete li.ui-btn:nth-child(2) a").trigger("click");

        expect(MapView.prototype.replacePoints.mostRecentCall.args[0].length).toBe(1);

        spyOn(SearchView.prototype, "resetLocations");
        $("#cancelFilter").trigger("click");
        expect(SearchView.prototype.resetLocations).toHaveBeenCalled();
      });

      it('should hide filtered list and cancelButton  and keep locations in mapView when clicking cancel button and filtered text is NOT empty', function () {
        spyOn(MapView.prototype, "replacePoints"); // prevents mapView.replacePoints to fire

        $('#search-box input').trigger('focus');
        $("#search-autocomplete li.ui-btn:nth-child(2) a").trigger("click");

        expect(MapView.prototype.replacePoints.mostRecentCall.args[0].length).toBe(1);

        spyOn(SearchView.prototype, "resetLocations");
        $('#search-box input').val('Ax');
        $("#cancelFilter").trigger("click");
        expect(SearchView.prototype.resetLocations).not.toHaveBeenCalled();
      });

      it('should hide filtered list and cancelButton on click list item', function () {
        spyOn(MapView.prototype, "replacePoints"); // prevents mapView.replacePoints to fire

        $('#search-box input').trigger('focus');
        $("#search-autocomplete li.ui-btn:nth-child(2) a").trigger("click");

        var listSize = $("#search-autocomplete li").size(); // all items hidden
        expect($("#search-autocomplete li.ui-screen-hidden").size()).toBe(listSize);

        expect($("#cancelFilter").is(":visible")).toBeFalsy(); // button hidden
        expect(MapView.prototype.replacePoints).toHaveBeenCalled();
      });

      it('should filter on entered text', function () {
        $('#search-box input').trigger('focus');
        $('#search-box input').val("Axel");
        $('#search-box input').trigger('change');

        // list shows 2 elements
        expect($("#search-autocomplete li:not(.ui-screen-hidden).ui-btn").size()).toBe(2);
      });

      it('should retain entered text on blur and reshow filter on focus', function () {
        $('#search-box input').trigger('focus');
        $('#search-box input').val("Axel");
        $('#search-box input').trigger('change');
        $('#search-box input').trigger('blur');
        $('#search-box input').trigger('focus');

        // list shows 2 elements
        expect($("#search-autocomplete li:not(.ui-screen-hidden).ui-btn").size()).toBe(2);
      });

      describe('private function - getClickedLocation', function () {
        it('should return a new Location object with the inputed html markup', function () {
          var name = 'Axel';
          var markupHTML = '<a data-modelid="1" class="autocomplete-link ui-link-inherit">' + name + '</a>';

          expect(appView.searchView.getClickedLocation(markupHTML).get("name")).toBe(name);
        });
      });
    });
  });
});
