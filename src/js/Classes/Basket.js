/*jshint debug:true, browser:true */
/*global alert: true */

var App = App || {};

App.Basket = function (options) { 
	'use strict';
	this.items = [];
	if (typeof options === 'object') {
		this.vatAt = options.vatAt;
	} else {
		this.vatAt = 20;
	}
};

App.Basket.prototype = Object.create(App.Model.prototype);

App.Basket.prototype.addItem = function (obj) {
	'use strict';
	var basketItem = new App.BasketItem(obj);
	this.items.push(basketItem);
	return basketItem;
};

App.Basket.prototype.removeItem = function (id) {
	'use strict';
	for (var i = 0; i < this.items.length; i++) {
		if(this.items[i].id === id) {
			this.items.splice(i,1);
			return false;
		}
	}
};

App.Basket.prototype.getSubTotal = function () {
	'use strict';
	var cost = 0;
	for (var i = 0; i < this.items.length; i++) {
		cost  += ( this.items[i].quantity *  this.items[i].price );
	}
	return parseFloat(cost);
};
	
App.Basket.prototype.getVat = function () {
	'use strict';
	return parseFloat((this.getSubTotal() / 100) * this.vatAt);
};

App.Basket.prototype.getTotal = function () {
	'use strict';
	return parseFloat(this.getSubTotal() + this.getVat());
};

App.Basket.prototype.saveComplete = function (req) {
	'use strict';
	if (req.status === 200) {
		alert(JSON.stringify(this));
	} else {
		alert(JSON.stringify(this));
	}
};

App.Basket.prototype.isEmpty = function () {
	'use strict';
	return !this.items.length;
};