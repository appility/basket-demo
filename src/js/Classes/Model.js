/*jshint debug:true, browser:true */
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
}());