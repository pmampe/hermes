var config = (function(pgBrokerBaseURL) {
  return {
    "sukat": {
      "search": {
        "url": pgBrokerBaseURL + "/sukat/search"
      }
    },

    "map": {
      "campuses": {
        "url": pgBrokerBaseURL + "/geo/campuses"
      },
      "location": {
        "url": pgBrokerBaseURL + "/geo/poi"
      },
      "icon": {
        "urlPrefix": pgBrokerBaseURL + "/image/view"
      }
    }
  };
})("http://pgbroker-dev.it.su.se");
