/*// ==========================================================================
// common.js
// ==========================================================================*/

var COMMON = window.COMMON || {};

COMMON.Test = function ( $base ) {
}

COMMON.Test.prototype = {
	init : function(){
		this.bindEvents();
	},
	bindEvents : function(){
		$(window).on('load', function(){
			const test = 'constのtest'
			console.log(` test === ${test} です `)
		})
	}

}

$(function () {

	$('.jsc_test').each(function () {
		new COMMON.Test($(this)).init();
	});

});