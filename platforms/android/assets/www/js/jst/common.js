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

JST['common/header'] = _.template(" \
    <h1><span><%= title %></span></h1> \
    \
    <% if (backbutton) { %>\
      <a data-role='button' rel='external' data-ajax='false' data-transition='fade' data-rel='back' \
         class='ui-btn-left backbutton'> \
         <div id='home' class='home'></div>\
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

JST['common/error-dialog'] = _.template(' \
  <div id="errorPopup" data-role="popup" class="ui-content" data-theme="a" data-overlay-theme="a">\
    <div data-role="content"> \
        <p><span>	<%= errormessage%></span></p> \
        <a id="closeErrorDialog" data-role="button"><span data-i18n="error.button"> Close </span></a> \
    </div>\
  </div>\
');