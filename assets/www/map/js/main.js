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

  var appView = new AppView({ el: $('#page-map') });
  appView.render();

  $('#page-map').trigger("pagecreate");
  document.addEventListener("searchbutton", function () {
    this.openSearchPopup(null);
  }, false);
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
