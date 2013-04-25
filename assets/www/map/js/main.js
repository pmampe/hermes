/**
 * Start the map module.
 * Initializes the Backbone App view, sets locale and adds some triggers.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 */
function startModule() {

  var mapRouter = new MapRouter();
  Backbone.history.start();
}

function getPrefLanguage(){

  language = navigator.language.split("-");
  rootLanguage = (language[0]);

  return rootLanguage;

}