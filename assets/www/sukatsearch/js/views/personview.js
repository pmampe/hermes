var PersonView = Backbone.View.extend({
  template:$("#personTemplate").html(),

  render:function () {
    var tmpl = _.template(this.template);

    this.el = $(tmpl(this.model.toJSON()))
    return this;
  }
});

var PersonDetailsView = Backbone.View.extend({
  //since this template will render inside a div, we don't need to specify a tagname
  initialize: function() {
    this.template = _.template($('#personDetailsTemplate').html());
  },

  render: function() {
    var container = this.options.viewContainer,
    person = this.model,
    renderedContent = this.template(this.model.toJSON());

    container.html(renderedContent);
    container.trigger('create');
    return this;
  }
});