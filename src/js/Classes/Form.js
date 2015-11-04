/*jshint debug:true, browser:true */
/*global addEvent, cancelEvent */

var App = App || {};

App.Form = function (model, selector) {
	/*jshint validthis: true */
	'use strict';
	this.model = model;
	this.el = document.getElementById(selector);
	this.subTotalEl = this.el.getElementsByClassName('subtotal-cost')[0];
	this.vatEl = this.el.getElementsByClassName('vat-cost')[0];
	this.totalEl = this.el.getElementsByClassName('total-cost')[0];
	this.submitEl = this.el.querySelector(' input[type="submit"]');

	this.items = this.el.querySelectorAll('tbody:first-of-type tr');

	var modelChangeEvent = function(event) {
		this.handleModelChange(event);
	}.bind(this);

	for (var i = 0; i < this.items.length; i++) {
		addEvent(this.items[i], 'modelChange', modelChangeEvent);
		new App.FormItem(model, this.items[i]);
	}

	this.init = function(){
		this.el.addEventListener('submit', {
			handleEvent: this.handleSubmit.bind(this),
			this: this
		}, false);
	};

	this.init();
};

App.Form.prototype = ( function () {
	/*jshint validthis: true */
	'use strict';

	function handleModelChange () {
		this.updateTotals();
		this.checkForEmptyModel();
	}

	function updateTotals () {
		this.subTotalEl.innerHTML = this.model.getSubTotal().toFixed(2);
		this.vatEl.innerHTML = this.model.getVat().toFixed(2);
		this.totalEl.innerHTML = this.model.getTotal().toFixed(2);
	}

	function checkForEmptyModel () {
		if (this.model.isEmpty()) {
			this.submitEl.disabled = 'disabled';
		}
	}

	function handleSubmit (event) {
		cancelEvent(event);
		this.model.save(this.el.action);
	}

	return {
		handleSubmit: handleSubmit,
		handleModelChange: handleModelChange,
		updateTotals: updateTotals,
		checkForEmptyModel: checkForEmptyModel
	};

}());