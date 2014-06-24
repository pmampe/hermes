describe('JQuery mobile config on mobileinit', function () {
  it('should set the correct values', function () {
    $(document).trigger('mobileinit');
    expect($.support.cors).toEqual(true);
    expect($.mobile.allowCrossDomainPages).toEqual(true);
    expect($.mobile.pushStateEnabled).toEqual(false);
    expect($.mobile.page.prototype.options.domCache).toEqual(true);
    expect($.mobile.ajaxEnabled).toEqual(false);
    expect($.mobile.linkBindingEnabled).toEqual(true);
    expect($.mobile.hashListeningEnabled).toEqual(true);
  });
});

