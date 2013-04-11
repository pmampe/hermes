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
//        "keypress input": 'doSearchOnEnter'
          "keypress input": 'filterFix'
      },

      /**
       * Render the search view.
       */
      render: function () {
        var self = this;

        this.ul = $("#search-autocomplete");

        this.populateFilter();
        $( "#search-autocomplete" ).listview( "option", "filterCallback", this.filterFix); //this must be called after the DOM is completed
      },

      populateFilter: function () {
        var html = "";

        $.each(this.items.toJSON(), function (i, val) {

            html += "<li id='" + val.id + "' data-icon='false' class='ui-screen-hidden'><a class='autocomplete-link'>" + val.name + "</a></li>";

        });

        var $ul = $('#search-autocomplete');
        $ul.html(html);
        $ul.listview("refresh");
        $ul.trigger("updatelayout");

    },

      filterFix: function( text, searchValue) {
        //search value- what we are looking for, text- the filter item being evaluated
        var eval=new Boolean();
        eval = true;

        var splitText = text.split(" "); //unstable? depends on data
        splitText.push(text);

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
