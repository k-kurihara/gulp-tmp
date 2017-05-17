'use strict';

/*// ==========================================================================
// common.js
// ==========================================================================*/

var COMMON = window.COMMON || {};

COMMON.Test = function ($base) {};

COMMON.Test.prototype = {
	init: function init() {
		this.bindEvents();
	},
	bindEvents: function bindEvents() {
		$(window).on('load', function () {
			var test = 'constのtest';
			console.log(' test === ' + test + ' \u3067\u3059 ');
		});
	}

};

$(function () {

	$('.jsc_test').each(function () {
		new COMMON.Test($(this)).init();
	});
});