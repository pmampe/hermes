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

// Define the app namespace
var suApp = suApp || {};
suApp.model = suApp.model || {};
suApp.router = suApp.router || {};
suApp.view = suApp.view || {};
suApp.collection = suApp.collection || {};

suApp.config = (function (pgBrokerBaseURL) {
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
    "studentServiceEng": {
      "menu": [
        {
          title: "studentService.menu.applicationAndAdmission.title",
          url: "http://www.su.se/english/study/application-admissions"
        },
        {
          title: "studentService.menu.degreeAndCertificate.title",
          url: "http://www.su.se/english/study/student-services/qualifications-degrees"
        },
        {
          title: "studentService.menu.guidanceCounseling.title",
          url: "http://www.su.se/english/study/student-services"
        },
        {
          title: "studentService.menu.infoCentre.title",
          url: "http://www.su.se/english/study/student-services"
        },
        {
          title: "studentService.menu.healthService.title",
          url: "http://www.su.se/english/study/student-services/student-health-service"
        },
        {
          title: "studentService.menu.studentDisabilityService.title",
          url: "http://www.su.se/english/study/student-services/studying-with-a-disability"
        },
        {
          title: "studentService.menu.academicWritingService.title",
          url: "http://www.su.se/english/study/student-services/academic-writing-service"
        },
        {
          title: "studentService.menu.equality.title",
          url: "http://www.su.se/english/study/student-services/equal-treatment"
        },
        {
          title: "studentService.menu.orientation.title",
          url: "http://www.su.se/english/study/student-services/admitted-students/orientation-week"
        }
      ]
    },
    "studentServiceSwe": {
      "menu": [
        {
          title: "studentService.menu.applicationAndAdmission.title",
          url: "http://www.su.se/utbildning/anmalan-antagning"
        },
        {
          title: "studentService.menu.degreeAndCertificate.title",
          url: "http://www.su.se/utbildning/examen-hogtid"
        },
        {
          title: "studentService.menu.guidanceCounseling.title",
          url: "http://www.su.se/utbildning/studievagledning"
        },
        {
          title: "studentService.menu.infoCentre.title",
          url: "http://www.su.se/utbildning/studentservice"
        },
        {
          title: "studentService.menu.healthService.title",
          url: "http://www.su.se/utbildning/studentservice/studenthalsovard"
        },
        {
          title: "studentService.menu.studentDisabilityService.title",
          url: "http://www.su.se/utbildning/studentservice/studera-med-funktionsnedsattning"
        },
        {
          title: "studentService.menu.academicWritingService.title",
          url: "http://www.su.se/utbildning/studentservice/studie-och-sprakverkstaden"
        },
        {
          title: "studentService.menu.equality.title",
          url: "http://www.su.se/utbildning/studentservice/jamlikhet-likabehandling"
        },
        {
          title: "studentService.menu.studyAbroad.title",
          url: "http://www.su.se/utbildning/studentservice/studera-utomlands"
        }
      ]
    }
  };
})("http://mobileapp-dev.it.su.se");
