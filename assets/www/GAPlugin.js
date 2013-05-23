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

(function () {
  var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

  function GAPlugin() {
  }

  // initialize google analytics with an account ID and the min number of seconds between posting
  //
  // id = the GA account ID of the form 'UA-00000000-0'
  // period = the minimum interval for transmitting tracking events if any exist in the queue
  GAPlugin.prototype.init = function (success, fail, id, period) {
    return cordovaRef.exec(success, fail, 'GAPlugin', 'initGA', [id, period]);
  };

  // log an event
  //
  // category = The event category. This parameter is required to be non-empty.
  // eventAction = The event action. This parameter is required to be non-empty.
  // eventLabel = The event label. This parameter may be a blank string to indicate no label.
  // eventValue = The event value. This parameter may be -1 to indicate no value.
  GAPlugin.prototype.trackEvent = function (success, fail, category, eventAction, eventLabel, eventValue) {
    return cordovaRef.exec(success, fail, 'GAPlugin', 'trackEvent', [category, eventAction, eventLabel, eventValue]);
  };


  // log a page view
  //
  // pageURL = the URL of the page view
  GAPlugin.prototype.trackPage = function (success, fail, pageURL) {
    return cordovaRef.exec(success, fail, 'GAPlugin', 'trackPage', [pageURL]);
  };

  // Set a custom variable. The variable set is included with
  // the next event only. If there is an existing custom variable at the specified
  // index, it will be overwritten by this one.
  //
  // value = the value of the variable you are logging
  // index = the numerical index of the dimension to which this variable will be assigned (1 - 20)
  //  Standard accounts support up to 20 custom dimensions.
  GAPlugin.prototype.setVariable = function (success, fail, index, value) {
    return cordovaRef.exec(success, fail, 'GAPlugin', 'setVariable', [index, value]);
  };

  GAPlugin.prototype.exit = function (success, fail) {
    return cordovaRef.exec(success, fail, 'GAPlugin', 'exitGA');
  };

  cordovaRef.addConstructor(function () {
    if (!window.plugins) {
      window.plugins = {};
    }
    if (!window.plugins.gaPlugin) {
      window.plugins.gaPlugin = new GAPlugin();
    }
  });
})();
/* End of Temporary Scope. */
