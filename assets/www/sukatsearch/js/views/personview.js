var PersonView = Backbone.View.extend({
  tagName:"div",
  className:"personContainer",
  template:$("#personTemplate").html(),

  render:function () {
    var tmpl = _.template(this.template);

    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});