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

        // This is done to show a search icon or text in the mobile keyboard
        this.inputField.get(0).type = "search";
        if (options.placeholderSuffix) {
         // this.inputField.attr("placeholder", "Sök " + options.placeholderSuffix);
          this.inputField.attr("placeholder", i18n.t('map.menu.searchfor') + i18n.t(options.placeholderSuffix).toLowerCase());
        }

        $("#search-autocomplete").listview("option", "filterCallback", this.filterSearch);

        this.collection.on("reset", this.render);
      },

      /** Registers events */
      events: {
        'focus input': 'showFilteredList',
        'keyup input': 'inputKeyup',
        'click #cancelFilter': 'hideFilteredList',
        'click .autocomplete-link': 'showClickedLoction'
      },

      /**
       * Render the search view.
       */
      render: function () {
        this.populateFilter();
        this.delegateEvents();
      },

      inputKeyup: function (e) {
        if (e.which == 13) {
          $(e.target).trigger("blur");
        }
      },

      showFilteredList: function () {
        $("#search-box form").addClass("tight");
        $("#cancelFilter").show();

        //if input field not empty trigger new filtering with existing value, else show whole filter
        if ($('div#search-box input').val() !== "") {
          // jquerymobile remembers the old value in the input field.
          // in order to trigger a change event, we must set another value inbetween.
          var prevValue = this.inputField.val();
          this.inputField.val('').trigger('change');
          this.inputField.val(prevValue).trigger('change');
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
        $("#search-box form").removeClass("tight");
        $("#cancelFilter").hide();
        $("#search-autocomplete li").addClass("ui-screen-hidden");
        
        if (this.inputField.val() == "") {
          this.resetLocations();
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
        var modelid = $(target).attr('data-modelid');
        return this.collection.get(modelid);
      },

      showClickedLoction: function (event, ui) {
        this.hideFilteredList();
        var location = this.getClickedLocation(event.target);
        this.trigger("selected", location);
      },
      
      resetLocations: function() {
        this.collection.trigger("change");
      },

      populateFilter: function () {
        var html = this.collection.bySearchable().reduce(function (memo, location) {
          return memo + '<li id="' + location.get('id') + '" data-icon="false">' +
                        '<a data-modelid="' + location.get('id') + '" class="autocomplete-link">' + location.get('name') + '</a>' +
                        '</li>';
        }, "");

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
        var evalRet = true;

        var splitText = text.split(" "); //unstable? depends on data
        splitText.push(text);
        splitText.push(text.replace(" ", ""));

        $.each(splitText, function (i, val) {
          //===0, it occurs at the beginning of the string
          if (val.toLowerCase().indexOf(searchValue) === 0) {
            evalRet = false;
          }
        });

        return evalRet;
        //returns true of false, truth filters out said instance
      }
    }); //-- End of Search view
