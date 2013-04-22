var AppView = Backbone.View.extend({
  initialize: function(){

    getLocale();
    var self =this;

    i18n.init(i18n.options,function(){
      self.$el.i18n();

    });

  }

});
