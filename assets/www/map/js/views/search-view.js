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
        this.inputField = $("#search-autocomplete").parent().find("form input");
        $("#search-autocomplete").listview("option", "filterCallback", this.filterSearch);

        this.setInputPlaceholderText();
        this.mapView = options.mapView;
      },

      /** Registers events */
      events: {
        'focus input': 'showFilteredList',
        'blur input': 'hideFilteredList',
        'click .autocomplete-link': 'showClickedLoction',
        'click input': 'showFilteredList'
      },

      /**
       * Render the search view.
       */
      render: function (items) {
        this.items = items;
        this.populateFilter(this.items.toJSON());
        this.delegateEvents();
      },


      setInputPlaceholderText: function () {
        // get route from url, i.e auditorium from file:///devel/src/suApp/www/map/index.html#/auditoriums
        var route = window.location.hash.split("/").length > 1 ? window.location.hash.split("/")[1] : "n/a";
        var text = "Skriv in text för att söka";
        if (route == "auditoriums") {
          text = "Sök hör- & skrivsalar";
        }
        this.inputField.attr("placeholder", text);
      },

      showFilteredList: function () {
        //if input field not empty trigger new filtering with existing value, else show whole filter
        if ($('div#search-box input').val() !== "") {
          $('input[data-type="search"]').trigger("change");
        } else {
          $("#search-autocomplete li").removeClass("ui-screen-hidden");
        }
      },

      /**
       * If evt is an object, i.e. a blur event, then delay the execussion
       * of hiding the list. This is done in order to capture the click event
       * (when clicking on elements in the list).
       */
      hideFilteredList: function (evt) {
        if (typeof evt == 'object') {
          setTimeout(function () {
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
      getClickedLocation: function (target) {
        var itemName = $(target).html();
        var item;
        $.each(this.items.toJSON(), function (i, v) {
          if (v.name == itemName) {
            item = v;
            return false;
          }
        });

        var location = new Locations([]);
        ;
        if (item) {
          location = new Locations([this.items.get(item)]);
        }
        return location;
      },

      showClickedLoction: function (event, ui) {
        this.inputField.val($(event.target).html());
        var location = this.getClickedLocation(event.target);
        this.mapView.replacePoints(location);
      },

      populateFilter: function (list) {
        var html = "";

        $.each(list, function (i, val) {
          html += "<li id='" + val.id + "' data-icon='false' ><a class='autocomplete-link'>" + val.name + "</a></li>";
        });

        var $ul = $('#search-autocomplete');
        $ul.html(html);
        $ul.listview("refresh");
        $ul.trigger("updatelayout");

        // After populating the list, hide it (only show it when search-box has focus)
        // hide the list only if the input doesn't have focus.
        if (!this.inputField.is(":focus")) {
          this.hideFilteredList();
        }
      },

      filterSearch: function (text, searchValue) {
        //search value- what we are looking for, text- the filter item being evaluated
        var eval = true;

        var splitText = text.split(" "); //unstable? depends on data
        splitText.push(text);
        splitText.push(text.replace(" ", ""));

        $.each(splitText, function (i, val) {
          //===0, it occurs at the beginning of the string
          if (val.toLowerCase().indexOf(searchValue) === 0) {
            eval = false;
          }
        });

        return eval;
        //returns true of false, truth filters out said instance
      }
    }); //-- End of Search view
