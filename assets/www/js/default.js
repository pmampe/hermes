/*
 * Default handling of generic header triggered by data-header attribute
 */
$(document).on('pagecreate', '[data-role="page"][data-header]', function () {
  var $this = $(this),
      headerTemplate = $this.data("header"),
      headerOptions = $this.data("header-options") || "",
      optionsArr = headerOptions.split(" ");

  var attrs = {
    "data-theme": "a",
    "data-role": "header"
  };
  if (optionsArr.indexOf("notfixed") < 0) {
    attrs["data-position"] = "fixed";
  }

  var templateData = _.inject(optionsArr, function (memo, option) {
    memo[option] = true;
    return memo;
  }, {
    title: $this.data('header-title') || ($(document).attr('title') || 'Titel saknas'),
    backbutton: false,
    homebutton: false
  });

  var addClass = templateData.homebutton || templateData.backbutton ? "" : "nobuttons";

  $this.find('[data-role="header"]').remove();

  $('<div></div>').attr(attrs).prependTo(this).html(function () {
    return JST[headerTemplate](templateData);
  }).addClass(addClass);

});

/*
 * Default handling of external link by target=_blank attribute
 */
$(document).on("click", "a[target=_blank][data-rel!=external]", function (event) {
  event.preventDefault();

  var $externalLinkDialog = $('#external-link-dialog');
  $externalLinkDialog.remove();

  $externalLinkDialog = $('<div id="external-link-dialog"></div>').html(JST["common/external-link-dialog"]({
    href: $(this).attr("href")
  })).appendTo("body");

  $externalLinkDialog.find("a[target=_blank]").click(function () {
    $externalLinkDialog.dialog('close');
  });
  $.mobile.changePage('#external-link-dialog', { role: "dialog" });
});
