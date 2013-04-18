/**
 * Start the map module.
 * Initializes the Backbone App view, sets locale and adds some triggers.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */
function startModule() {

  // Get locale from phonegapg
    getLocale();

  var mapRouter = new MapRouter();
  Backbone.history.start();
}

/**
 * Get locale from phonegap. Calls set locale.
 * *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */

function getLocale() {

  var globalization = navigator.globalization;

  if (globalization) {
    console.log('global found finally');
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

    i18n.init(options.locale, function() {
      // save to use translation function as resources are fetched
      $(".nav").i18n();
  })

}
