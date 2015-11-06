/*jshint debug:true, browser:true */

var App = App || {};

App.BasketItem = function (obj) {
	'use strict';
	this.id = obj.id;
	this.price = obj.price;
	this.quantity = obj.quantity;
};

App.BasketItem.prototype = ( function () {
	/*jshint validthis: true */
	'use strict';

	function getPrice () {
		return this.price;
	}

	function changeQuantity (increment) {
		var newQuantity = this.quantity + increment;
		if ( newQuantity > 0 && newQuantity < 11 ) {
			return (this.quantity += increment);
		} else {
			return false;
		}
	}

	function setQuantity (int) {
		if ( int > 0 && int < 11 ) {
			this.quantity = int;
		}
	}

	function getQuantity () {
		return this.quantity;
	}

	function getCost () {
		return (this.getQuantity() * this.getPrice());
	}

	return {
		getPrice: getPrice,
		changeQuantity: changeQuantity,
		getQuantity: getQuantity,
		setQuantity: setQuantity,
		getCost: getCost
	};

}());
