/**
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @author <a href="mailto:bjorn.westlin@su.se">Björn Westlin</a>
 * @type {Backbone.View}
 */
var AppView = Backbone.View.extend(
    /** @lends AppView */
    {

      /**
       * @constructs
       */
      initialize: function () {
        _.bindAll(this, "render");

        this.mapView = new MapView({ el: $('#map_canvas') });
      },

      /**
       * Registers events.
       */
      events: {
        "click a[id=menu-search]": "openSearchPopup"
      },

      /**
       * Render the app module.
       */
      render: function () {
        var footerTpl = _.template($("#page-map-footer_template").html());
        this.$el.append(footerTpl);

        this.mapView.render();
      },

<<<<<<< HEAD

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

      showType: function (type) {
        this.mapView.locations.fetch({
          data: {
            types: new Array(type)
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          }
        });
      },

      createCampusesTable: function (db) {
        var query = "CREATE TABLE IF NOT EXISTS campuses " +
            "(id INT PRIMARY KEY, name NVARCHAR(100), coords NVARCHAR(50), zoom INT);";

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

      insertCampuses: function (campuses) {
        if (this.isWebKit) { // locale storage only supported on webkit browsers
          var self = this;
          $(campuses).each(function (i, campus) {
            var query = "INSERT OR REPLACE INTO campuses (id, name, coords, zoom) " +
                "VALUES (?,?,?,?);";

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
          });
        }
      },

      getCampuses: function (/* db, callback */) {
        if (this.isWebKit) { // locale storage only supported on webkit browsers
          var self = this;
          var query = "SELECT * FROM campuses order by name;";
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
                  };

                  self.renderCampuses(campuses);
                },
                function (transaction, error) { //error callback
                  console.log(error);
                });
          });
        }
      },
      // --- END DATABASE FUNCTIONS ---
      // --------------------------------

=======
>>>>>>> 92ca6a6d70c4353e2c9312fc644eccdb4b95a569
      /**
       * Opens the search popup (or slide down)
       *
       * @param event the triggering event.
       */
      openSearchPopup: function (event) {
        this.mapView.showSearchView();
      }
    });
