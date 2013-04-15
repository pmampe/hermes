/**
 * Mock objects for Google Maps to be used in tests.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */

window.google = {};
google.maps = {};

google.maps.event = {};
google.maps.event.addListener = function (obj, event, callback) {
};
google.maps.event.addListenerOnce = function (obj, event, callback) {
};

google.maps.Map = function (element, options) {
  this.getBounds = function () {
  };
  this.fitBounds = function (bounds) {
  };
  this.getZoom = function () {
  };
  this.setZoom = function (zoom) {
  };
};

google.maps.MapTypeId = function () {
  this.ROADMAP = "ROADMAP";
};

google.maps.MVCObject = function () {
};

google.maps.MarkerImage = function (image) {
};

google.maps.Marker = function (options) {
  this.setMap = function (map) {
  };
};

google.maps.Polyline = function (options) {
  this.setMap = function (map) {
  };
};

google.maps.LatLng = function (lat, lng) {
  this._lat = lat;
  this._lng = lng;

  this.lat = function () {
    return this._lat;
  };
  this.lng = function () {
    return this._lng;
  };
};

google.maps.LatLngBounds = function (pos1, pos2) {
};

google.maps.ControlPosition = function () {
  this.LEFT_TOP = 0;
};

google.maps.Size = function (x, y) {
};

google.maps.Point = function (x, y) {
};

google.maps.InfoWindow = function () {
};
