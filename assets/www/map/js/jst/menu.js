if (!("JST" in window) || "JST" === undefined) {
  window.JST = new Object();
}

JST['map/menu/button'] = _.template(" \
<a id='menubutton' data-role='button' \
   class='ui-btn-right menubutton' data-iconshadow='false'> \
   &#9776;\
</a> \
");
