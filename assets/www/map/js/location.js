$(function() {
	
	var Location = Backbone.View.extend({
		initialize: function() {
			console.log("init");
		},
		
		validate: function(attr) {
			console.log(attr);
		}

	});
	
	var locationCollection = Backbone.Collection.extend({
		model: Location,
		
		validate: function(attr) {
			console.log(attr);
		}
	});

	/*
	var locationView = Backbone.View.extend({
		el: $('#campus'),
		template: _.template("<option value='<%= locName %>'> <%= dispName %> </option>"),
			

		initialize: function() {
			//this.model.bind("reset", this.render, this);
		},
		
		render: function (eventName) {
			_.each(this.model.models, function(loc) {
				$(this.el).append(this.template(loc));
			}, this);
			return this;
		}

	});
	*/

    var l1 = new Location({name:"freskati", dispName:"Freskati", loc:[1,2]});
    var l2 = new Location({name:"kraftriket", dispName:"Kräftriket", loc:[2,3]});
    var l3 = new Location({name:"kista", dispName:"Kista", loc:[3,4]});
    var l4 = new Location({name:"socialhs", dispName:"Socialhögskoklan", loc:[4,5]});

	var c = new locationCollection([l1, l2, l3, l4]);
	
//	console.log(c);

	
	//window.locationView = new locationView;
});