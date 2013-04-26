if (!("JST" in window) || "JST" === undefined) {
  window.JST = new Object();
}

JST['map/infoWindow/building'] = _.template(" \
<% if (hasElevators === true) { %> \
<i class='elevator'></i><%= i18n.t('map.infoWindow.elevator.exists') %> \
<% } else { %> \
<%= i18n.t('map.infoWindow.elevator.noexists') %> \
<% } %> \
<br/>\
<% if (tFloors != '') { %> \
<i class='toilet'></i><%= i18n.t('map.infoWindow.toilet.exists') + ' ' + tFloors %> \
<% } else { %> \
<%= i18n.t('map.infoWindow.toilet.noexists') %> \
<% } %> \
<br/>\
<% if (hasEntrances === true) { %> \
<i class='entrance'></i> \
<a class='showRelated' data-related-by='building' data-related-types='entrance' href='javascript:;'><%= i18n.t('map.infoWindow.entrance.show') %></a> \
<a class='hideRelated' href='javascript:;'><%= i18n.t('map.infoWindow.entrance.hide') %></a> \
<% } else { %> \
<%= i18n.t('map.infoWindow.entrance.noexists') %> \
<% } %> \
");

JST['map/infoWindow'] = _.template(" \
<div class='iw'>\
  <h3><%= name %></h3>\
  <% if (itemText != null) { %>\
  <%= itemText  %>\
  <% } %> \
  <% if (model.get('type') === 'building'){ %> \
  <%= JST['map/infoWindow/building']({hasElevators: hasElevators, tFloors: tFloors, hasEntrances: hasEntrances}) %> \
  <% } %>\
  <% if (model.get('type') === 'auditorium' && model.get('handicapAdapted') === true) { %> \
  <i class='hearing_loop'></i><%= i18n.t('map.infoWindow.hearing_loop.exists') %> \
  <% } else if (model.get('type') === 'auditorium') { %> \
  <%= i18n.t('map.infoWindow.hearing_loop.noexists') %> \
  <% } %> \
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
