/**
 * The search view for the map module.
 *
 * @class A Backbone view to handle the search popup.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var SearchView = Backbone.View.extend(
    /** @lends SearchView */
    {

      /**
       * @constructs
       * @param options Options for this class. Expects campus name and a searchResult collection to add results to
       */
      initialize: function (options) {
        _.bindAll(this, "render", "populateFilter");

        this.items = options.filterList;
        this.mapView = options.mapView;
      },

      /** Registers events */
      events: {
        'focus input': 'showFilteredList',
        'blur input': 'hideFilteredList',
        'click .autocomplete-link': 'showClickedLoction' 
      },

      /**
       * Render the search view.
       */
      render: function () {
        var self = this;

        this.ul = $("#search-autocomplete");

        this.populateFilter();
      },
      
      showFilteredList: function() {
        $("#search-autocomplete li").removeClass("ui-screen-hidden");
      },

      /**
       * If evt is an object, i.e. a blur event, then delay the execussion 
       * of hiding the list. This is done in order to capture the click event 
       * (when clicking on elements in the list).
       */
      hideFilteredList: function(evt) {
        if (typeof evt == 'object') {
          setTimeout(function() {
            $("#search-autocomplete li").addClass("ui-screen-hidden");
          }, 100);
        } else {
          $("#search-autocomplete li").addClass("ui-screen-hidden");
        }
      },
      
      /**
       * getClickedLocation takes the clicked html snippet from the search-filter list,
       * i.e: <a class="autocomplete-link ui-link-inherit">E 421</a>. 
       * From this html snippet getClickedLocation extracts the element name, in this
       * case "E 421" and finds it in the this.items collection (containing) all items 
       * for the given type (i.e. auditorium). 
       * 
       *  @returns A new Locations collection with just the inputed item.
       *           If for some reason the item is not found in this.items collection, 
       *           an empty Locations collection is returned.
       */
      getClickedLocation: function(target) {
        console.log(target);
        var itemName = $(target).html();
        var item;
        $.each(this.items.toJSON(), function(i, v) {
          if (v.name == itemName) {
            item = v;
            return false;
          }
        });
        
        var location = new Locations([]);;
        if (item) {
          location = new Locations([this.items.get(item)]);
        }
        return location;
      },
      
      showClickedLoction: function(event, ui) {
        var location = this.getClickedLocation(event.target);
        this.mapView.replacePoints(location);
      },

      populateFilter: function () {
        var html = "";

        $.each(this.items.toJSON(), function (i, val) {
          html += "<li id='" + val.id + "'><a class='autocomplete-link'>" + val.name + "</a></li>";
        });

        var $ul = $('#search-autocomplete');
        $ul.html(html);
        $ul.listview("refresh");
        $ul.trigger("updatelayout");
        
        // After populating the list, hide it (only show it when search-box has focus)
        this.hideFilteredList();
      }
    }); //-- End of Search view
