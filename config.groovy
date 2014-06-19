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

phonegapPassword = System.getenv('PG_PASS')
phonegapKey = System.getenv('PG_KEY')

phantomjs = {
  String phantomjsBin = System.getenv('PHANTOMJS')
  if (!phantomjsBin) {
    phantomjsBin = System.getenv('PHANTOMJS_HOME')
    if (phantomjsBin) phantomjsBin += "/bin/phantomjs"
  }

  if (!phantomjsBin)
    phantomjsBin = "which phantomjs".execute().text.trim()

  if (!phantomjsBin)
    throw new IllegalArgumentException("No phantomjs found! Specify phantomjs path using \$PHANTOMJS or \$PHANTOMJS_HOME")

  if ("${phantomjsBin} -v".execute().text.trim() < "1.7.0")
    throw new IllegalArgumentException("Too old version of phantomjs found! Please use version 1.7.0 or later.")

  phantomjsBin
}

appName = 'Guide'
androidCertKeyId = 19331

/**
 * Environment specific conf
 */
environments {
  dev {
    appName += '-dev'
    geoUrl = 'http://mobileapp-dev.it.su.se/geo'
    iOSCertKeyId = 195434
    phonegapAppId = 219084
  }

  test {
    appName += '-test'
    geoUrl = 'http://api-test.su.se/geo/1'
    iOSCertKeyId = 68333
    phonegapAppId = 526336
  }

  prod {
    geoUrl = 'http://api.su.se/geo/1'
    iOSCertKeyId = 195360
    phonegapAppId = 526336
  }
}
