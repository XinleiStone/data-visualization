/* regression图文组件对象 */
var Regression = function(name, cfg) {
	"use strict";

	var className = "h5_component_" + name;
	var id = ('h5_component_regression_' + Math.random()).replace('.', '_');
	var $component = $('<div class="h5_component_regression h5_component '+ className +'"></div>');

	cfg.text && $component.append("<p></p>").text(cfg.text);
	cfg.width && $component.width(cfg.width / 2);
	//$component.width("100%");
	cfg.height && $component.height(cfg.height / 2);
	cfg.css && $component.css(cfg.css);
	cfg.bg && $component.css('backgroundImage', 'url('+ cfg.bg +')');

	var regressionOptions = {
		containerId: "containerId",
		width: cfg.width / 2,
		height: 350,
		title: {
			text: "线性回归",
			subText: ""
		}
	};
	regression.createGraph($component, regressionData, regressionOptions);

	if (cfg.center === true) {
		$component.css({
			marginLeft: cfg.width/4 * -1 + 'px',
			left: '50%'
		});
	}

	$component.on("onLoad", function() {
		//$(this).fadeIn();
		$component.addClass(className + '_load').removeClass(className + '_leave');
		cfg.animateIn && $component.animate(cfg.animateIn);
		return false;
	});

	$component.on("onLeave", function() {
		//$(this).fadeOut();
		$component.addClass(className + '_leave').removeClass(className + '_load');
		cfg.animateOut && $component.animate(cfg.animateOut);
		return false;
	});

	return $component;
};
