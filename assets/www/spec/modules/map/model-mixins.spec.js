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

describe('Model mixin i18nMixin', function () {

  beforeEach(function () {
    this.mixin = {
      get: function (attribute) {
        return {
          name: 'valueSE',
          nameEn: 'valueEN',
          test: 'TestSE'
        }[attribute]
      }
    };
    _.extend(this.mixin, ModelMixins.i18nMixin);
  });

  it('Should get swedish attribute', function () {
    i18n.init({
      lng: 'sv-SE'
    });
    expect(this.mixin.getI18n('name')).toBe('valueSE');
  });

  it('Should get english attribute', function () {
    i18n.init({
      lng: 'en-GB'
    });
    expect(this.mixin.getI18n('name')).toBe('valueEN');
  });

  it('Should get english attribute when language is french', function () {
    i18n.init({
      lng: 'fr-FR'
    });
    expect(this.mixin.getI18n('name')).toBe('valueEN');
  });

  it('Should fall back to swedish if no english translation is found', function () {
    i18n.init({
      lng: 'en-GB'
    });
    expect(this.mixin.getI18n('test')).toBe('TestSE');
  });

});