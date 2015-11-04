/*jshint debug:true, browser:true, strict: false */
/*global Event: true, ActiveXObject: true, alert: true, confirm: true, BasketItem: true, FormItem:true */

function addEvent (to, type, fn) {
    if(document.addEventListener) {
        to.addEventListener(type, fn, false);
    } else if(document.attachEvent) {
        to.attachEvent('on'+type, fn);
    } else {
        to['on'+type] = fn;
    }
}

function cancelEvent (event) {
	if (event.preventDefault) { event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

function removeElement(el) {
	el.parentNode.removeChild(el);
}

Object.create = function (o) {
    function F() {};
    F.prototype = o;
    return new F();
};/*jshint debug:true, browser:true */
/*global ActiveXObject: true */

var App = App || {};

App.Model = function () {};

App.Model.prototype = ( function () {
	/*jshint validthis: true */
	'use strict';
	function save (url) {
		var req,
			target = this;
		if (window.XMLHttpRequest)
		{
			req = new XMLHttpRequest();
		} else {
			req = new ActiveXObject('Microsoft.XMLHTTP');
		}
		req.overrideMimeType('application/json');
		req.open('GET', url, false);
		req.onload = function () {
			target.saveComplete(req, url);
		};
		req.send();
	}
	return {
		save: save
	};
}());;/*jshint debug:true, browser:true */
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
};;/*jshint debug:true, browser:true */

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
		debugger;
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
;/*jshint debug:true, browser:true */
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

}());;/*jshint debug:true, browser:true */
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