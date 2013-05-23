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

package com.adobe.plugins;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;

import com.google.analytics.tracking.android.GAServiceManager;
import com.google.analytics.tracking.android.GoogleAnalytics;
import com.google.analytics.tracking.android.Tracker;

public class GAPlugin extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callback) {
    GoogleAnalytics ga = GoogleAnalytics.getInstance(cordova.getActivity());
    Tracker tracker = ga.getDefaultTracker();

    if (action.equals("initGA")) {
      try {
        tracker = ga.getTracker(args.getString(0));
        GAServiceManager.getInstance().setDispatchPeriod(args.getInt(1));
        ga.setDefaultTracker(tracker);
        callback.success("initGA - id = " + args.getString(0) + "; interval = " + args.getInt(1) + " seconds");
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("exitGA")) {
      try {
        GAServiceManager.getInstance().dispatch();
        callback.success("exitGA");
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("trackEvent")) {
      try {
        tracker.sendEvent(args.getString(0), args.getString(1), args.getString(2), args.getLong(3));
        callback.success("trackEvent - category = " + args.getString(0) + "; action = " + args.getString(1) + "; label = " + args.getString(2) + "; value = " + args.getInt(3));
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("trackPage")) {
      try {
        tracker.sendView(args.getString(0));
        callback.success("trackPage - url = " + args.getString(0));
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("setVariable")) {
      try {
        tracker.setCustomDimension(args.getInt(0), args.getString(1));
        callback.success("setVariable passed - index = " + args.getInt(0) + "; value = " + args.getString(1));
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("setDimension")) {
      try {
        tracker.setCustomDimension(args.getInt(0), args.getString(1));
        callback.success("setDimension passed - index = " + args.getInt(0) + "; value = " + args.getString(1));
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    } else if (action.equals("setMetric")) {
      try {
        tracker.setCustomMetric(args.getInt(0), args.getLong(1));
        callback.success("setVariable passed - index = " + args.getInt(2) + "; key = " + args.getString(0) + "; value = " + args.getString(1));
        return true;
      } catch (final Exception e) {
        callback.error(e.getMessage());
      }
    }
    return false;
  }
}

