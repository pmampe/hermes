var MapModel = Backbone.Model.extend({
  defaults:{
    location:new google.maps.LatLng(59.364213, 18.058383), // Stockholms universitet
    currentPosition:null
  },

  setLocation:function (latitude, longitude) {
    this.set({ location:new google.maps.LatLng(latitude, longitude) });
  }
});
