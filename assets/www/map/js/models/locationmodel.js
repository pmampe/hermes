var Location = Backbone.Model.extend({
  defaults:{
    "id":0,
    "campus":'unknown',
    "type":'unknown',
    "text":"",
    "locations":[],
    pin:new google.maps.MarkerImage(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
            'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
            'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
            'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
            'AAAABJRU5ErkJggg==')
  },

  getGLocation:function () {
    return new google.maps.LatLng(this.get('locations')[0], this.get('locations')[1]);
  },

  getPoiType:function () {
    return this.get('campus') + "." + this.get('type')
  }
});

var Locations = Backbone.Collection.extend({
  model:Location,

  pin:new google.maps.MarkerImage(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
          'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
          'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
          'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
          'AAAABJRU5ErkJggg=='),

  url:function () {
    return 'http://localhost:8080/hermes-broker/geo/poi';
  },

  byCampus:function (campus) {
    return _(this.filter(function (data) {
      return data.get("campus") == campus;
    }));
  },

  byType:function (type) {
    return _(this.filter(function (data) {
      return data.get("type") == type;
    }));
  },

  byCampusAndType:function (campus, types) {
    var ret = this.byCampus(campus);
    return _(ret.filter(function (data) {
      return _.contains(types, data.get("type"));
    }));
  }
});

var LocationSearchResult = Backbone.Collection.extend({
  model:Location,

  pin:new google.maps.MarkerImage(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkw' +
          'AAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKExQWIJ3tCJcAAAC/SURBVAjXNc4/jgFRAMDh3/tj8oaJKchENBRsQTZ2VCpncAFO4A' +
          'QkDqB0AYnCCfRuQGYzhUypUWzEyEp072n4TvABUNS6Hxmzqfl+Ehmz9pX6BhAlrQejZnM/7XZNKwzJ8pxVmj525/NQlwqF+SyOTadScVgrqv' +
          'W6Czwv2F8uCynh5ysMwVoBgLWiXS4joSctHE55DlI6AKR02f2OhaNykP09n+NGEHieUvxer2KZJP/p7TbhvY0jY7bv7eazfQE67zjGgilfew' +
          'AAAABJRU5ErkJggg=='),

  url:function () {
    return 'http://pgbroker-dev.it.su.se/geo/search';
  }
});
