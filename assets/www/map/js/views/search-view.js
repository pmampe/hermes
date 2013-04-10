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
      },

      /**
       * Render the search view.
       */
      render: function () {
        var self = this;

        this.ul = $("#search-autocomplete");

        this.populateFilter();
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
      }
    }); //-- End of Search view
