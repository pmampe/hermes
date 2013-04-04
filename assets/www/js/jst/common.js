if (!("JST" in window) || "JST" == undefined)
  window.JST = new Object();

JST['common/header'] = _.template(" \
  <div id='header' data-role='header' data-position='fixed' class='<%= classes %>'> \
    <h1><%= title %></h1> \
\
    <% if (backbutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='slide' href='#' \
         data-icon='arrow-l' data-iconpos='left' class='ui-btn-left'> \
        Tillbaka \
      </a> \
    <% } %> \
\
  </div> \
");
