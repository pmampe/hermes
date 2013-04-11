var config = (function(pgBrokerBaseURL) {
  return {
    "sukat": {
      "search": {
        "url": pgBrokerBaseURL + "/sukat/search"
      }
    },

    "map": {
      "autocomplete": {
        "url": pgBrokerBaseURL + "/geo/search"
      },
      "campuses": {
        "url": pgBrokerBaseURL + "/geo/campuses"
      },
      "location": {
        "url": pgBrokerBaseURL + "/geo/poi"
      },
      "search": {
        "url": pgBrokerBaseURL + "/geo/search"
      },
      "icon": {
        "urlPrefix": pgBrokerBaseURL + "/image/view"
      }
    }
  };
})("http://pgbroker-dev.it.su.se");
