/*
 * Creation of generic header to be reused
 */
$(document).on('pagecreate', '[data-role="page"]', function () {
  var addClass = "";
  var fixed = true;
  var $header = $(this).find('.defaultHeader[data-role="header"]').html(function () {

    var title = $(document).attr('title') || 'Titel saknas';
    var hasHome = $(this).hasClass('homebutton');
    var hasBack = $(this).hasClass('backbutton');
    fixed = !$(this).hasClass('notfixed');
    addClass = hasHome || hasBack ? "" : "nobuttons";

    var headerHtml = JST['common/header']({
      title: title,
      backbutton: hasBack,
      homebutton: hasHome
    });

    return headerHtml;

  });

  var attrs = {
    "data-theme": "a"
  };
  if (fixed) attrs["data-position"] = "fixed";

  $header.addClass(addClass).attr(attrs).find("a").click(function() {
    window.history.back();
  });

});
