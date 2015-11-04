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
}