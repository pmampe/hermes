/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class The model representing the map app.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */
var AppModel = Backbone.Model.extend(
    /** @lends AppMpdel */
    {
      /**
       * Model attribute defaults.
       */
      defaults: {
        menu: false,
        filterByCampus: false,
        campus: new Campus({ name: "Frescati" }),
        types: [],
        nonVisibleTypes: [],
        zoomSensitive: false,
        showingNonVisibleForLocation: null
      },

      initialize: function () {
        _.bindAll(this,
            "showVisibleTypes",
            "hideAllNonVisibleTypes",
            "handleLocationsReset",
            "handleVisibilityForLocationByRelation");
        this.campuses = new Campuses();
        this.locations = new Locations(null, {
          searchableTypes: _.difference(this.get('types'), this.get('nonVisibleTypes'))
        });

        // Hide nonVisibleTypes when locations is fetched
        this.locations.on("reset", this.handleLocationsReset);

        if (this.get('menu') || this.get('filterByCampus')) {
          this.campuses.fetch({reset: true});
        }
      },

      /**
       * Collection to filter on
       */
      getFilterCollection: function () {
        return this.get('filterByCampus') ? this.campuses : this.locations;
      },

      /**
       * Fetch all locations of a specific type.
       */
      fetchLocations: function () {
        this.locations.fetch({
          data: {
            types: this.get('types')
          },
          error: function () {
            alert("ERROR! Failed to fetch locations.");
          },
          reset: true
        });
      },

      /**
       * Sets visibility to true on all locations that is not in the list of non visible types
       */
      showVisibleTypes: function () {
        var nonVisibleTypes = this.get("nonVisibleTypes");

        this.locations.each(function (location) {
          if (!_.contains(nonVisibleTypes, location.get('type'))) {
            location.set('visible', true);
          }
        });
      },

      /**
       * Sets no visibility on all locations that is in the list of non visible types
       */
      hideAllNonVisibleTypes: function () {
        var nonVisibleTypes = this.get("nonVisibleTypes");

        this.locations.each(function (location) {
          if (_.contains(nonVisibleTypes, location.get('type'))) {
            location.set('visible', false);
          }
        });
      },

      /**
       * Sets no visibility on all locations except the provided
       *
       * @param visibleModel the model to set visible.
       */
      hideAllModelsExceptOne: function (visibleModel) {
        this.locations.each(function (item) {
          if (item != visibleModel) {
            item.set('visible', false);
          }
        });

        visibleModel.set('visible', true);
      },

      handleLocationsReset: function () {
        this.hideAllNonVisibleTypes();
        this.showVisibleTypes();
      },

      /**
       * Sets visibility on locations that is related for specified types
       */
      handleVisibilityForLocationByRelation: function (location, relatedBy, types, visibility) {
        this.hideAllNonVisibleTypes();
        // TODO Find some other way of doing string capitalization, maybe https://github.com/epeli/underscore.string#readme
        var byFunction = relatedBy ? this.locations["by" + relatedBy.charAt(0).toUpperCase() + relatedBy.slice(1)] : null;

        var showingNonVisibleForLocation = null;
        if (byFunction) {
          var relatedWithType = byFunction.call(this.locations, location).filter(function (location) {
            return _.contains(types, location.get('type'));
          });

          _.invoke(relatedWithType, "set", "visible", visibility);

          if (visibility) {
            showingNonVisibleForLocation = {
              location: location,
              relatedBy: relatedBy,
              types: types
            };
          }
        }

        this.set("showingNonVisibleForLocation", showingNonVisibleForLocation);
      }
    });
