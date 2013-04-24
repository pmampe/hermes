if (!("JST" in window) || "JST" === undefined) {
  window.JST = {};
}

JST['common/header'] = _.template(" \
    <h1><%= title %></h1> \
\
    <% if (backbutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='fade' data-rel='back' \
         data-icon='arrow-l' data-iconpos='left' class='ui-btn-left'> \
        Tillbaka \
      </a> \
    <% } %> \
\
    <% if (menubutton) { %>\
      <a id='menubutton' data-role='button' \
         data-icon='grid' data-iconpos='notext' class='ui-btn-right'> \
        Meny \
      </a> \
    <% } %> \
\
    <% if (homebutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='fade' href='../index.html' \
         data-icon='home' data-iconpos='notext' class='ui-btn-right'> \
        Hem \
      </a> \
    <% } %> \
");

JST['common/external-link-dialog'] = _.template(' \
  <div data-role="content"> \
    <p>Sidan kommer &ouml;ppnas i extern webbl&auml;sare, vill du forts&auml;tta?</p> \
      <fieldset class="ui-grid-a"> \
        <div class="ui-block-a"><a data-role="button" data-rel="back">Nej</a></div> \
        <div class="ui-block-b"><a data-role="button" data-rel="external" href="<%= href%>" target="_system" \
          data-ajax="false" data-theme="b">Ja</a></div> \
      </fieldset> \
  </div> \
');
