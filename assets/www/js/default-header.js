/*
 * Creation of generic header to be reused
 */
$(document).on('pagecreate', '[data-role="page"]', function () {

  $(this).find('.defaultHeader[data-role="header"]').html(function() {

    var template = _.template(' \
      <h3><%= title %></h3> \
      <a data-role="button" rel="external" data-ajax="false" data-transition="slide" href="../index.html" \
         data-icon="arrow-l" data-iconpos="left" class="ui-btn-left"> \
        Tillbaka \
      </a> \
    ');

    var title = $(document).attr('title') || 'Titel saknas';

    return template({
      title: title
    });

  }).attr({
    "data-theme": "a",
    "data-position": "fixed"
  });

});