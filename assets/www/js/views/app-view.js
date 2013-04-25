var AppView = Backbone.View.extend({
  initialize: function(){

    getLocale();
    var self =this;

    i18n.init(i18n.options,function(){
      $('div[data-role="header"] > h1').attr('data-i18n','start.header.title');
      self.$el.i18n();
    });

  }

});
