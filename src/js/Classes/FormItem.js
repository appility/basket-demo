/*jshint debug:true, browser:true */
/*global confirm, Event, addEvent, cancelEvent, removeElement */

var App = App || {};

App.FormItem = function (model, el) {
	'use strict';
	this.parentModel = model;
	this.el = el;
	this.id = this.el.id;
	this.plusEl = this.el.getElementsByClassName('plus')[0];
	this.minusEl = this.el.getElementsByClassName('minus')[0];
	this.inputEl = this.el.getElementsByTagName('input')[0];
	this.priceEl = this.el.getElementsByClassName('price')[0];
	this.costEl = this.el.getElementsByClassName('item-cost')[0];
	this.deleteEl = this.el.getElementsByClassName('delete')[0];

	this.model = this.parentModel.addItem({
		id: this.id,
		price: parseFloat(this.priceEl.innerHTML),
		quantity: parseInt(this.inputEl.value, 10),
		parent: this.parentModel
	});
	this.addEvents();
};

App.FormItem.prototype = ( function () {
	/*jshint validthis: true */
	'use strict';

	function addEvents () {
		addEvent(this.deleteEl, 'click', function(event) {
			this.handleDelete(event);
		}.bind(this));

		addEvent(this.inputEl, 'change', function(event) {
			this.handleChange(event);
		}.bind(this));

		addEvent(this.plusEl, 'click', function(event) {
			this.handleIncrement(event, 1);
		}.bind(this));

		addEvent(this.minusEl, 'click', function(event) {
			this.handleIncrement(event, -1);
		}.bind(this));
	}

	function handleChange (event) {
		cancelEvent(event);
		var newQuantity = parseInt( event.target.value, 10 );
		if (newQuantity > 0 ) {
			this.model.setQuantity(newQuantity);
			this.update();
			var customEvent = new Event('modelChange');
			this.el.dispatchEvent(customEvent);
		} else {
			this.inputEl.value = 1;
		}
	}

	function handleIncrement (event, increment) {
		cancelEvent(event);
		var newQuantity = this.model.getQuantity() + increment;
		if (newQuantity > 0 ) {
			this.model.changeQuantity(increment);
			this.update();
			var customEvent = new Event('modelChange');
			this.el.dispatchEvent(customEvent);
		}
	}

	function update () {
		this.updateQuantity();
		this.updateCost();
	}

	function updateQuantity () {
		this.inputEl.value = this.model.getQuantity();
	}

	function updateCost () {
		this.costEl.innerHTML = this.model.getCost().toFixed(2);
	}

	function handleDelete (event) {
		cancelEvent(event);
		var r = confirm('Are your sure?');
		if (r === true) {
			this.parentModel.removeItem(this.el.id);
			var customEvent = new Event('modelChange');
			this.el.dispatchEvent(customEvent);
			removeElement(this.el);
		}
	}

	return {
		addEvents: addEvents,
		update: update,
		updateQuantity: updateQuantity,
		updateCost: updateCost,
		handleDelete: handleDelete,
		handleChange: handleChange,
		handleIncrement: handleIncrement
	};

}());