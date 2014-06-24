/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

if (!("JST" in window) || "JST" === undefined) {
  window.JST = {};
}

JST['map/infoWindow/building'] = _.template(" \
<% if (hasElevators === true) { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-lift'></div>\
    <div class='info-window-text'><%= i18n.t('map.infoWindow.elevator.exists') %></div>\
  </div>\
<% } else { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-lift not-available'></div>\
    <div class='info-window-text'><%= i18n.t('map.infoWindow.elevator.noexists') %></div>\
  </div> \
<% } %> \
<% if (tFloors != '') { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-toilet'></div>\
    <div class='info-window-text'><%= i18n.t('map.infoWindow.toilet.exists') + ' ' + tFloors %></div>\
  </div> \
<% } else { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-toilet not-available'></div>\
    <div class='info-window-text'><%= i18n.t('map.infoWindow.toilet.noexists') %></div>\
  </div>\
<% } %> \
<% if (hasEntrances === true) { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-entrance'></div>\
    <div class='info-window-text'>\
      <a class='showRelated' data-related-by='building' data-related-types='entrance' href='javascript:;'><%= i18n.t('map.infoWindow.entrance.show') %></a> \
      <a class='hideRelated' data-related-by='building' data-related-types='entrance' href='javascript:;'><%= i18n.t('map.infoWindow.entrance.hide') %></a> \
    </div>\
  </div>\
<% } else { %> \
  <div class='info-window-pg'>\
    <div class='info-window-icon handicap-entrance not-available'></div>\
    <div class='info-window-text'><%= i18n.t('map.infoWindow.entrance.noexists') %></div>\
  </div> \
<% } %> \
");

JST['map/infoWindow/organization'] = _.template(" \
  <div class='organization-information clearfix'>\
    <% if (address != null) { %> \
      <div class='top-info'>\
        <span id='department-address'><%= address %></span> <br />\
      <% } %> \
      <% if (postalCode != null) { %> \
        <span id='department-postal-code'><%= postalCode %></span>  \
      <% } %> \
      <% if (postalCity != null) { %> \
        <span id='department-postal-city'><%= postalCity %></span>\
      <% } %>\
    </div>\
    \
    <% if (telephoneNumber != null) { %> \
      <div>\
        <span><%= i18n.t('map.infoWindow.organization.telephoneNumber') %>: </span> \
        <a href='tel:<%= telephoneNumber %>' id='department-phone-link'><%= telephoneNumber %></a>\
      </div> \
    <% } %> \
    <% if (webAddress != null) { %> \
      <div>\
        <span><%= i18n.t('map.infoWindow.organization.webAddress') %>: </span> \
        <a href='<%= webAddress %>' id='department-website-link' target='inAppBrowser'><%= webAddressShort %></a>\
      </div>\
    <% } %> \
    <% if (mailAddresses != '') { %> \
      <div>\
        <span><%= i18n.t('map.infoWindow.organization.mailAddresses') %>: </span> \
        <% for(var mailAddress in mailAddresses) { %> \
          <a href='mailto:<%= mailAddresses[mailAddress] %>' id='department-mail-link'><%= mailAddresses[mailAddress] %></a>\
        <% } %>\
      </div>\
    <% } %> \
  </div>\
");

JST['map/infoWindow'] = _.template(" \
<div id='info_window' class='iw'>\
  <h3><%= name %></h3>\
  <div class='info-container'>\
  <% if (model.has('buildingName')) { %>\
    <%= model.get('buildingName') %><br>\
  <% } %>\
  <% if (itemText != null) { %>\
    <%= itemText  %>\
  <% } %> \
  <% if(model.get('type') === 'organization') { %> \
    <%= JST['map/infoWindow/organization']({telephoneNumber: telephoneNumber, webAddress: webAddress, mailAddresses: mailAddresses, address: address, postalCode: postalCode, postalCity: postalCity, webAddressShort: webAddressShort}) %> \
  <% } %> \
  <div class='info-window-icons'>\
  <% if (model.get('type') === 'building'){ %> \
    <%= JST['map/infoWindow/building']({hasElevators: hasElevators, tFloors: tFloors, hasEntrances: hasEntrances}) %> \
  <% } %>\
  <% if (model.get('type') === 'auditorium' && model.get('handicapAdapted') === true) { %> \
    <div class='info-window-pg'>\
      <div class='info-window-icon hearing_loop'></div>\
      <div class='info-window-text'><%= i18n.t('map.infoWindow.hearing_loop.exists') %></div>\
    </div>\
  <% } else if (model.get('type') === 'auditorium') { %> \
    <div class='info-window-pg'>\
      <div class='info-window-icon hearing_loop not-available'></div>\
      <div class='info-window-text'><%= i18n.t('map.infoWindow.hearing_loop.noexists') %></div>\
    </div>\
  <% } %> \
  </div>\
  \
  <% if (displayDirections === true) { %> \
  <div id='directions' class='directions' style='display: inline;'> \
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
