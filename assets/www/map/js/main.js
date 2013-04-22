/**
 * Start the map module.
 * Initializes the Backbone App view, sets locale and adds some triggers.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */
function startModule() {
  // Get locale from phonegap
  var globalization = navigator.globalization;

  if (globalization) {
    globalization.getLocaleName(
        function (locale) {
          setLocale(locale.value);
        },
        function () {
          console.log("Failed to get locale from phonegap. Using default.");
          setLocale();
        }
    );
  }
  else {
    setLocale();
  }

  var mapRouter = new MapRouter();
  Backbone.history.start();
}

/**
 * Set locale.
 *
 * @param {string} locale the locale to use.
 * @example setLocale("en_US");
 */
function setLocale(locale) {
  var options = {
    useCookie: false,
    fallbackLng: 'en',
    resGetPath: 'locales/__lng__.json',
    getAsync: false
  };

  if (locale) {
    options.locale = locale;
  }

  i18n.init(options);
}

function getPrefLanguage(){
  console.log("hej");
  navigator.
  navigator.globalization.getPreferredLanguage(
    function (language){alert(language.value);},
      function (){alert("error getting language");}
  )
}