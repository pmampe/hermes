/*
 * Creation of generic header to be reused
 */
$(document).on('pagecreate', '[data-role="page"]', function () {
  $(this).find('.defaultHeader[data-role="header"]').html(function () {

    var title = $(document).attr('title') || 'Titel saknas';
    var hasHome = $(this).hasClass('homebutton');
    var hasBack = $(this).hasClass('backbutton');
    var classes = hasHome || hasBack ? "" : "nobuttons";

    var headerHtml = JST['common/header']({
      title: title,
      backbutton: hasBack,
      homebutton: hasHome,
      classes: classes
    });

    return headerHtml;

  }).attr({
        "data-theme": "a",
        "data-position": "fixed"
      });

});
