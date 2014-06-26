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
 * The info window displayed over the map points.
 *
 * @class A Backbone view to handle the info window.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
suApp.view.InfoWindowView = Backbone.View.extend(
    /** @lends InfoWindow */
    {

      infoWindow: null,
      destination: null,

      /**
       * @constructs
       * @param options Options for this class. Expects a {MapView}.
       */
      initialize: function (options) {
        _.bindAll(this, 'open', 'close', 'updateRelatedLinks');

        this.appModel = options.appModel;
        this.appModel.on("change:showingNonVisibleForLocation", function () {
          var showingNonVisibleForLocation = this.appModel.get('showingNonVisibleForLocation');
          this.updateRelatedLinks(showingNonVisibleForLocation ? showingNonVisibleForLocation.location : null);
        }, this);

        this.infoWindow = new google.maps.InfoWindow({
          maxWidth: 260
        });

        var self = this;

        // TODO: refactor to (backbone) events: { [selector]: [function] }, couldn't get this to work. /lucien
        $(document).on("click.info-window-view", ".iw .dir-button", function () {
          self.close();

          $(".dir-button").each(function () {
            $(this).removeClass("selected");
          });
          $(this).addClass("selected");
          options.mapView.getDirections(this.id, self.destination);
        });
      },

      /**
       * Remove handler for the view.
       */
      remove: function () {
        this.close();
        $(document).off(".info-window-view");
        Backbone.View.prototype.remove.call(this);
      },

      /**
       * Sets the destination.
       * @param destination
       */
      setDestination: function (destination) {
        this.destination = destination;
      },

      /**
       * Opens the info window.
       * @param model
       * @param anchor
       * @param latlng
       */
      open: function (model, anchor, latlng) {
        this.close(); // close previous infowindow

        var tOptions = {
          name: model.getI18n('name'),
          displayDirections: model.get('directionAware'),
          model: model,
          itemText: model.getI18n('text')
        };

        if (model.get('type') === 'building') {
          var hasElevators = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['elevator'],
              true
          ).size() > 0;

          var hasEntrances = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['entrance'],
              true
          ).size() > 0;


          var toilets = this.appModel.locations.byBuildingAndTypeAndHandicapAdapted(
              model,
              ['toilet'],
              true
          );

          var floors = [];
          _.each(_.flatten(toilets), function (toilet) {
            floors.push(toilet.get('floor'));
          });
          floors = _.uniq(floors.sort(), true).join(', ');

          tOptions.hasElevators = hasElevators;
          tOptions.hasEntrances = hasEntrances;
          tOptions.tFloors = floors;
        }

        if (model.get('type') === 'organization') {
          var webAddress = model.get('webAddress');

          /* Removes the prefix of the web address to conserve space in the info window.
             Double check for instances when web addresses are given with only 'http://' or
             only with 'www.'.
           */
          if(webAddress != null) {
            var webAddressSubString = webAddress.replace('http://', '').replace('www.', '');
            tOptions.webAddressShort = webAddressSubString;
          } else {
            tOptions.webAddressShort = "";
          }

          tOptions.telephoneNumber = model.get('telephoneNumber');
          tOptions.webAddress = webAddress;
          tOptions.mailAddresses = model.get('mailAddresses');
          tOptions.address = model.get('address');
          tOptions.postalCity = model.get('postalCity');
          tOptions.postalCode = model.get('postalCode');
        }

        var template = JST['map/infoWindow'](tOptions);

        this.infoWindow.setContent(template);
        if (latlng) {
          this.infoWindow.setPosition(latlng);
          this.infoWindow.open(anchor.getMap());
        } else {
          this.infoWindow.open(anchor.getMap(), anchor);
        }

        var self = this;
        $("a.showRelated", "#info_window").click(function () {
          var $this = $(this);
          self.appModel.handleVisibilityForLocationByRelation(model, $this.data("related-by"), $this.data("related-types").split(" "), true);
        });
        $("a.hideRelated", "#info_window").click(function () {
          var $this = $(this);
          self.appModel.handleVisibilityForLocationByRelation(model, $this.data("related-by"), $this.data("related-types").split(" "), false);
        });

        this.updateRelatedLinks(model);
      },

      /**
       * Updates links for showing related locations in the infowindow given the location that related is shown for
       * @param location
       */
      updateRelatedLinks: function (location) {
        $('a.showRelated', '#info_window').show();
        $('a.hideRelated', '#info_window').hide();
        var showingNonVisibleForLocation = this.appModel.get("showingNonVisibleForLocation");
        if (showingNonVisibleForLocation && location === showingNonVisibleForLocation.location) {
          var attrQuery = '[data-related-by="' + showingNonVisibleForLocation.relatedBy + '"][data-related-types="' + showingNonVisibleForLocation.types.join(" ") + '"]';
          $('a.showRelated' + attrQuery, '#info_window').hide();
          $('a.hideRelated' + attrQuery, '#info_window').show();
        }
      },

      /**
       * Closes the info window.
       */
      close: function () {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
      }
    });

