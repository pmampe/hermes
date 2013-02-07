/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
var AppView = Backbone.View.extend(
    /** @lends AppView */
    {

      /**
       * @constructs
       */
      initialize: function () {
        _.bindAll(this, "render", "changeCampus", "showPOIs");

        this.isWebKit = navigator.userAgent.indexOf("WebKit") != -1;
        // locale storage only supported on webkit browsers
        if (this.isWebKit) { 
          this.db = this.initializeDB();
          this.createCampusesTable(this.db);
        }

        this.campuses = new Campuses();

        // request event not firing for some reason, putting logic in render method..
        this.campuses.on("request", this.getCampuses, this);
        this.campuses.on("reset", this.renderCampuses, this);

        this.mapView = new MapView({ el: $('#map_canvas') });
      },

      /**
       * Registers events.
       */
      events: {
        "change #campus": "changeCampus",
        "change #poiType": "showPOIs",
        "click a[id=menu-search]": "openSearchPopup"
      },

      /**
       * Render the app module.
       */
      render: function () {
        var footerTpl = _.template($("#page-map-footer_template").html());
        this.$el.append(footerTpl);

        this.togglePoiType();

        // get campuses from locale storage before fetching
        // (could be moved to 'request' event, but not working for now..)
        this.getCampuses();
        this.campuses.fetch({
          error: function () {
            alert("ERROR! Failed to fetch campuses.");
          }
        });

        this.mapView.render();

        var filters = [
          "Parkering",
          "Restaurang",
          "Hörsal"
        ];

        var template = _.template($("#location_template").html(), {
          defaultOptionName: i18n.t("map.general.filter"),
          options: filters
        });

        var filterSelect = this.$el.find('#poiType');

        filterSelect.append(template);

        filterSelect.selectmenu();
        filterSelect.selectmenu("refresh", true);
      },
      
      
      // --- BEGIN DATABASE FUNCTIONS ---
      // --------------------------------
      
      //open the database
      initializeDB: function () {
        var localDatabase = openDatabase(
            "campuses", //    short name
            "1.0",      //    version
            "Campuses", //    long name
            5000000     //    max size (5 MB - max confirmed on all devices)
        );

        return localDatabase;
      },


      createCampusesTable: function(db) {
        var query = "CREATE TABLE IF NOT EXISTS campuses " +
        "(id INT PRIMARY KEY, name NVARCHAR(100), coords NVARCHAR(50), zoom INT);"

        db.transaction(function (trxn) {
          trxn.executeSql(
              query,  // the query to execute
              [],     // parameters for the query
              function (transaction, resultSet) { // success callback
                console.log('successfully created table campsues');
              },
              function (transaction, error) { //error callback
                console.log(error);
              });
        }); 
      },
      
      insertCampuses: function(campuses) {
        if (this.isWebKit) { // locale storage only supported on webkit browsers
          var self = this;
          $(campuses).each(function(i, campus) {
            var query = "INSERT OR REPLACE INTO campuses (id, name, coords, zoom) " +
            "VALUES (?,?,?,?);"
          
            self.db.transaction(function (trxn) {
              trxn.executeSql(
                  query,
                  [campus.id, campus.name, campus.coords, campus.zoom],
                  function (transaction, resultSet) {
                    console.log('successfully inserted into campuses');
                  },
                  function (transaction, error) {
                    console.log(error);
                  }
              ); 
            });
          })
        }
      },          
      
      getCampuses: function(/* db, callback */) {
        if (this.isWebKit) { // locale storage only supported on webkit browsers
          var self = this;
          var query = "SELECT * FROM campuses;";
          this.db.transaction(function (trxn) {
            trxn.executeSql(
                query,  // the query to execute
                [],     // parameters for the query
                function (transaction, resultSet) {
                  var i = 0,
                  currentRow,
                  campuses = [];
                  for (i; i < resultSet.rows.length; i++) {
                    currentRow = resultSet.rows.item(i);
                    currentRow.coords = currentRow.coords.split(",");
                    campuses.push(currentRow);
                  }

                  campuses.toJSON = function (key) {
                    // return everything except last element (the toJSON object)
                    return this.slice(0, this.length - 1);
                  }

                  self.renderCampuses(campuses);
                },
                function (transaction, error) { //error callback
                  console.log(error);
                } );
          }); 
        }
      },
      // --- END DATABASE FUNCTIONS ---
      // --------------------------------
      

      /**
       * Opens the search popup (or slide down)
       *
       * @param event the triggering event.
       */
      openSearchPopup: function (event) {
        var campus = this.campuses.get($("#campus").val());
        if (campus) {
          campus = campus.get('name');
        }

        this.mapView.showSearchView(campus);
      },

      /**
       * Render campus select.
       */
      renderCampuses: function (campuses) {
        this.insertCampuses(campuses.toJSON());
        
        var template = _.template($("#campus_template").html(), {
          defaultOptionName: i18n.t("map.general.campus"),
          options: campuses.toJSON()
        });

        /* If we already have a selectmenu for campus then replace the following structure:
         * <div.ui-block-a> <div.ui-select> <a#campus-button></a> <select#campus></select> </...>
         * Else if we create the campus selectmenu for the first time, then replace:
         * <div.ui-block-a> <div#campus></div> </div>
         */
        if (this.$el.find("#campus-button").size() > 0) {
          this.$el.find('#campus-button').parent().parent().html(template);
        } else {
          this.$el.find('#campus').replaceWith(template);
        }
        this.$el.find('#campus').selectmenu();
        this.$el.find('#campus').selectmenu("refresh", true);
        this.$el.trigger("refresh");
      },

      /**
       * Change campus callback function.
       *
       * @param e event.
       * @param v value.
       */
      changeCampus: function (e, v) {
        this.togglePoiType();

        var campus = this.campuses.get($("#campus").val());
        this.mapView.updateCampusPoint(campus.get("coords"), campus.get("zoom"), campus.get("name"));
        this.showPOIs();
      },

      /**
       * Show Points Of Interest
       */
      showPOIs: function () {
        var campus = this.campuses.get($("#campus").val());
        if (campus !== null) {
          campus = campus.get("name");
        }

        var types = $('#poiType').val();
        var searchInput = $("#search_input").val();

        // Reset the collection if no popups are open or is empty, otherwise fetch new.
        // If we have inputed a search input and no poiType, then don't fetch any new pois
        // (retain the current ones).
        if (types === null && searchInput === null) {
          this.mapView.locations.reset();
        }
        else if (types !== null) {
          this.mapView.locations.fetch({
            data: {
              campus: campus,
              types: types
            },
            error: function () {
              alert("ERROR! Failed to fetch locations.");
            }
          });
        }
      },

      /**
       * Disable filter select if no campus is chosen, else enable
       */
      togglePoiType: function () {
        if ($("#campus").val() === "") {
          $('#poiType').selectmenu("disable");
        } else {
          $('#poiType').selectmenu("enable");
        }
      }
    });
