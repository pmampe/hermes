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

