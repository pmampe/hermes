if (!("JST" in window) || "JST" == undefined)
  window.JST = new Object();

JST['common/header'] = _.template(" \
    <h1><%= title %></h1> \
\
    <% if (backbutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='slide' href='#' \
         data-icon='arrow-l' data-iconpos='left' class='ui-btn-left back'> \
        Tillbaka \
      </a> \
    <% } %> \
\
    <% if (homebutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='slide' href='../index.html' \
         data-icon='home' data-iconpos='notext' class='ui-btn-right home'> \
        Hem \
      </a> \
    <% } %> \
");
