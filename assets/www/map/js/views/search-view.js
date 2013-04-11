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

      showClickedLoction: function() {
        // fetch the correct location from the this.items collection
        // show only that location in the map, by calling mapView.replacePoints
        console.log("showClickedLoction");
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
    },

      filterFix: function( text, searchValue) {
        //search value- what we are looking for, text- the filter item being evaluated
        var eval = true;

        var splitText = text.split(" "); //unstable? depends on data
        splitText.push(text);
        splitText.push(text.replace(" ", ""));

        $.each(splitText, function(i , val){
          if (val.toLowerCase().indexOf( searchValue ) === 0 )
          //===0, it occurs at the beginning of the string
            {
              eval = false;
            }
        });

        return eval;
        //returns true of false, truth filters out said instance

      }
    }); //-- End of Search view
