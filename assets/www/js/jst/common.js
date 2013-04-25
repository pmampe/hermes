if (!("JST" in window) || "JST" === undefined) {
  window.JST = {};
}

JST['common/header'] = _.template(" \
    <h1><span><%= title %></span></h1> \
    \
    <% if (backbutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='fade' data-rel='back' \
         data-icon='arrow-l' data-iconpos='left' class='ui-btn-left'> \
          <span data-i18n='navigation.button.back'></span>\
      </a> \
    <% } %> \
\
    <% if (menubutton) { %>\
      <a id='menubutton' data-role='button' \
         data-icon='grid' data-iconpos='notext' class='ui-btn-right'> \
        <span data-i18n='common.header.menu'>Menu</span> \
      </a> \
    <% } %> \
\
    <% if (homebutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='fade' href='../index.html' \
         data-icon='home' data-iconpos='notext' class='ui-btn-right'> \
        <span data-i18n='common.header.home'>Home</span> \
      </a> \
    <% } %> \
");

JST['common/external-link-dialog'] = _.template(' \
  <div data-role="content"> \
    <p><span data-i18n="common.external.question">The page will be displayed in an external browser, do you wish to continue?</span></p> \
      <fieldset class="ui-grid-a"> \
        <div class="ui-block-a"><a data-role="button" data-rel="back"><span data-i18n="common.external.no">No</span></a></div> \
        <div class="ui-block-b"><a data-role="button" data-rel="external" href="<%= href%>" target="_system" \
          data-ajax="false" data-theme="b"><span data-i18n="common.external.yes">Yes</span></a></div> \
      </fieldset> \
  </div> \
');
