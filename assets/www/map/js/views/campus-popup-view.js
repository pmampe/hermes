/**
 * The campus popup view for the map module.
 *
 * @class A Backbone view to handle the campuses popup.
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
var MenuPopupView = Backbone.View.extend(
    /** @lends MenuPopupView */
    {

      /**
       * @constructs
       * @param campuses A list of campuses to display.
       */
      initialize: function (options) {
        _.bindAll(this, "render");

        this.campuses = options.campuses;
        this.campusesMap = options.campusesMap;
      },

      /** Registers events */
      events: {
        "click #menupopupList": "selectCampus"
      },

      selectCampus: function (evt) {
        // get the campus id from the parent <li> (format "campus-X", where X is a number)
        var campusId = $(evt.target).parents("li").get(0).id.split("campus-")[1];
        $("#campus").val(campusId);
        $("#campus").selectmenu("refresh");
        $("#campus").trigger("change");
      },

      /**
       * Render the campus popup view.
       */
      render: function () {
        var self = this;
        // remove everything from the list except the first element (the header)
        $("#menupopupList").find("li").remove();

        // append all campuses
        $(this.campuses).each(function (i, campusName) {
          $("#menupopupList").append("<li id='campus-" + self.campusesMap[campusName] + "'><a href='javascript://nop'>" + campusName + "</a></li>");
        });

        $("#menupopupList").listview();
        $("#menupopupList").listview("refresh"); // jQuery mobile-ify the added elements

        // close any other open popup (only one popup can be open at the same time.)
        $(document).find("[data-role='popup']:not([id='menupopup'])").popup("close").bind({
          // show the campuses popup after the other popups has closed
          popupafterclose: function (event, uit) {
            // --- HACK: for correct x and y position of popup ---
            var x = 150;
            // device is only defined when running on a physical device (not a web browser)
            if (typeof device != 'undefined') {
              x = 50;
            }

            var cellHeight = $("#menupopup li:nth-child(2)").height();
            var noOfCells = $("#menupopup li:not(:first-child)").length;
            var y = noOfCells * (cellHeight / 3) + 150;
            // --- END  HACK: for correct x and y position of popup ---

            $("#menupopup").popup("open", { x: 0, y: 0 });

            // unbind popupafterclose event after campuses popup open, to ensure it's
            // not accidentally opened after any other search.
            $(document).find("[data-role='popup']:not([id='menupopup'])").unbind("popupafterclose");
          }
        });


        var popup = $("#menupopup");
        popup.popup("open", { x: 0, y: 0 });
        popup.parent().css('left', 'auto');
        popup.parent().css('right', '0px');
      }
    });
