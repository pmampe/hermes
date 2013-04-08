/*
 * Creation of generic header to be reused
 */
$(document).on('pagecreate', '[data-role="page"][data-header]', function () {
  var $this = $(this),
      headerTemplate = $this.data("header"),
      headerOptions = $this.data("header-options") || ""
      optionsArr = headerOptions.split(" ");

  var attrs = {
    "data-theme": "a",
    "data-role": "header"
  };
  if (optionsArr.indexOf("notfixed") < 0) attrs["data-position"] = "fixed";

  var templateData = _.inject(optionsArr, function(memo, option) {
    memo[option] = true;
    return memo;
  }, {
    title: $(document).attr('title') || 'Titel saknas',
    backbutton: false,
    homebutton: false
  });

  var addClass = templateData.homebutton || templateData.backbutton ? "" : "nobuttons";

  $this.find('[data-role="header"]').remove();

  $('<div></div>').attr(attrs).prependTo(this).html(function() {
    return JST[headerTemplate](templateData);
  }).addClass(addClass).find("a").click(function() {
    window.history.back();
  });

});
