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
 * The app view for the map module.
 *
 * @class A Backbone view to handle the app.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @type {Backbone.View}
 */
suApp.view.MapView = Backbone.View.extend(
    /** @lends MapView */
    {

      /** The map */
      map: null,

      /** The info window */
      infoWindowView: null,
      
      searchHiddenFromToolbar: false,

      keyboardVisible: false,
      resizeTimeout: false,

      /**
       * @constructs
       */
      initialize: function (options) {
        _.bindAll(this,
            'render',
            'updateCurrentPosition',
            'handleMapZoomChange',
            'removeAllMarkers',
            'addMarkers'
        );

        this.pointViews = [];
        this.infoWindowView = new suApp.view.InfoWindowView({
          mapView: this,
          appModel: options.appModel
        });

        // Google Maps Options
        var myOptions = {
          zoom: 15,
          center: this.model.get('location'),
          mapTypeControl: false,
          navigationControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          panControl: false,
          zoomControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            }
          ]
        };

        // Add the Google Map to the page
        this.map = new google.maps.Map(this.el, myOptions);

        var self = this;
        google.maps.event.addListener(this.map, 'zoom_changed', this.handleMapZoomChange);
        this.on('updateCurrentPosition', this.updateCurrentPosition);
        this.model.on('change:mapPosition', this.updateMapPosition, this);
        this.model.on('change:zoom', this.updateMapZoom, this);
        $(window).on("resize.mapview", _.bind(this.resize, this));

        // Handle keyboard up event
        $(document).on('showkeyboard.mapview', function () {
          self.keyboardVisible = true;
        });

        // Handle keyboard down event
        $(document).on('hidekeyboard.mapview', function () {
          window.setTimeout(function () {
            self.keyboardVisible = false;
            self.resize();
          }, 150);
        });
      },

      /**
       * Remove handler for the view.
       */
      remove: function () {
        $(window).off(".mapview");
        $(document).off(".mapview");

        this.infoWindowView.remove();
        Backbone.View.prototype.remove.call(this);
      },

      /**
       * Render the map view.
       */
      render: function () {
        this.resize();
      },

      /**
       * Handler for window resizing.
       */
      resize: function () {
        var self = this;

        clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(function () {
          if (!self.keyboardVisible) {
            // Force the height of the map to fit the window
            $("#map-content").height($(window).height() - $("[data-role='header']").outerHeight() - $("div#search-box").outerHeight() - 2);
            google.maps.event.trigger(self.map, 'resize');
          }
        }, 150);
      },

      createPositionMarker: function () {
        var currentPosition = new suApp.model.Location({
          id: -100,
          campus: null,
          type: 'current_position',
          name: i18n.t("map.current_position.name", { lng: "sv" }),
          nameEn: i18n.t("map.current_position.name", { lng: "en" }),
          coords: [
            [this.model.get('location').lat(), this.model.get('location').lng()]
          ],
          directionAware: false
        });

        this.currentPositionPoint = new suApp.view.PointLocationView({
          model: currentPosition,
          gmap: this.map,
          infoWindow: this.infoWindowView
        });
      },

      handleMapZoomChange: function () {
        this.trigger('zoom_changed', this.map.getZoom());
      },

      /**
       * Sets center of the map to model.mapPosition
       */
      updateMapPosition: function () {
        this.map.panTo(this.model.get('mapPosition'));
      },

      /**
       * Zooms the map to model.zoom
       */
      updateMapZoom: function () {
        this.map.setZoom(this.model.get('zoom'));
      },

      /**
       * Sets position of the current position point.
       *
       * @param position Phonegap geolocation Position
       */
      updateCurrentPosition: function (position) {
        if (typeof this.currentPositionPoint === 'undefined') {
          this.createPositionMarker();
          this.currentPositionPoint.render();
        }

        this.currentPositionPoint.model.set('coords', [
          [position.coords.latitude, position.coords.longitude]
        ]);
      },

      /**
       * Replaces points on the map.
       *
       * @param {Location} newPoints the new points to paint on the map.
       */
      replacePoints: function (newPoints) {
        this.removeAllMarkers();
        this.addMarkers(newPoints);
      },

      /**
       * Remove all markers from the map.
       */
      removeAllMarkers: function () {
        _.each(this.pointViews, function (pointView) {
          // remove all the map markers
          pointView.remove();
        });

        // empty the map
        this.pointViews = [];
      },

      /**
       * Add new markers to the map.
       *
       * @param newPoints the new markers.
       */
      addMarkers: function (newPoints) {
        var self = this;

        newPoints.each(function (item) {
          var point = null;
          var shape = item.get('shape');

          if (shape === "line") {
            point = new suApp.view.LineLocationView({ model: item, gmap: self.map, infoWindow: self.infoWindowView });
          }
          else if (shape === "polygon") {
            point = new suApp.view.PolygonLocationView({ model: item, gmap: self.map, infoWindow: self.infoWindowView });
          }
          else {
            point = new suApp.view.PointLocationView({ model: item, gmap: self.map, infoWindow: self.infoWindowView });
          }

          // if the polygon has an icon, draw it
          if (item.getPin() !== null && (shape === "line" || shape === "polygon")) {
            var iconPoint = new suApp.view.PointLocationView({
              model: item,
              gmap: self.map,
              infoWindow: self.infoWindowView,
              customizedPosition: point.getCenter()});
            self.pointViews.push(iconPoint);
          }

          self.pointViews.push(point);
        });

        // If there is only one marker on the map, display the info window.
        if (_.size(this.pointViews) === 1) {
          var point = _.first(this.pointViews);
          point.openInfoWindow(point.model, point.marker);
        }
      },

      /**
       * Print directions on the map.
       *
       * @param travelMode walking, bicycling, driving, or public transportation
       * @param destination optional parameter, defaults to destination (global variable)
       */
      getDirections: function (travelMode, destination) {

        //Displays error message if point cannot be found
        if (this.currentPositionPoint ==  undefined) {
          if (device.platform == 'Android') {
            showError(i18n.t("error.noGPSAndroid"));
          } else if (device.platform == 'iOS') {
            showError(i18n.t("error.noGPSiOS"));
          } else {
            showError(i18n.t("error.noGPS"));
          }
          return;
        }

        var orig = this.currentPositionPoint.getPosition();
        var travMode = null;

        if (travelMode === "walking") {
          travMode = google.maps.DirectionsTravelMode.WALKING;
        } else if (travelMode === "bicycling") {
          travMode = google.maps.DirectionsTravelMode.BICYCLING;
        } else if (travelMode === "driving") {
          travMode = google.maps.DirectionsTravelMode.DRIVING;
        } else if (travelMode === "publicTransp") {
          travMode = google.maps.DirectionsTravelMode.TRANSIT;
        }

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.map);

        if (directionsDisplay) {
          directionsDisplay.setPanel(document.getElementById("dir_panel"));
        }

        var request = {
          origin: orig,
          destination: destination,
          travelMode: travMode
        };
        directionsService.route(request, function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }
    });
