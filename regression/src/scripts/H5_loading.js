var H5_loading = function(argument) {
	/*document.onreadystatechange = function(d) {
		if(document.readyState == "complete") {
			console.log('complete')
		}
	};*/
	/*var len = 0;
	setInterval(function() {
		console.log($('script[src$=".js"]').length);
		if ($('script[src$=".js"]').length != len) {
			console.log($('script[src$=".js"]').length);
			len = $('script[src$=".js"]').length;
		}
	}, 10);*/
	this.el.show().fullpage({
		fitToSection: false,
		onLeave: function(index, nextIndex, direction) {
			$(this).find('.h5_component').trigger('onLeave');
		},
		afterLoad: function(achorLink, index) {
			$(this).find('.h5_component').trigger('onLoad');
		}
	});

	//$('.h5_component').eq(0).trigger('onLoad');
	console.log('test');
};