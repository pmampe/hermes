if (!("JST" in window) || "JST" === undefined) {
  window.JST = new Object();
}

JST['map/infoWindow'] = _.template(" \
<div class='iw'>\
  <h3><%= model.get('name') %><%= model.has('buildingName') ? \", \" + model.get('buildingName') : '' %></h3>\
  <% if (model.has('text')) { %> \
  <%= model.get('text') %> \
  <% } %> \
  <% if (model.get('type') === 'auditorium' && model.get('handicapAdapted') === true) { %> \
  <i class='hearing_loop'></i><%= i18n.t('map.infoWindow.hearing_loop') + ' ' + i18n.t('common.exists') %> \
  <% } else if (model.get('type') === 'auditorium') { %> \
  <%= i18n.t('map.infoWindow.hearing_loop') + ' ' + i18n.t('common.dont_exist') %> \
  <% } %>\
\
  <% if (displayDirections === true) { %> \
  <div id='directions' style='display: inline'> \
    <div data-i18n='map.infoWindow.directions'><%= i18n.t('map.infoWindow.directions') %>:</div> \
    <div id='travel_modes_div' class='dir-tm kd-buttonbar kd-button'> \
      <a class='kd-button kd-button-left dir-button' href='javascript:void(0)' id='walking' \
         title='<%= i18n.t('map.infoWindow.walking') %>'> \
        <img class='dir-tm-w' src='http://maps.gstatic.com/mapfiles/transparent.png'> \
      </a> \
      <a class='kd-button kd-button-mid dir-button' href='javascript:void(0)' id='bicycling' \
         title='<%= i18n.t('map.infoWindow.bicycling') %>'> \
        <img class='dir-tm-b' src='http://maps.gstatic.com/mapfiles/transparent.png'> \
      </a>\
      <a class='kd-button kd-button-mid dir-button' href='javascript:void(0)' id='publicTransp' \
         title='<%= i18n.t('map.infoWindow.publicTransit') %>'> \
        <img class='dir-tm-r' src='http://maps.gstatic.com/mapfiles/transparent.png'> \
      </a> \
      <a class='kd-button kd-button-right dir-button' href='javascript:void(0)' id='driving' \
         title='<%= i18n.t('map.infoWindow.car') %>'> \
        <img class='dir-tm-d' src='http://maps.gstatic.com/mapfiles/transparent.png'> \
      </a> \
    </div> \
  </div>\
  <% } %> \
</div> \
");
