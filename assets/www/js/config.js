var config = (function (pgBrokerBaseURL) {
  return {
    "core": {
      "ga": {
        "account": "UA-39850755-1"
      }
    },

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
      },
      "zoom": {
        "threshold": 16
      }
    }
  };
})("http://pgbroker-dev.it.su.se");
