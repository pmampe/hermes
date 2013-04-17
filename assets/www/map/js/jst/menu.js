if (!("JST" in window) || "JST" === undefined) {
  window.JST = new Object();
}

JST['map/menu/button'] = _.template(" \
<a id='menubutton' data-role='button' rel='external' data-ajax='false' data-transition='fade' \
   data-icon='grid' data-iconpos='notext' class='ui-btn-right'> \
  Meny \
</a> \
");
