/**
 * Set locale.
 *
 * @param {Object} options to i18n.
 * @example setLocale("en_US");
 */
function setLocale(options) {
  var i18nOptions = {
    useCookie: false,
    fallbackLng: 'en',
    resGetPath: 'i18n/__lng__.json',
    getAsync: false
  };

  i18nOptions = $.extend({}, i18nOptions, options);

  i18n.init(i18nOptions);
}

/**
 * Get locale from phonegap. Calls set locale.
 *
 * @param {Object} options to i18n.
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */

function initLocale(options) {
  options = options || {};

  var globalization = navigator.globalization;

  if (globalization) {
    globalization.getLocaleName(
        function (locale) {
          options.locale = locale.value;
        },
        function () {
        }
    );
  }

  setLocale(options);
}
