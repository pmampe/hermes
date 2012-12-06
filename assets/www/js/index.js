/**
 * The app.
 *
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @author <a href="mailto:henrik.dryselius@su.se">Henrik Dryselius</a>
 *
 * @class The app.
 */
var app = {
  /**
   * Initialize the app
   */
  initialize: function () {
    this.bind();
  },

  /**
   * Bind listeners
   */
  bind: function () {
    document.addEventListener('deviceready', this.deviceready, false);
  },

  /**
   * Callback function for deviceready event
   */
  deviceready: function () {
    // note that this is an event handler so the scope is that of the event
    // so we need to call app.report(), and not this.report()
    app.report('deviceready');
  },

  /**
   * Report
   * @param id id of dom element to report on.
   */
  report: function (id) {
    // hide the .pending <p> and show the .complete <p>
    document.querySelector('#' + id + ' .pending').className += ' hide';
    var completeElem = document.querySelector('#' + id + ' .complete');
    completeElem.className = completeElem.className.split('hide').join('');
  }
};
