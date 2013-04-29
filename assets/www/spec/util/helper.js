afterEach(function () {
  document.getElementById('stage').innerHTML = '';
  $('body > :not([id=HTMLReporter])').hide();
});

var helper = {
  trigger: function (obj, name) {
    var e = document.createEvent('Event');
    e.initEvent(name, true, true);
    obj.dispatchEvent(e);
  }
};

navigator.language = function () {
  return "en-US";
};

beforeEach(function () {

  this.validResponse = function (responseText) {
    return [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(responseText)
    ];
  };
});
