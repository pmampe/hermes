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

var config = (function (pgBrokerBaseURL) {
  return {
    "core": {
      "ga": {
        "account": "UA-39850755-1"
      },
      "splashscreen": {
        "timeout": 500
      }
    },

    "sukat": {
      "search": {
        "url": pgBrokerBaseURL + "/sukat/search"
      }
    },

    "map": {
      "campuses": {
        "url": pgBrokerBaseURL + "/geo/campuses"
      },
      "location": {
        "url": pgBrokerBaseURL + "/geo/poi"
      },
      "zoom": {
        "threshold": 16
      }
    },
      "studentService": {
          "menu": [ {
              title: "studentService.menu.applicationAndAdmission.title",
              url: "studentService.menu.applicationAndAdmission.url"
          },
          {
              title: "studentService.menu.degreeAndCertificate.title",
              url: "studentService.menu.degreeAndCertificate.url"
          },
          {
              title: "studentService.menu.guidanceCounseling.title",
              url: "studentService.menu.guidanceCounseling.url"
          },
          {
              title: "studentService.menu.infoCentre.title",
              url: "studentService.menu.infoCentre.url"
          },
          {
              title: "studentService.menu.healthService.title",
              url: "studentService.menu.healthService.url"
          },
          {
              title: "studentService.menu.studentDisabilityService.title",
              url: "studentService.menu.studentDisabilityService.url"
          },
          {
              title: "studentService.menu.academicWritingService.title",
              url: "studentService.menu.academicWritingService.url"
          },
          {
              title: "studentService.menu.equality.title",
              url: "studentService.menu.equality.url"
          },
          {
              title: "studentService.menu.orientation.title",
              url: "studentService.menu.orientation.url"
          },
          {
              title: "studentService.menu.studyAbroad.title",
              url: "studentService.menu.studyAbroad.url"
          }
        ]
      }
  };
})("http://mobileapp-dev.it.su.se");
