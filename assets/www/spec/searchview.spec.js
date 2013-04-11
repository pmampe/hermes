describe('Map views search filter', function () {
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
        "</div>" +
        "<div id='map_canvas'></div>" +
      "</div>";
    
    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-map");
    
    
    this.locations = new Locations();
    this.fixture = this.fixtures.Locations.valid;

    this.server = sinon.fakeServer.create();
    this.server.respondWith(
        "GET",
        this.locations.url(),
        this.validResponse(this.fixture)
    );
    
    
    this.appView = new AppView({ el: $('#page-map'), title: "Hör- & skrivsalar" });
    this.appView.render();
    this.appView.showType("auditorium");
    
    this.server.respond();

    
    this.searchView = this.appView.mapView.searchView;
  });
  
  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
    this.server.restore();
  });
  
  describe('instantiation', function () {
    it('should initialize', function () {
      spyOn(this.searchView, "initialize");
      new AppView({ el: $('#page-map'), title: "Hör- & skrivsalar" });
      expect(this.searchView.initialize).toHaveBeenCalled();
    });
    
    it('should render', function () {
      spyOn(this.searchView, "render");
      this.appView.showType("auditorium");
      this.server.respond();
      expect(this.searchView.render).toHaveBeenCalled();
    });
  });

/*
  //maryam tries some stuff
  describe('populate filter list', function () {
    beforeEach(function () {
      var filteredList = '<div id="search-box" class="ui-mini">'+
        '<ul id="search-autocomplete" data-role="listview" data-theme="a" data-filter-theme="a" data-mini="true" data-filter-mini="true"' +
        'data-filter="true" data-filter-reveal="true" data-filter-placeholder="Enter search string" data-inset= "true">' +
        '</ul>' +
        '</div>';
      $('#page-map').append(filteredList);
      $.mobile.loadPage("#page-map");
    });

    it('should populate filter list with the correct number of items', function () {
      expect($("#search-autocomplete li").length).toEqual(0);
      var list = ["E 144", "D4 a", "Hiss E3"];
      this..filterSearch(list);
      expect($("#search-autocomplete li").length).toEqual(3);
    });
  });
  */
  //end
});